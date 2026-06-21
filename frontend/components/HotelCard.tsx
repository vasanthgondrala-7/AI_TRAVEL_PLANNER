import {
  Hotel,
  Star,
  MapPin
} from "lucide-react";

interface Props {
  hotel: {
    name: string;
    description: string;
    priceRange: string;
  };
}

export default function HotelCard({
  hotel
}: Props) {

  const getBadgeStyle = () => {

    switch (hotel.priceRange) {

      case "High":
        return "bg-red-500/20 text-red-300";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-300";

      default:
        return "bg-green-500/20 text-green-300";
    }
  };

  return (

    <div
      className="
      h-full
      flex
      flex-col
      bg-slate-900
      rounded-3xl
      overflow-hidden
      border
      border-slate-800
      hover:border-blue-400/40
      transition
      "
    >

      <div
        className="
        h-32
        bg-gradient-to-br
        from-blue-700
        via-indigo-800
        to-purple-900
        flex
        items-end
        p-4
        "
      >

        <div
          className="
          flex
          items-center
          gap-2
          "
        >

          <Hotel
            size={20}
            className="text-white"
          />

          <span className="font-medium">
            Recommended Stay
          </span>

        </div>

      </div>

      <div
        className="
        flex-1
        flex
        flex-col
        p-6
        "
      >

        <div
          className="
          flex
          justify-between
          items-start
          gap-3
          mb-4
          "
        >

          <h3
            className="
            text-xl
            font-bold
            break-words
            "
          >
            {hotel.name}
          </h3>

          <div
            className="
            flex
            items-center
            gap-1
            text-yellow-400
            shrink-0
            "
          >
            <Star
              size={14}
              fill="currentColor"
            />
            5.0
          </div>

        </div>

        <p
          className="
          text-gray-400
          text-sm
          leading-6
          flex-1
          "
        >
          {hotel.description}
        </p>

        <div
          className="
          flex
          justify-between
          items-center
          mt-6
          pt-4
          border-t
          border-slate-800
          "
        >

          <div
            className="
            flex
            items-center
            gap-2
            text-gray-500
            text-sm
            "
          >
            <MapPin size={15} />
            Recommended
          </div>

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            ${getBadgeStyle()}
            `}
          >
            {hotel.priceRange}
          </span>

        </div>

      </div>

    </div>

  );
}