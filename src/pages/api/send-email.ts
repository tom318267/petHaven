import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    console.log("Received form data:", { name, email, message });

    try {
      // Create a test account
      let testAccount = await nodemailer.createTestAccount();

      // Create a transporter using the test account
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      // Send email
      const info = await transporter.sendMail({
        from: '"PetHaven" <foo@example.com>',
        to: "bar@example.com",
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      });

      console.log("Email sent successfully:", info);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json({
        message: "Email sent successfully",
        previewUrl: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      console.error("Detailed error sending email:", error);
      res.status(500).json({
        message: "Failed to send email",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
