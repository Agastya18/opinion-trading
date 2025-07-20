import {intiateOrderZodSchema} from "@repo/zod"

import { NextFunction, Request, Response } from "express";

export const initiateOrderValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body against the Zod schema
    intiateOrderZodSchema.parse(req.body);
    next(); // If validation passes, proceed to the next middleware or route handler
  } catch (error) {
    // If validation fails, return a 400 Bad Request response with the error message
    return res.status(400).json({ error });
  }
};