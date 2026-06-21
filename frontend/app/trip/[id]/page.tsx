"use client";

import {
  useEffect,
  useState
} from "react";

import { useParams } from "next/navigation";

import api from "@/services/api";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import BudgetCard from "@/components/BudgetCard";
import HotelCard from "@/components/HotelCard";

import {
  MapPinned,
  CalendarDays,
  Wallet,
  Hotel,
  Clock3
} from "lucide-react";

export default function TripDetailsPage() {

  const params = useParams();

  const [trip, setTrip] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {

    try {

      const response =
        await api.get(
          `/trips/${params.id}`
        );

      setTrip(
        response.data.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        Trip Not Found
      </div>
    );
  }

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
            overflow-hidden
            bg-gradient-to-r
            from-blue-900
            via-slate-900
            to-purple-900
            p-6
            md:p-10
            mb-10
            "
          >

            <div
              className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
              "
            >

              <div>

                <h1
                  className="
                  text-3xl
                  md:text-5xl
                  font-extrabold
                  mb-3
                  "
                >
                  {trip.destination}
                </h1>

                <p className="text-gray-300">
                  AI Generated Travel Plan
                </p>

              </div>

              <div
                className="
                flex
                flex-wrap
                gap-4
                "
              >

                <div
                  className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-white/10
                  "
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {trip.durationDays} Days
                  </div>
                </div>

                <div
                  className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-yellow-400
                  text-black
                  font-semibold
                  "
                >
                  <div className="flex items-center gap-2">
                    <Wallet size={18} />
                    {trip.budgetTier}
                  </div>
                </div>

              </div>

            </div>

          </section>

          {/* Budget */}

          <section className="mb-12">

            <div className="flex items-center gap-3 mb-6">

              <Wallet className="text-yellow-400" />

              <h2
                className="
                text-2xl
                md:text-3xl
                font-bold
                "
              >
                Budget Overview
              </h2>

            </div>

            <BudgetCard
              budget={
                trip.estimatedBudget
              }
            />

          </section>

          {/* Hotels */}

          <section className="mb-12">

            <div className="flex items-center gap-3 mb-6">

              <Hotel className="text-blue-400" />

              <h2
                className="
                text-2xl
                md:text-3xl
                font-bold
                "
              >
                Recommended Hotels
              </h2>

            </div>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
              "
            >

              {
                trip.hotels?.map(
                  (
                    hotel: any,
                    index: number
                  ) => (

                    <HotelCard
                      key={index}
                      hotel={hotel}
                    />

                  )
                )
              }

            </div>

          </section>

          {/* Itinerary */}

          <section>

            <div className="flex items-center gap-3 mb-8">

              <MapPinned className="text-green-400" />

              <h2
                className="
                text-2xl
                md:text-3xl
                font-bold
                "
              >
                Travel Timeline
              </h2>

            </div>

            <div className="space-y-8">

              {
                trip.itinerary?.map(
                  (
                    day: any
                  ) => (

                    <div
                      key={day.day}
                      className="
                      bg-slate-900
                      rounded-3xl
                      border
                      border-slate-800
                      p-5
                      md:p-6
                      "
                    >

                      <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                        mb-6
                        "
                      >

                        <h3
                          className="
                          text-xl
                          md:text-2xl
                          font-bold
                          "
                        >
                          Day {day.day}
                        </h3>

                        <span
                          className="
                          w-fit
                          px-4
                          py-2
                          rounded-full
                          bg-yellow-400/20
                          text-yellow-300
                          "
                        >
                          {day.theme}
                        </span>

                      </div>

                      <div className="space-y-5">

                        {
                          day.activities?.map(
                            (
                              activity: any,
                              index: number
                            ) => (

                              <div
                                key={index}
                                className="
                                flex
                                flex-col
                                md:flex-row
                                gap-4
                                "
                              >

                                <div
                                  className="
                                  md:min-w-[100px]
                                  "
                                >

                                  <div
                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    text-yellow-400
                                    "
                                  >
                                    <Clock3 size={16} />
                                    {activity.time}
                                  </div>

                                </div>

                                <div
                                  className="
                                  flex-1
                                  bg-slate-800
                                  rounded-2xl
                                  p-4
                                  "
                                >

                                  <h4
                                    className="
                                    font-semibold
                                    mb-2
                                    "
                                  >
                                    {activity.title}
                                  </h4>

                                  <p
                                    className="
                                    text-gray-400
                                    "
                                  >
                                    {activity.description}
                                  </p>

                                </div>

                              </div>

                            )
                          )
                        }

                      </div>

                    </div>

                  )
                )
              }

            </div>

          </section>

        </div>

      </main>

    </ProtectedRoute>

  );
}