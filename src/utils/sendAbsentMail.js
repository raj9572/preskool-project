import { resend } from "../config/resend.js";

export const sendAbsentMail = async ({ studentName,parentEmail, date }) => {
  const subject = `Absent Notification - ${studentName}`;

  const htmlContent = `
    <h2>Absent Notification</h2>
    <p>Dear Parent,</p>
    <p>Your child <strong>${studentName}</strong> was marked <strong>Absent</strong> on ${date}.</p>
    <p>Please contact the school if this was an error.</p>
    <br/>
    <p>Regards,<br/>School Administration</p>
  `;

  return await resend.emails.send({
    from: "Complain@webbuild.shop",
    to: [parentEmail], // you can also include parent email here if needed
    subject,
    html: htmlContent,
  });
};