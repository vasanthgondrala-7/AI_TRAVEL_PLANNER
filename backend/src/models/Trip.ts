import mongoose, { Document } from "mongoose";

interface Activity {
  _id?: string;
  time?: string;
  title?: string;
  description?: string;
}

interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

interface Hotel {
  name: string;
  description: string;
  priceRange: string;
}

interface PackingItem {
  name: string;
  category: string;
  checked: boolean;
}

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;

  destination: string;

  durationDays: number;

  budgetTier:
    | "Low"
    | "Medium"
    | "High";

  interests: string[];

  itinerary: DayPlan[];

  estimatedBudget: {
    flights: number;
    accommodation: number;
    food: number;
    activities: number;
    transport: number;
    total: number;
  };

  hotels: Hotel[];

  packingList: PackingItem[];
}

const activitySchema =
  new mongoose.Schema(
    {
      time: {
        type: String,
        default: ""
      },

      title: {
        type: String,
        default: ""
      },

      description: {
        type: String,
        default: ""
      }
    },
    {
      _id: true
    }
  );

const daySchema =
  new mongoose.Schema({
    day: {
      type: Number,
      default: 1
    },

    theme: {
      type: String,
      default: ""
    },

    activities: {
      type: [activitySchema],
      default: []
    }
  });

const packingSchema =
  new mongoose.Schema({
    name: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: ""
    },

    checked: {
      type: Boolean,
      default: false
    }
  });

const hotelSchema =
  new mongoose.Schema({
    name: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    priceRange: {
      type: String,
      default: ""
    }
  });

const tripSchema =
  new mongoose.Schema<ITrip>(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true
      },

      destination: {
        type: String,
        required: true
      },

      durationDays: {
        type: Number,
        required: true
      },

      budgetTier: {
        type: String,

        enum: [
          "Low",
          "Medium",
          "High"
        ],

        required: true
      },

      interests: {
        type: [String],
        default: []
      },

      itinerary: {
        type: [daySchema],
        default: []
      },

      estimatedBudget: {
        flights: {
          type: Number,
          default: 0
        },

        accommodation: {
          type: Number,
          default: 0
        },

        food: {
          type: Number,
          default: 0
        },

        activities: {
          type: Number,
          default: 0
        },

        transport: {
          type: Number,
          default: 0
        },

        total: {
          type: Number,
          default: 0
        }
      },

      hotels: {
        type: [hotelSchema],
        default: []
      },

      packingList: {
        type: [packingSchema],
        default: []
      }
    },
    {
      timestamps: true
    }
  );

export default mongoose.model<ITrip>(
  "Trip",
  tripSchema
);

