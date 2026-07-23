import React from "react";
import { COLORS } from "../theme";

export default function ScamCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <Icon size={20} color={COLORS.plateYellow} className="mb-3" />
      <h3 className="font-semibold text-sm mb-1 text-white">{title}</h3>
      <p className="text-sm" style={{ color: COLORS.slateSoft }}>{text}</p>
    </div>
  );
}