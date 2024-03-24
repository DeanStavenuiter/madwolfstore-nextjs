import { prisma } from '@/lib/db/prisma';
import crypto from 'crypto';
import { sendVerifcationCode } from '@/lib/mail/verifyEmail';

export async function POST(request: Request) {
  //set emailVerified to true
  const { email, verificationToken } = await request.json();

  //check if there is an email filled in
  if (!email) {
    return Response.json({
      message: 'Email is required.',
      status: 409,
    });
  }

  // check if there is a verification code filled in
  if (!verificationToken) {
    return Response.json({
      message: 'Verification code is required.',
      status: 409,
    });
  }

  if (verificationToken) {
    console.log('verificationToken', verificationToken);

    try {
      // check if there is a user with this email address
      const userWithToken = await prisma.user.findUnique({
        where: {
          email: email.toLocaleLowerCase(),
          verificationToken: {
            token: verificationToken,
          },
        },
        include: {
          verificationToken: true,
        },
      });

      console.log('userWithToken', userWithToken?.verificationToken?.expires);
      console.log('verificationtoken', verificationToken);

      // check if the user has already been verified
      if (userWithToken && userWithToken.emailVerified === true) {
        return Response.json({
          message: 'Your account has already been verified. Please log in.',
          status: 200,
        });
      }

      //check if the verification code has expired
      if (
        userWithToken &&
        userWithToken.emailVerified === false &&
        userWithToken.verificationToken?.expires &&
        userWithToken.verificationToken.expires < new Date()
      ) {
        //generate new verification code
        const token = crypto.randomInt(100000, 999999).toString();

        // update the verification code and send new one
        const updateCode = await prisma.verificationToken.update({
          where: {
            id: userWithToken.verificationToken.id,
          },
          data: {
            token: token,
            expires: new Date(Date.now() + 10 * 60 * 1000), // 1 minutes
          },
        });

        console.log('updateCode', updateCode);
        await sendVerifcationCode(email, token);

        return Response.json({
          message:
            'Your verification code has expired. We have send you a new code.',
          status: 400,
        });
      }

      // check if the verification code is correct and update the user
      const updateUser = await prisma.user.update({
        where: {
          email: email.toLocaleLowerCase(),
          verificationToken: {
            token: verificationToken,
          },
        },
        data: {
          emailVerified: true,
          verificationToken: {
            update: {
              token: undefined,
            },
          },
        },
      });

      console.log('userWithToken', userWithToken);

      // check if the user has been updated
      if (!updateUser) {
        return Response.json({
          message: 'Invalid verification code.',
          status: 400,
        });
      }

      const deleteAllTokens = await prisma.verificationToken.deleteMany({
        where: {
          identifier: email.toLocaleLowerCase(),
        },
      });

      console.log('deleteAllTokens', deleteAllTokens);

      // return success message
      return Response.json({
        message: 'Your account has been verified. Please log in.',
        status: 200,
      });

    } catch (error) {
      console.log('error', error);
      return Response.json({
        message: 'Invalid verification code.',
        status: 400,
      });
    }
  }
}
