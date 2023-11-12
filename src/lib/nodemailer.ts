import { createTransport } from 'nodemailer';
import { env } from './env';

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
    html: `<h1>MadWolfStore Email Verification</h1>
        <h3>Thank you for registering with MadWolfStore.</h3>

        <p>Please enter the following code to verify your email address:</p>

        <strong>${verificationCode}</strong>
        
        <p>The verification code will expire in 10 minutes.</p>
       
        <p>Thank you,</p>

        <p>MadWolfStore Team</p>`,
  });
    } catch (error) {
        console.log(error);
    }

}
