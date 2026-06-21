import {
  GoogleGenerativeAI
} from "@google/generative-ai";

import { env }
from "../config/env";

import { retry }
from "../utils/retry";

import {
  parseGeminiJson
}
from "../utils/parseGeminiJson";

const genAI =
  new GoogleGenerativeAI(
    env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

export const generateTripPlan =
  async (
    destination: string,
    durationDays: number,
    budgetTier: string,
    interests: string[]
  ) => {

    const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Duration: ${durationDays} days
Budget Tier: ${budgetTier}
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

{
  "itinerary": [
    {
      "day": 1,
      "theme": "Theme",
      "activities": [
        "Activity 1",
        "Activity 2",
        "Activity 3"
      ]
    }
  ],

  "estimatedBudget": {
    "flights": 25000,
    "accommodation": 18000,
    "food": 10000,
    "activities": 5000,
    "transport": 3000,
    "total": 61000
  },

  "hotels": [
    {
      "name": "Hotel Name",
      "description": "Short description",
      "priceRange": "${budgetTier}"
    }
  ]
}

Rules:
1. estimatedBudget is REQUIRED.
2. All budget values must be numbers.
3. total must equal the sum of all categories.
4. Generate realistic budget estimates based on destination and budget tier.
5. Include at least 4 hotel recommendations.
6. Return ONLY JSON.
7. No markdown.
8. No explanations.
`;

    const result =
      await retry(
        async () => {

          const response =
            await model.generateContent(
              prompt
            );

          return response.response.text();
        }
      );

    const parsed =
      parseGeminiJson(
        result
      );

    console.log(
      "AI RESULT:",
      JSON.stringify(
        parsed,
        null,
        2
      )
    );

    return parsed;
  };
