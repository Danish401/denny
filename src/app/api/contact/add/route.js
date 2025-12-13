import connectToDB from "@/database";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

// Function to send email notification
async function sendEmailNotification(contactData) {
  const { name, email, message } = contactData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "alid1338@gmail.com", // Your email where you want to receive messages
    subject: `🚀 New Portfolio Contact from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 16px;
              padding: 3px;
            }
            .inner {
              background: #ffffff;
              border-radius: 14px;
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #7C3AED;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: #666;
              margin: 5px 0 0;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 10px;
              border-left: 4px solid #7C3AED;
            }
            .field-label {
              font-size: 12px;
              color: #7C3AED;
              text-transform: uppercase;
              font-weight: 600;
              margin-bottom: 5px;
            }
            .field-value {
              font-size: 16px;
              color: #333;
              word-break: break-word;
            }
            .message-field {
              border-left-color: #F472B6;
            }
            .message-field .field-label {
              color: #F472B6;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #888;
              font-size: 12px;
            }
            .badge {
              display: inline-block;
              background: linear-gradient(135deg, #7C3AED, #F472B6);
              color: white;
              padding: 5px 15px;
              border-radius: 20px;
              font-size: 12px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="inner">
              <div class="header">
                <span class="badge">New Message</span>
                <h1>📬 Portfolio Contact</h1>
                <p>You have received a new message from your portfolio</p>
              </div>
              
              <div class="field">
                <div class="field-label">👤 Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">✉️ Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #7C3AED;">${email}</a></div>
              </div>
              
              <div class="field message-field">
                <div class="field-label">💬 Message</div>
                <div class="field-value">${message}</div>
              </div>
              
              <div class="footer">
                <p>This email was sent from your Portfolio Contact Form</p>
                <p>© ${new Date().getFullYear()} Danish Ali Portfolio</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    // Plain text version
    text: `
New Portfolio Contact Message

From: ${name}
Email: ${email}

Message:
${message}

---
Sent from Danish Ali Portfolio Contact Form
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    
    // Save to database
    const saveData = await Contact.create(extractData);
    
    if (saveData) {
      // Send email notification
      await sendEmailNotification(extractData);
      
      return NextResponse.json({
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}
