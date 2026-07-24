import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { COLORS } from "../theme";
import { GUIDES } from "../guidesData";

export default function Guides() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
      <div className="flex justify-center mb-5">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.navyInk }}>
          <BookOpen size={22} color={COLORS.plateYellow} />
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center" style={{ color: "#111" }}>Guides</h1>
      <p className="text-sm sm:text-base text-center mb-12" style={{ color: COLORS.slate }}>
        A few things worth knowing before you buy a used car.
      </p>

      <div className="flex flex-col gap-4">
        {GUIDES.map((g) => (
          <Link
            key={g.slug} to={`/guides/${g.slug}`}
            className="rounded-lg p-5 sm:p-6 flex items-center justify-between gap-4"
            style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}
          >
            <div>
              <h2 className="font-semibold text-sm sm:text-base mb-1" style={{ color: "#111" }}>{g.title}</h2>
              <p className="text-xs sm:text-sm" style={{ color: COLORS.slate }}>{g.excerpt}</p>
            </div>
            <ArrowRight size={18} color={COLORS.slate} className="flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}