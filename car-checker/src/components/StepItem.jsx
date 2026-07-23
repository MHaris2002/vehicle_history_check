import React from "react";
import { COLORS } from "../theme";

export default function StepItem({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm"
        style={{ backgroundColor: COLORS.plateYellow, color: "#111" }}
      >
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-sm sm:text-base" style={{ color: "#111" }}>{title}</h3>
        <p className="text-sm mt-1" style={{ color: COLORS.slate }}>{text}</p>
      </div>
    </div>
  );
}