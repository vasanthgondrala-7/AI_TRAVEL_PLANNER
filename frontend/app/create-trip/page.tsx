"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import toast from "react-hot-toast";

import {
  MapPinned,
  CalendarDays,
  Sparkles,
  Wallet
} from "lucide-react";

export default function CreateTripPage() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      destination: "",
      durationDays: 5,
      budgetTier: "Medium",
      interests: ""
    });

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await api.post(
            "/trips",
            {
              destination:
                form.destination,

              durationDays:
                Number(
                  form.durationDays
                ),

              budgetTier:
                form.budgetTier,

              interests:
                form.interests
                  .split(",")
                  .map(
                    i => i.trim()
                  )
                  .filter(Boolean)
            }
          );

        toast.success(
          "Trip Generated Successfully"
        );

        router.push(
          `/trip/${response.data.data._id}`
        );
      } catch {
        toast.error(
          "Failed To Create Trip"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <ProtectedRoute>
      <Navbar />

      <main
        className="
        min-h-screen
        bg-[#050816]
        text-white
        "
      >
        <div
          className="
          max-w-4xl
          mx-auto
          px-4
          sm:px-6
          py-10
          "
        >
          {/* Hero */}

          <section
            className="
            rounded-3xl
            p-8
            md:p-10
            mb-8
            bg-gradient-to-r
            from-blue-900
            via-slate-900
            to-purple-900
            "
          >
            <h1
              className="
              text-3xl
              md:text-5xl
              font-extrabold
              mb-4
              leading-tight
              "
            >
              Create Your Dream Trip
            </h1>

            <p
              className="
              text-gray-300
              text-base
              md:text-lg
              "
            >
              Let AI build your itinerary,
              hotels, budget estimation,
              and packing list.
            </p>
          </section>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="
            bg-slate-900
            rounded-3xl
            p-6
            md:p-8
            border
            border-slate-800
            shadow-xl
            "
          >
            {/* Destination */}

            <label
              className="
              flex
              items-center
              gap-2
              mb-3
              text-lg
              font-semibold
              "
            >
              <MapPinned size={20} />
              Destination
            </label>

            <input
              placeholder="Paris, Tokyo, Bali..."
              value={form.destination}
              onChange={(e) =>
                setForm({
                  ...form,
                  destination:
                    e.target.value
                })
              }
              className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              mb-6
              "
              required
            />

            {/* Duration */}

            <label
              className="
              flex
              items-center
              gap-2
              mb-3
              text-lg
              font-semibold
              "
            >
              <CalendarDays size={20} />
              Duration (Days)
            </label>

            <input
              type="number"
              min={1}
              value={form.durationDays}
              onChange={(e) =>
                setForm({
                  ...form,
                  durationDays:
                    Number(
                      e.target.value
                    )
                })
              }
              className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              mb-6
              "
            />

            {/* Budget */}

            <label
              className="
              flex
              items-center
              gap-2
              mb-4
              text-lg
              font-semibold
              "
            >
              <Wallet size={20} />
              Budget Tier
            </label>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
              mb-6
              "
            >
              {["Low", "Medium", "High"].map(
                budget => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        budgetTier:
                          budget
                      })
                    }
                    className={`
                    p-4
                    rounded-2xl
                    border
                    font-semibold
                    transition

                    ${
                      form.budgetTier === budget
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "bg-slate-800 border-slate-700"
                    }
                    `}
                  >
                    {budget}
                  </button>
                )
              )}
            </div>

            {/* Interests */}

            <label
              className="
              flex
              items-center
              gap-2
              mb-3
              text-lg
              font-semibold
              "
            >
              <Sparkles size={20} />
              Interests
            </label>

            <input
              placeholder="Food, Culture, Adventure, Beaches"
              value={form.interests}
              onChange={(e) =>
                setForm({
                  ...form,
                  interests:
                    e.target.value
                })
              }
              className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              mb-8
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              p-4
              rounded-2xl
              bg-yellow-400
              text-black
              font-bold
              text-lg
              hover:bg-yellow-300
              transition
              disabled:opacity-50
              "
            >
              {loading
                ? "Generating Trip..."
                : "Generate Trip"}
            </button>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}