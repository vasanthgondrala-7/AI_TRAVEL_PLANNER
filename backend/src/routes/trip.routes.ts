import { Router } from "express";

import { protect } from "../middleware/auth.middleware";

import {
  getTrips,
  getTrip,
  deleteTrip,
  createTrip,
  updateTrip,
  addActivity,
  removeActivity,
  regenerateDay,
  updatePackingItem
} from "../controllers/trip.controller";

const router = Router();

router.use(protect);

/*
=========================
TRIPS
=========================
*/

router.get(
  "/",
  getTrips
);

router.get(
  "/:id",
  getTrip
);

router.post(
  "/",
  createTrip
);

router.put(
  "/:id",
  updateTrip
);

router.delete(
  "/:id",
  deleteTrip
);

/*
=========================
ACTIVITIES
=========================
*/

router.post(
  "/:id/activity",
  addActivity
);

router.delete(
  "/:id/activity/:activityId",
  removeActivity
);

/*
=========================
DAY REGENERATION
=========================
*/

router.patch(
  "/:id/day/:dayNumber",
  regenerateDay
);

/*
=========================
PACKING ASSISTANT
=========================
*/

router.patch(
  "/:id/packing",
  updatePackingItem
);

export default router;