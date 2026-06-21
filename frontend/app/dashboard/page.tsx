"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import LoadingSpinner from "@/components/LoadingSpinner";

import {
  Plane,
  MapPinned,
  Wallet,
  Sparkles
} from "lucide-react";

interface Trip {
  _id: string;
  destination: string;
  durationDays: number;
  budgetTier: string;
}

export default function DashboardPage() {
  const [trips, setTrips] =
    useState<Trip[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response =
        await api.get("/trips");

      setTrips(
        response.data.data
      );
    } catch (error) {
      console.error(error);
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
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-10
          "
        >
          {/* Hero */}

          <section
            className="
            rounded-3xl
            bg-gradient-to-r
            from-blue-900
            via-slate-900
            to-yellow-600/20
            p-6
            md:p-10
            mb-10
            "
          >
            <div className="max-w-3xl">
              <h1
                className="
                text-3xl
                md:text-5xl
                font-extrabold
                mb-4
                leading-tight
                "
              >
                Welcome Back 👋
              </h1>

              <p
                className="
                text-gray-300
                text-base
                md:text-lg
                "
              >
                Manage your trips,
                generate new adventures,
                and explore destinations
                with AI assistance.
              </p>

              <a
                href="/create-trip"
                className="
                inline-flex
                items-center
                justify-center
                mt-6
                px-6
                py-3
                rounded-xl
                bg-yellow-400
                text-black
                font-bold
                hover:bg-yellow-300
                transition
                "
              >
                Plan New Trip
              </a>
            </div>
          </section>

          {/* Stats */}

          <section
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-12
            "
          >
            <div className="bg-slate-900 rounded-3xl p-6">
              <Plane
                className="
                text-yellow-400
                mb-3
                "
              />

              <h2 className="text-3xl font-bold">
                {trips.length}
              </h2>

              <p className="text-gray-400">
                Total Trips
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6">
              <MapPinned
                className="
                text-blue-400
                mb-3
                "
              />

              <h2 className="text-3xl font-bold">
                {
                  new Set(
                    trips.map(
                      t =>
                        t.destination
                    )
                  ).size
                }
              </h2>

              <p className="text-gray-400">
                Destinations
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6">
              <Wallet
                className="
                text-green-400
                mb-3
                "
              />

              <h2 className="text-3xl font-bold">
                AI
              </h2>

              <p className="text-gray-400">
                Budget Planning
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6">
              <Sparkles
                className="
                text-purple-400
                mb-3
                "
              />

              <h2 className="text-3xl font-bold">
                Smart
              </h2>

              <p className="text-gray-400">
                AI Itineraries
              </p>
            </div>
          </section>

          {/* Trips Header */}

          <section
            className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-8
            "
          >
            <h2
              className="
              text-3xl
              font-bold
              "
            >
              My Trips
            </h2>

            <a
              href="/create-trip"
              className="
              inline-flex
              items-center
              justify-center
              px-5
              py-3
              rounded-xl
              bg-yellow-400
              text-black
              font-semibold
              "
            >
              Create Trip
            </a>
          </section>

          {loading ? (
            <LoadingSpinner />
          ) : trips.length === 0 ? (
            <div
              className="
              bg-slate-900
              rounded-3xl
              p-12
              text-center
              "
            >
              <h3
                className="
                text-2xl
                font-bold
                mb-4
                "
              >
                No Trips Yet
              </h3>

              <p className="text-gray-400">
                Start your first AI-powered journey.
              </p>
            </div>
          ) : (
            <section
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
              "
            >
              {trips.map(
                trip => (
                  <TripCard
                    key={trip._id}
                    trip={trip}
                  />
                )
              )}
            </section>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}