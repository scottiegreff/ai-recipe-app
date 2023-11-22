import React from "react";

export default function RecipeDisplay({
  replyMessage,
}: {
  replyMessage: string | undefined;
}) {

  // console.log("REPLY MESSAGE form RECIPE DISPLAY: ", replyMessage);
  // Regular expression matches any number and period in a string
  const regex = /(\d\.)/g;
  // Split the string into an array divided by numbers
  const splitArray = replyMessage?.split(regex);

  return (
    <div className="mt-10 mb-[20vh] p-4 bg-white text-md md:text-xl font-md">
      <ul className="mt-10 font-light">
        {splitArray?.map((item: any, index: any) => {
          // Check if 'item' is a number using the regex
          if (/(\d\.)/g.test(item)) {
            // Render item as a list element if it's a number
            return (
              <li className="font-bold mt-10" key={index}>
                {item}
              </li>
            );
          } else {
            // Just return the text if it's not a number
            return (
              <span className="ms-5" key={index}>
                {item}
              </span>
            );
          }
        })}
      </ul>
    </div>
  );
}
