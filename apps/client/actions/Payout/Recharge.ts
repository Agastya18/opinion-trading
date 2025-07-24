"use server";
import prisma from "@repo/db/client"
import { error } from "console";

export const DepositeMoneyInWallet = async (userId: string, amount: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return { success: false, message: "User not found." };
    }
    const newBalance = Math.max(0, (user.balance += amount));
    await prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
    return { success: true, message: "Deposit successful." };
  } catch (e) {
    console.error("Error depositing money:", e);
    return { success: false, message: "Error while depositing money." };
  }
};

export async function getBalance(userId :string){
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return error("no user found")
    }
   return user.balance
   
    
  } catch (e) {
    console.error("Error fetching money:", e);
   
  }
}
