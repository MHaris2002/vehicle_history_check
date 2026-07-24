import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COLORS } from "../theme";
import { GUIDES } from "../guidesData";

export default function GuideArticle() {
  const { slug } = useParams();
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p style={{ color: COLORS.slate }}>Guide not found.</p>
        <Link to="/guides" className="text-sm font-semibold" style={{ color: COLORS.navyInk }}>Back to guides</Link>
      </div>
    );
  }

  const paragraphs = guide.body.split("\n\n").map((p, i) => {
    if (p.startsWith("**") && p.includes("**\n")) {
      const [heading, ...rest] = p.split("\n");
      return (
        <div key={i} className="mb-4">
          <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: "#111" }}>
            {heading.replace(/\*\*/g, "")}
          </h3>
          <p className="text-sm sm:text-base" style={{ color: COLORS.slate, lineHeight: 1.7 }}>
            {rest.join(" ")}
          </p>
        </div>
      );
    }
    return (
      <p key={i} className="text-sm sm:text-base mb-4" style={{ color: COLORS.slate, lineHeight: 1.7 }}>
        {p}
      </p>
    );
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
      <Link to="/guides" className="inline-flex items-center gap-1 text-xs font-semibold mb-6" style={{ color: COLORS.slate }}>
        <ArrowLeft size={14} /> Back to guides
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#111" }}>{guide.title}</h1>
      <div>{paragraphs}</div>
      <div className="mt-10 pt-6 text-center" style={{ borderTop: `1px solid ${COLORS.paperEdge}` }}>
        <Link to="/" className="text-sm font-semibold" style={{ color: COLORS.navyInk }}>Check a car now →</Link>
      </div>
    </div>
  );
}