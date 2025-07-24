"use server";
import { Portfolio } from "@/app/(lobby)/portfolio/page";
import prisma from "@repo/db/client";
 

export async function getTrades(userId: string): Promise<Portfolio | null> {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        userId: userId,
      },
      include: {
        trades: true,
      },
    });

    
    return portfolio ? portfolio : null;
    
  } catch (error) {
    console.error("Error fetching trades:", error);
    return null; 
  }
}

