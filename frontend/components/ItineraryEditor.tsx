"use client";

interface Props {
  itinerary: any[];
}

export default function ItineraryEditor({
  itinerary
}: Props) {

  return (

    <div className="mt-8">

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        Itinerary
      </h2>

      {
        itinerary?.map(
          (day) => (

            <div
              key={day.day}
              className="
              border
              rounded-lg
              p-4
              mb-4
              "
            >

              <h3
                className="
                text-lg
                font-semibold
                "
              >
                Day {day.day}
              </h3>

              {
                day.activities?.map(
                  (
                    activity: any,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="mt-3"
                    >

                      <p>
                        <strong>
                          {activity.time}
                        </strong>
                      </p>

                      <p>
                        {activity.title}
                      </p>

                      <p
                        className="
                        text-sm
                        text-gray-600
                        "
                      >
                        {
                          activity.description
                        }
                      </p>

                    </div>

                  )
                )
              }

            </div>

          )
        )
      }

    </div>

  );
}