"use client";

import Link from "next/link";
import {
  CalendarDays,
  Wallet,
  ArrowRight,
  Trash2
} from "lucide-react";

import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function TripCard({
  trip,
}: {
  trip: any;
}) {

  const router = useRouter();

  const getBudgetColor = () => {

    switch (trip.budgetTier) {

      case "High":
        return "bg-red-500/20 text-red-300";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-300";

      default:
        return "bg-green-500/20 text-green-300";
    }
  };

  const handleDelete = async (
    e: React.MouseEvent
  ) => {

    e.preventDefault();
    e.stopPropagation();

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this trip?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/trips/${trip._id}`
      );

      router.refresh();

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete trip"
      );

    }
  };

  return (

    <div
      className="
      group
      bg-slate-900
      rounded-3xl
      overflow-hidden
      border
      border-slate-800
      hover:border-yellow-400/40
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:shadow-yellow-500/10
      "
    >

      <Link
        href={`/trip/${trip._id}`}
      >

        <div
          className="
          relative
          h-56
          overflow-hidden
          "
        >

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-br
            from-blue-600
            via-indigo-700
            to-purple-900
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-black/30
            "
          />

          <div
            className="
            absolute
            bottom-5
            left-5
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              {trip.destination}
            </h2>

          </div>

        </div>

      </Link>

      <div className="p-6">

        <div
          className="
          flex
          items-center
          justify-between
          mb-5
          "
        >

          <div
            className="
            flex
            items-center
            gap-2
            text-gray-400
            "
          >
            <CalendarDays size={18} />

            <span>
              {trip.durationDays} Days
            </span>

          </div>

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            ${getBudgetColor()}
            `}
          >
            {trip.budgetTier}
          </span>

        </div>

        <div
          className="
          flex
          items-center
          gap-2
          text-gray-400
          mb-6
          "
        >
          <Wallet size={18} />

          <span>
            AI Generated Trip
          </span>

        </div>

        {/* Action Buttons */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <Link
            href={`/trip/${trip._id}`}
            className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            bg-yellow-400
            hover:bg-yellow-300
            text-black
            py-3
            rounded-xl
            font-bold
            transition
            "
          >
            View Plan

            <ArrowRight
              size={18}
            />
          </Link>

          <button
            onClick={handleDelete}
            className="
            p-3
            rounded-xl
            bg-red-500/15
            text-red-400
            hover:bg-red-500/25
            transition
            "
            title="Delete Trip"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>

  );
}