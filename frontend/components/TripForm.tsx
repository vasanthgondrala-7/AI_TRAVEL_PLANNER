"use client";

import { useState } from "react";

interface Props {
  onSubmit: (data: any) => void;
}

export default function TripForm({
  onSubmit
}: Props) {

  const [form, setForm] =
    useState({
      destination: "",
      durationDays: 5,
      budgetTier: "Medium",
      interests: ""
    });

  return (

    <form
      onSubmit={(e) => {

        e.preventDefault();

        onSubmit({
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
                (i) =>
                  i.trim()
              )
        });

      }}
      className="
      border
      rounded-lg
      p-6
      shadow
      "
    >

      <input
        placeholder="Destination"
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
        border
        p-3
        rounded
        mb-4
        "
      />

      <input
        type="number"
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
        border
        p-3
        rounded
        mb-4
        "
      />

      <select
        value={form.budgetTier}
        onChange={(e) =>
          setForm({
            ...form,
            budgetTier:
              e.target.value
          })
        }
        className="
        w-full
        border
        p-3
        rounded
        mb-4
        "
      >

        <option>
          Low
        </option>

        <option>
          Medium
        </option>

        <option>
          High
        </option>

      </select>

      <input
        placeholder="
        Food,
        Culture,
        Hiking
        "
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
        border
        p-3
        rounded
        mb-4
        "
      />

      <button
        type="submit"
        className="
        bg-black
        text-white
        p-3
        rounded
        w-full
        "
      >
        Generate Trip
      </button>

    </form>

  );
}