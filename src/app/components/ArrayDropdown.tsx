"use client";

import { useState, useEffect } from "react";
import Restriction from "@/app/types/Restriction";
import { set } from "mongoose";

export default function ArrayDropdown({ items }: { items: string[] }) {
  const [selectedRestriction, setSelectedRestriction] = useState("");

  return (
    <>
      <select
        value={selectedRestriction}
        onChange={(e) => setSelectedRestriction(e.target.value)}
        name="recipe"
        className="p-1 border rounded-lg border-black"
      >
        <option value="">Select a Restriction</option>
        {items &&
          items.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
      </select>
    </>
  );
}
