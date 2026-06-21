"use client";

interface PackingItem {
  _id?: string;
  name: string;
  category: string;
  checked: boolean;
}

interface Props {
  tripId: string;
  packingList: PackingItem[];
  onToggle: (
    itemId: string,
    checked: boolean
  ) => Promise<void>;
}

export default function PackingAssistant({
  packingList,
  onToggle
}: Props) {

  const grouped =
    packingList.reduce(
      (
        acc: Record<string, PackingItem[]>,
        item
      ) => {

        if (!acc[item.category]) {
          acc[item.category] = [];
        }

        acc[item.category].push(item);

        return acc;

      },
      {}
    );

  return (

    <div className="mt-8">

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        Packing Assistant
      </h2>

      {
        Object.entries(grouped)
          .map(
            ([category, items]) => (

              <div
                key={category}
                className="
                mb-6
                border
                rounded-lg
                p-4
                "
              >

                <h3
                  className="
                  font-semibold
                  mb-3
                  "
                >
                  {category}
                </h3>

                {
                  items.map(
                    (item) => (

                      <label
                        key={item._id}
                        className="
                        flex
                        gap-3
                        mb-2
                        "
                      >

                        <input
                          type="checkbox"
                          checked={
                            item.checked
                          }
                          onChange={
                            (e) =>
                              onToggle(
                                item._id || "",
                                e.target.checked
                              )
                          }
                        />

                        {item.name}

                      </label>

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