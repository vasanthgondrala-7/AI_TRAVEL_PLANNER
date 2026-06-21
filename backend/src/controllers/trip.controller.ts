import { Request, Response } from "express";

import Trip from "../models/Trip";

import { AppError } from "../errors/AppError";

import { asyncHandler } from "../middleware/asyncHandler";

import { generateTripPlan } from "../services/gemini.service";

import { generatePackingList } from "../services/packing.service";

/*
==================================
GET ALL TRIPS
==================================
*/

export const getTrips = asyncHandler(
  async (req: Request, res: Response) => {
    const trips = await Trip.find({
      userId: req.user?.id
    }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      data: trips
    });
  }
);

/*
==================================
GET SINGLE TRIP
==================================
*/

export const getTrip = asyncHandler(
  async (req: Request, res: Response) => {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user?.id
    });

    if (!trip) {
      throw new AppError(
        "Trip not found",
        404
      );
    }

    res.json({
      success: true,
      data: trip
    });
  }
);

/*
==================================
CREATE TRIP
==================================
*/

export const createTrip = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      destination,
      durationDays,
      budgetTier,
      interests
    } = req.body;

    const aiResult =
      await generateTripPlan(
        destination,
        durationDays,
        budgetTier,
        interests
      );

    const formattedItinerary =
      (aiResult.itinerary || []).map(
        (
          day: any,
          index: number
        ) => {

          let dayNumber =
            index + 1;

          if (
            typeof day.day ===
            "number"
          ) {

            dayNumber =
              day.day;

          } else if (
            typeof day.day ===
            "string"
          ) {

            const match =
              day.day.match(
                /\d+/
              );

            if (
              match &&
              match[0]
            ) {

              dayNumber =
                Number(
                  match[0]
                );
            }
          }

          return {
            day: dayNumber,

            theme:
              day.theme ||
              `Day ${dayNumber}`,

            activities:
              (
                day.activities ||
                []
              ).map(
                (
                  activity: any,
                  activityIndex: number
                ) => {

                  if (
                    typeof activity ===
                    "string"
                  ) {

                    return {
                      time:
                        `${9 + activityIndex}:00`,

                      title:
                        activity,

                      description:
                        activity
                    };
                  }

                  return {
                    time:
                      activity?.time ||
                      `${9 + activityIndex}:00`,

                    title:
                      activity?.title ||
                      "Activity",

                    description:
                      activity?.description ||
                      activity?.title ||
                      ""
                  };
                }
              )
          };
        }
      );

    const packingList =
      await generatePackingList(
        destination,
        formattedItinerary
      );

    const estimatedBudget =
      aiResult.estimatedBudget || {
        flights: 0,
        accommodation: 0,
        food: 0,
        activities: 0,
        transport: 0,
        total: 0
      };

    const hotels =
      (aiResult.hotels || []).map(
        (hotel: any) => {

          if (
            typeof hotel ===
            "string"
          ) {

            return {
              name: hotel,

              description:
                "Recommended hotel",

              priceRange:
                budgetTier
            };
          }

          return {
            name:
              hotel?.name ||
              "Hotel",

            description:
              hotel?.description ||
              "",

            priceRange:
              hotel?.priceRange ||
              budgetTier
          };
        }
      );

    const trip =
      await Trip.create({
        userId: req.user?.id,

        destination,

        durationDays,

        budgetTier,

        interests,

        itinerary:
          formattedItinerary,

        estimatedBudget,

        hotels,

        packingList
      });

    res.status(201).json({
      success: true,
      data: trip
    });
  }
);


/*
==================================
UPDATE TRIP
==================================
*/

export const updateTrip = asyncHandler(
  async (req: Request, res: Response) => {
    const trip =
      await Trip.findOne({
        _id: req.params.id,
        userId: req.user?.id
      });

    if (!trip) {
      throw new AppError(
        "Trip not found",
        404
      );
    }

    Object.assign(
      trip,
      req.body
    );

    await trip.save();

    res.json({
      success: true,
      data: trip
    });
  }
);

/*
==================================
DELETE TRIP
==================================
*/

export const deleteTrip = asyncHandler(
  async (req: Request, res: Response) => {
    const trip =
      await Trip.findOneAndDelete({
        _id: req.params.id,
        userId: req.user?.id
      });

    if (!trip) {
      throw new AppError(
        "Trip not found",
        404
      );
    }

    res.json({
      success: true,
      message:
        "Trip deleted successfully"
    });
  }
);

/*
==================================
ADD ACTIVITY
==================================
*/

export const addActivity = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      day,
      time,
      title,
      description
    } = req.body;

    const trip =
      await Trip.findOne({
        _id: req.params.id,
        userId: req.user?.id
      });

    if (!trip) {
      throw new AppError(
        "Trip not found",
        404
      );
    }

    const dayEntry =
      trip.itinerary.find(
        (d: any) =>
          d.day === day
      );

    if (!dayEntry) {
      throw new AppError(
        "Day not found",
        404
      );
    }

    dayEntry.activities.push({
      time,
      title,
      description
    });

    await trip.save();

    res.json({
      success: true,
      data: trip
    });
  }
);

/*
==================================
REMOVE ACTIVITY
==================================
*/

export const removeActivity =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user?.id
        });

      if (!trip) {
        throw new AppError(
          "Trip not found",
          404
        );
      }

      trip.itinerary.forEach(
        (day: any) => {
          day.activities =
            day.activities.filter(
              (
                activity: any
              ) =>
                activity._id.toString() !==
                req.params
                  .activityId
            );
        }
      );

      await trip.save();

      res.json({
        success: true,
        data: trip
      });
    }
  );

/*
==================================
REGENERATE DAY
==================================
*/

export const regenerateDay =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user?.id
        });

      if (!trip) {
        throw new AppError(
          "Trip not found",
          404
        );
      }

      const dayNumber =
        Number(
          req.params.dayNumber
        );

      const index =
        trip.itinerary.findIndex(
          (d: any) =>
            d.day === dayNumber
        );

      if (index === -1) {
        throw new AppError(
          "Day not found",
          404
        );
      }

      /*
      TODO:
      Replace with Gemini day regeneration
      in Part 5.
      */

      trip.itinerary[
        index
      ].activities.push({
        time: "Custom",

        title:
          "Regenerated Activity",

        description:
          req.body.feedback ||
          "User requested changes"
      });

      await trip.save();

      res.json({
        success: true,
        data: trip
      });
    }
  );

/*
==================================
UPDATE PACKING ITEM
==================================
*/

export const updatePackingItem =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        itemId,
        checked
      } = req.body;

      const trip =
        await Trip.findOne({
          _id: req.params.id,
          userId:
            req.user?.id
        });

      if (!trip) {
        throw new AppError(
          "Trip not found",
          404
        );
      }

      const item =
        trip.packingList.find(
          (p: any) =>
            p._id.toString() ===
            itemId
        );

      if (!item) {
        throw new AppError(
          "Packing item not found",
          404
        );
      }

      item.checked = checked;

      await trip.save();

      res.json({
        success: true,
        data: trip
      });
    }
  );