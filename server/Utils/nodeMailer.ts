import nodemailer from "nodemailer";


export const sendEmail = async (email:string,OTP:string) => {

  try {
    const transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        auth: {
          user: process.env.NODEMAILER_AUTHER,
          pass: process.env.NODEMAILER_AUTHER_PASSWORD,
        },
      });
    
      const mailOptions = {
        from: process.env.NODEMAILER_AUTHER,
        to: email,
        subject: 'Email with QR code attachment',
        text: `OTP:- ${OTP}`
       
        
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new Error("Mail sending failed!");
        } else {
          return;
        }
      });
  } catch (error) {
    throw new Error(error.message);
  }
};