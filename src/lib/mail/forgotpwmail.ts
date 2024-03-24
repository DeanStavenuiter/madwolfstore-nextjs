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

// change URL
export async function sendResetPasswordMail(email: string, id: string) {
  try {
    await transporter.sendMail({
      from: 'noreply@madwolfstore.com',
      to: email,
      subject: 'Reset your password - MadWolfStore ',
      html: `
      <div style="width:400px; max-width:400px; margin:0 auto;">
      <div style="background:url('https://madwolfstore.s3.amazonaws.com/logo/MadWolf_logo_zwart.png') 0 0 no-repeat;background-size:100px 100px;height:100px;margin:0 auto;width:100px"></div>
      <h1 style="text-align:center;">Reset your password</h1>
  
      <p style="text-align:center;">Someone just requested to change your account's credentials. If this was you, click the link below to reset them.</p>
  
      <a href="http://localhost:3000/auth/resetpassword/${id}" style="background:#0ea5e9;border-radius:6px;color:#fff;display:block;margin:20px auto;padding:8px 16px;text-align:center;text-decoration:none;width:175px;text-align:center;margin: 0 auto;">Change your password</a>
      
      <p style="text-align:center;"><b>This link will expire in 5 minutes.</b> If you don't want to reset your credentials, just ignore this message and nothing will be changed.</p>
     
      <p style="text-align:center;">Thank you,</p>
  
      <p style="text-align:center;">MadWolf Store Team</p>
  </div>  
        `,
    });
  } catch (error) {
    console.log(error);
  }
}
