import { createTransport } from 'nodemailer';
import { env } from '../env';

const transporter = createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: `${env.NODEMAILER_EMAIL}`,
    pass: `${env.NODEMAILER_APP_PWD}`,
  },
});

export async function sendVerifcationCode(
  email: string,
  verificationCode: string
) {
  try {
    await transporter.sendMail({
      from: 'noreply@madwolfstore.com',
      to: email,
      subject: 'MadWolfStore Email Verification',
      html: `
    <div style="width:400px; max-width:400px; margin:0 auto;">
    <h1 style="text-align:center;">MadWolfStore Email Verification</h1>
    <h3 style="text-align:center;">Thank you for registering with MadWolfStore.</h3>

    <p style="text-align:center;">Please enter the following code to verify your email address:</p>

    <strong style="display:block;text-align:center;margin:20px auto;font-size:20px;">${verificationCode}</strong>
    
    <p style="text-align:center;">The verification code will expire in 10 minutes.</p>
   
    <p style="text-align:center;">Thank you,</p>

    <p style="text-align:center;">MadWolfStore Team</p>
</div>

    `,
    });
  } catch (error) {
    console.log(error);
  }
}
