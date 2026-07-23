import React from "react";
import { CheckCircle2 } from "lucide-react";
import { COLORS } from "../theme";
import { GarageBayIllustration } from "../components/Illustrations";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
      <div className="flex justify-center mb-6">
        <GarageBayIllustration className="w-40 sm:w-48" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center" style={{ color: "#111" }}>About PlateCheck</h1>
      <p className="text-sm sm:text-base mb-4" style={{ color: COLORS.slate }}>
        PlateCheck was built to solve a real problem: used-car buyers rarely have the time or expertise
        to properly investigate a vehicle's history before handing over money. Official MOT records exist,
        but reading raw test data and knowing what it actually means for a specific make and model takes
        real effort.
      </p>
      <p className="text-sm sm:text-base mb-4" style={{ color: COLORS.slate }}>
        This tool automates that process: it pulls a car's full MOT history directly from DVSA, checks
        the mileage trail for signs of tampering, scores the overall risk, and then uses an AI agent —
        with real web search — to research what's actually known about that specific model's common
        problems, before writing a plain-English report a buyer can actually use.
      </p>
      <div className="my-8 rounded-lg p-5" style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={18} color={COLORS.navyInk} />
          <h3 className="font-semibold text-sm" style={{ color: "#111" }}>Built with</h3>
        </div>
        <p className="text-sm" style={{ color: COLORS.slate }}>
          n8n workflow automation, the DVSA MOT History API, an AI agent with live web search,
          and a React front end — orchestrated end to end with no manual steps.
        </p>
      </div>
      <p className="text-xs" style={{ color: COLORS.slateSoft }}>
        This is a portfolio automation project. Reports are generated automatically and are not a
        substitute for a professional vehicle inspection.
      </p>
    </div>
  );
}