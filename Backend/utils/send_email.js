const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
     try {
          const transport = nodemailer.createTransport(
               {
                    host: `sandbox.smtp.mailtrap.io`,
                    service: `Gmail`,
                    post: `587`,
                    secure: true,
                    auth: {
                         user: `bookstacklib@gmail.com`,
                         pass: process.env.PASS,
                    },
                    mail : {
                         smtp : {
                              ssl : {
                                   version : 'TLSv1.2'
                              }
                         }
                    }
               }
          )

          await transport.sendMail(
               {
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    html: text,
                    
               }
          )
     } catch (err) {
     }
}