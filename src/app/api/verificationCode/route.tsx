import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerifcationCode } from '@/lib/mail/verifyEmail';

export async function POST(request: Request) {
  //create user and send verification code
  const { email, password: passwordRaw } = await request.json();

  if (!email || !passwordRaw) {
    return Response.json({
      message: 'Email and password are required.',
      status: 409,
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email.toLocaleLowerCase(),
    },
  });

  console.log('existingUser', existingUser);

  if (existingUser && existingUser.emailVerified === false) {
    return Response.json({
      message:
        'Please check your email for a verification code.',
      status: 409,
    });
  }

  if (existingUser && existingUser.emailVerified === true) {
    return Response.json({
      message:
        'A user with this email address already exists. Please log in instead.',
      status: 409,
    });
  }

  const verificationCode = crypto.randomInt(100000, 999999).toString();
  const passwordHash = await bcrypt.hash(passwordRaw, 10);

  console.log('verificationCode', verificationCode);

  const result = await prisma.user.create({
    data: {
      email: email.toLocaleLowerCase(),
      password: passwordHash,
      emailVerified: false,
      verificationToken: {
        create: {
          identifier: email.toLocaleLowerCase(),
          token: verificationCode,
          expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minutes
        },
      },
    },
  });

  console.log('result', result);

  if (result) {
    await sendVerifcationCode(email, verificationCode);
  }

  return Response.json({
    message: "We've sent you an email with a verification code.",
    status: 200,
  });
}
