import Image from "next/image";
import { useState, useEffect } from "react";
import CardData from "../types/CardData";

export default function SelectionCard({
  items,
  onChildClick,
}: {
  items: CardData;
  onChildClick: Function;
}) {
  const [selection, setSelection] = useState<Object>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!items) {
      setIsLoading(false);
      return;
    } else {
      setSelection([items]); // wrap items inside an array
      setIsLoading(false);
    }
  }, []);

  function handleClick(parent: string, name: string) {
    onChildClick(parent, name);
  }

  return (
    <>
      {isLoading ? (
        <p>Loading Selection Cards...</p>
      ) : (
        <div className="flex flex-wrap mt-10">
          {Object.keys(items).map((key) => {
            // console.log("KEY: ", key);
            // console.log("ITEMS: ", items[key]);
            return (
              <div
                key={key}
                className="m-5 bg-white border rounded rounded-b-2xl shadow-xl transition-transform duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[1.0] active:shadow-lg active:rounded-t-none"
                style={{
                  width: 200,
                  height: 225,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  className="p-3"
                  value={items[key].name}
                  onClick={() =>
                    handleClick(items[key].parent, items[key].name)
                  }
                >
                  <Image
                    src={`/${items[key].image}.jpg`}
                    width={175}
                    height={175}
                    alt={`${items[key].name}`}
                    priority={true}
                    className="shadow-lg rounded-3xl"
                  />
                </button>
                <p className="mb-5 font-light">{items[key].name}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
