import { z } from "zod";

export const createTripSchema =
  z.object({
    destination:
      z.string().min(2),

    durationDays:
      z.number().min(1).max(30),

    budgetTier:
      z.enum([
        "Low",
        "Medium",
        "High"
      ]),

    interests:
      z.array(z.string())
  });