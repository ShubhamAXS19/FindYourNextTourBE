import express from "express";
import { sendEmailSES, testSESConnection } from "../Utils/mailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Test connection endpoint
router.get("/test-ses-connection", async (req, res) => {
  try {
    const isConnected = await testSESConnection();

    res.json({
      success: true,
      message: isConnected
        ? "SES connection successful"
        : "SES connection failed",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Test email endpoint
router.post("/test-ses-email", async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required in request body",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    console.log("1");
    const testEmail = await sendEmailSES({
      to: req.body.email,
      subject: "Test Email from SES",
      text: "If you receive this, your SES is working correctly!",
      html: "<h1>Test Email</h1><p>If you receive this, your SES is working correctly!</p>",
    });
    console.log("2");
    res.json({
      success: true,
      messageId: testEmail.MessageId,
      sentTo: req.body.email,
    });
  } catch (error: any) {
    console.error("Error in test-ses-email:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

export default router;
