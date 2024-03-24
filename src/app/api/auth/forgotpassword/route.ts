import { prisma } from '@/lib/db/prisma';
import { sendResetPasswordMail } from '@/lib/mail/forgotpwmail';

export async function POST(request: Request) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordTimer: new Date(),
      },
    });

    if (updatedUser) {
      sendResetPasswordMail(user.email, user.id);
    }
  }

  return Response.json({
    status: 200,
    message:
      'If this email exists in our database, a reset link will be sent to it.',
  });
}
