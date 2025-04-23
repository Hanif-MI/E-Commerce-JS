import nodemailer from "nodemailer";
import dotenv from "dotenv";
import db from "../models/index.js";
import { generateOTP } from "../utility/helper.js";
import { fileURLToPath } from "url";
import path from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

// Store OTP for a user
async function storeOTP(id, otp, isFromForgetPassword) {
  const UserModel = await db.User;
  const user = await UserModel.findOne({ where: { id } });
  if (!user) throw new Error("User not found");

  if (!isFromForgetPassword) {
    if (user.is_verified) throw new Error("User already verified");
  }

  user.otp = otp;
  await user.save();
  const expiryMinutes = 5; // OTP expiry time in minutes
  return expiryMinutes;
}

// Create a beautiful HTML template for the OTP email
function otpEmailTemplate(otp, expiryMinutes) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OYE - Email Verification</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #f0f0f0;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #4a54f1;
        }
        .content {
          padding: 30px 20px;
          text-align: center;
        }
        .otp-container {
          margin: 25px 0;
          padding: 15px;
          background-color: #f5f7ff;
          border-radius: 6px;
          border: 1px solid #e1e4f5;
        }
        .otp {
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 5px;
          color: #4a54f1;
          margin: 10px 0;
        }
        .expiry {
          font-size: 14px;
          color: #777;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
          font-size: 12px;
          color: #999;
        }
        .note {
          font-size: 14px;
          color: #666;
          margin-top: 20px;
          padding: 10px;
          background-color: #fff9e6;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">OYE</div>
        </div>
        <div class="content">
          <h2>Verify Your Email Address</h2>
          <p>Thank you for registering with OYE. Please use the following One-Time Password (OTP) to complete your verification:</p>
          
          <div class="otp-container">
            <div class="otp">${otp}</div>
          </div>
          
          <p class="expiry">This OTP will expire in ${expiryMinutes} minutes.</p>
          
          <div class="note">
            If you didn't request this verification, please ignore this email or contact our support team.
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} OYE Team. All rights reserved.</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends an OTP email to the specified email address.
 *
 * @param {string} email - The recipient's email address.
 * @param {string} userId - The ID of the user to associate with the OTP.
 * @param {boolean} [isFromForgetPassword=false] - Indicates if the OTP is for a password reset.
 * @returns {Promise<{success: boolean, result?: object, error?: object}>} - A promise that resolves to an object indicating success or failure, with additional details.
 */
export async function sendOTPEmail(
  email,
  userId,
  isFromForgetPassword = false
) {
  // Generate OTP
  const otp = generateOTP();

  // Store OTP with expiry time
  const expiryMinutes = await storeOTP(userId, otp, isFromForgetPassword);

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `OYE-TEAM <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OYE - Your Email Verification Code",
      text: `Your OTP for email verification is: ${otp}. This code will expire in ${expiryMinutes} minutes.`,
      html: otpEmailTemplate(otp, expiryMinutes),
    };

    const result = await transport.sendMail(mailOptions);
    return { success: true, result };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
}
