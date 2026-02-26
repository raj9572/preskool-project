
// export const sendEmail = async (to, subject, htmlContent) => {
//   const sendSmtpEmail = new SendSmtpEmail();

//   sendSmtpEmail.sender = {
//     name: "WebBuild",
//     email: "noreply@webbuild.shop", // must be verified
//   };

//   sendSmtpEmail.to = [{ email: to }];
//   sendSmtpEmail.subject = subject;
//   sendSmtpEmail.htmlContent = htmlContent;

//   try {
//     // const response = await emailApi.sendTransacEmail(sendSmtpEmail);
//     // return response;
//     const result = await brevo.transactionalEmails.sendTransacEmail({
//       subject: subject,
//       textContent: htmlContent,
//       sender: { name: "WebBuild", email: "noreply@webbuild.shop" },
//       to: [{ email: to }]
//     });
    
//   } catch (error) {
//     console.error("Brevo Error:", error.response?.body || error.message);
//     throw error;
//   }
// };


import { BrevoClient } from "@getbrevo/brevo";

async function sendEmail(studentName, to, subject, htmlContent) {
    const client = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY,
    });
     try {
      const result =await client.transactionalEmails.sendTransacEmail({
        htmlContent: htmlContent,
        sender: {
            email: "Complain@webbuild.shop",
            name: "Attendance Alert",
        },
        subject: subject,
        to: [
            {
                email: to,
                name: studentName,
            },
        ],
    });
    return result
     } catch (error) {
      console.error("Brevo Error:", error.response?.body || error.message);
    throw error;
     }
    
}
export { sendEmail };


