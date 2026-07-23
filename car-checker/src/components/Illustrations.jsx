import React from "react";
import { COLORS } from "../theme";

export function CarSilhouette({ className, opacity = 1 }) {
  return (
    <svg viewBox="0 0 400 160" className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 120 C20 90 50 85 70 82 L100 50 C108 42 120 38 132 38 L260 38 C274 38 286 44 294 54 L320 82 C345 85 372 92 378 112 C380 118 378 124 372 126 L350 126 C350 108 336 94 318 94 C300 94 286 108 286 126 L120 126 C120 108 106 94 88 94 C70 94 56 108 56 126 L34 126 C26 126 20 122 20 120 Z"
        stroke={COLORS.plateYellow} strokeWidth="3"
      />
      <circle cx="88" cy="126" r="18" stroke={COLORS.plateYellow} strokeWidth="3" />
      <circle cx="318" cy="126" r="18" stroke={COLORS.plateYellow} strokeWidth="3" />
      <path d="M132 44 L132 82 M192 44 L192 82 M260 44 L292 82" stroke={COLORS.plateYellow} strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

export function GarageBayIllustration({ className }) {
  return (
    <svg viewBox="0 0 200 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="180" height="100" rx="4" stroke={COLORS.navyInk} strokeWidth="2" opacity="0.15" />
      <path d="M10 60 L190 60" stroke={COLORS.navyInk} strokeWidth="2" opacity="0.15" />
      <path d="M50 20 L50 120 M150 20 L150 120" stroke={COLORS.navyInk} strokeWidth="2" opacity="0.1" />
      <circle cx="100" cy="90" r="24" stroke={COLORS.navyInk} strokeWidth="2" opacity="0.2" />
      <path d="M100 74 L100 90 L112 98" stroke={COLORS.navyInk} strokeWidth="2" opacity="0.25" />
    </svg>
  );
}