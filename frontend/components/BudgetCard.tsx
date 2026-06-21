import {
  Plane,
  Hotel,
  Utensils,
  Map,
  Car
} from "lucide-react";

interface Props {
  budget?: {
    flights?: number;
    accommodation?: number;
    food?: number;
    activities?: number;
    transport?: number;
    total?: number;
  };
}

export default function BudgetCard({
  budget,
}: Props) {

  if (!budget) {
    return (
      <div
        className="
        bg-slate-900
        rounded-3xl
        border
        border-slate-800
        p-6
        md:p-8
        overflow-hidden
        "
      >
        <h2
          className="
          text-xl
          font-bold
          text-white
          "
        >
          Budget Information Not Available
        </h2>
      </div>
    );
  }

  const items = [
    {
      label: "Flights",
      value: budget.flights ?? 0,
      icon: Plane
    },
    {
      label: "Accommodation",
      value: budget.accommodation ?? 0,
      icon: Hotel
    },
    {
      label: "Food",
      value: budget.food ?? 0,
      icon: Utensils
    },
    {
      label: "Activities",
      value: budget.activities ?? 0,
      icon: Map
    },
    {
      label: "Transport",
      value: budget.transport ?? 0,
      icon: Car
    }
  ];

  return (

    <div
      className="
      bg-slate-900
      rounded-3xl
      border
      border-slate-800
      p-6
      md:p-8
      overflow-hidden
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
        mb-8
        "
      >

        <div>

          <h2
            className="
            text-2xl
            md:text-3xl
            font-bold
            text-white
            "
          >
            Budget Breakdown
          </h2>

          <p
            className="
            text-gray-400
            mt-2
            "
          >
            Estimated travel expenses
          </p>

        </div>

        <div
          className="
          w-fit
          px-5
          py-3
          rounded-2xl
          bg-yellow-400
          text-black
          font-bold
          "
        >
          ₹{budget.total?.toLocaleString() ?? 0}
        </div>

      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-5
        gap-5
        "
      >

        {items.map(
          (
            item,
            index
          ) => {

            const Icon =
              item.icon;

            return (

              <div
                key={index}
                className="
                bg-slate-800
                rounded-2xl
                p-5
                border
                border-slate-700
                hover:border-yellow-400/40
                transition
                "
              >

                <Icon
                  className="
                  text-yellow-400
                  mb-4
                  "
                  size={24}
                />

                <p
                  className="
                  text-gray-400
                  text-sm
                  "
                >
                  {item.label}
                </p>

                <h3
                  className="
                  text-xl
                  font-bold
                  mt-1
                  break-words
                  "
                >
                  ₹{item.value.toLocaleString()}
                </h3>

              </div>

            );
          }
        )}

      </div>

      <div
        className="
        mt-8
        p-6
        rounded-2xl
        bg-gradient-to-r
        from-yellow-500/20
        to-orange-500/20
        border
        border-yellow-500/20
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
          "
        >

          <span
            className="
            text-lg
            text-gray-300
            "
          >
            Total Estimated Budget
          </span>

          <span
            className="
            text-2xl
            md:text-3xl
            font-extrabold
            text-yellow-400
            break-words
            "
          >
            ₹{budget.total?.toLocaleString() ?? 0}
          </span>

        </div>

      </div>

    </div>

  );
}