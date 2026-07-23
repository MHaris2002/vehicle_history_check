import React from "react";
import { Car } from "lucide-react";
import { COLORS } from "../theme";

export default function Footer() {
  return (
    <div style={{ backgroundColor: COLORS.asphalt, borderTop: "1px solid #2A2E35" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <Car size={16} color={COLORS.plateYellow} />
          <span className="font-mono text-xs text-white/60 tracking-wide">PLATECHECK</span>
        </div>
        <p className="text-xs text-center" style={{ color: COLORS.slateSoft }}>
          Automated check using DVSA MOT history and AI research. Not professional inspection advice. Portfolio automation project.
        </p>
      </div>
    </div>
  );
}