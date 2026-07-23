import React from "react";
import { COLORS } from "../theme";

export default function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}>
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center mb-3"
        style={{ backgroundColor: COLORS.navyInk }}
      >
        <Icon size={18} color={COLORS.plateYellow} />
      </div>
      <h3 className="font-semibold text-sm mb-1" style={{ color: "#111" }}>{title}</h3>
      <p className="text-sm" style={{ color: COLORS.slate }}>{text}</p>
    </div>
  );
}