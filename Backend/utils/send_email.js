const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
     try {
          const transport = nodemailer.createTransport(
               {
                    host: process.env.HOST,
                    service: process.env.SERVICE,
                    post: Number(process.env.EMAIL_PORT),
                    secure: Boolean(process.env.SECURE),
                    auth: {
                         user: process.env.USER,
                         pass: process.env.PASS,
                    }
               }
          )

          await transport.sendMail(
               {
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    text: text
               }
          )
          console.log("Email sent successfully");
     } catch (err) {
          console.log(err);
     }
}