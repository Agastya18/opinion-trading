"use server";
import twilio from "twilio";
import prisma from "@repo/db/client"

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMSOTP = async (phoneNumber: string) => {
  if(phoneNumber.length <= 10)return { success: false, message: "Failed to update OTP" };
  try {
    const OTP = Math.floor(100000 + Math.random() * 9000).toString();
    
    // Check if OTP already exists
    const isOtpDataExists = await prisma.oTP.findUnique({
      where: { otpID: phoneNumber },
    });
    
    if (isOtpDataExists) {
      // Update existing OTP
      const updateOtp = await prisma.oTP.update({
        where: { otpID: phoneNumber },
        data: { 
          otp: OTP, 
          expiresAt: new Date(Date.now() + 10 * 60 * 1000) 
        },
      });
      
      if (!updateOtp) {
        return { success: false, message: "Failed to update OTP" };
      } else {
        const res = await sendTwillioMsg(OTP, phoneNumber)
        return res;
      }
    } else {
      // Create new OTP
      const newOTP = await prisma.oTP.create({
        data: {
          otpID: phoneNumber,
          otp: OTP,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      
      if (!newOTP) {
        return { success: false, message: "Failed to create OTP" };
      }
      const res = await sendTwillioMsg(OTP, phoneNumber)
      return res;
    }
  } catch (error) {
    console.error("Error in sendSMSOTP:", error);
    return { success: false, message: "An error occurred" };
  }
};

async function sendTwillioMsg(OTP: string, phoneNumber: string) {
  try {
    
    const message = await twilioClient.messages.create({
      body: `Your OTP for OpiniX is ${OTP}, do not share it with anyone!`,
      from: process.env.TWILIO_NUMBER,
      to: phoneNumber,
    });
    console.log(message); // just to get rid of linting error
    
    return { success: true, message: "send OTP" };
  } catch (error) {
    console.error("Error in sendOTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}
