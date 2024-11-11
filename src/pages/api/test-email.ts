import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create test transporter with Mailtrap credentials
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Send test email
    const info = await transporter.sendMail({
      from: '"DANA Claims Test" <test@example.com>',
      to: req.body.testEmail || "test@example.com",
      subject: "Test Email from DANA Claims",
      text: "If you see this, the email configuration is working!",
      html: "<b>If you see this, the email configuration is working!</b>"
    });

    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email test failed:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send test email' 
    });
  }
}
