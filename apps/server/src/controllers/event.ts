// Update the import path below to the correct location of your Prisma client, for example:
import {prisma} from "@repo/db"
import { TEvent } from '@repo/types';
import { Request, Response } from "express";
import { slugify,eventCodeGenerator } from '../utils/util.js';


const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, start_date, end_date, min_bet, max_bet, sot, traders, quantity } = req.body;

    const slug = slugify(title);
    const eventCode = eventCodeGenerator();
    
    const isEventExists = await prisma.event.findFirst({
      where: {
        slug:slug,
      },
    });
    if (isEventExists) {
      return res.status(400).json({ error: "Event with this slug already exists" });
    }

    const newEvent: TEvent = await prisma.event.create({
      data: {
       eventId: eventCode,
        title,
        slug,
        description,
        start_date,
        end_date,
        min_bet,
        max_bet,
        sot,
        expiresAt: end_date,
        quantity,
      }
    });

    res.status(201).json({ message: "Event created successfully", eventId: eventCode });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
}

export { createEvent };
