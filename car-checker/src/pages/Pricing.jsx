import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COLORS } from "../theme";

const PLANS = [
  {
    name: "Free",
    price: "£0",
    tagline: "For anyone buying a single car",
    features: [
      "Unlimited MOT history checks",
      "Mileage & risk scoring",
      "AI-researched issue report",
      "Web report only",
    ],
    cta: "Check a car",
    to: "/",
    highlight: false,
  },
  {
    name: "Buyer Plus",
    price: "£4.99",
    tagline: "For a one-off, careful purchase",
    features: [
      "Everything in Free",
      "PDF report by email",
      "PDF report by WhatsApp",
      "Report saved to your history",
    ],
    cta: "Get started",
    to: "/",
    highlight: true,
  },
  {
    name: "Dealer / Trade",
    price: "Contact us",
    tagline: "For dealers checking stock at volume",
    features: [
      "Everything in Buyer Plus",
      "Bulk plate checking",
      "Team access",
      "Priority support",
    ],
    cta: "Contact sales",
    to: "/contact",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center" style={{ color: "#111" }}>
        Simple pricing
      </h1>
      <p className="text-sm sm:text-base text-center mb-4" style={{ color: COLORS.slate }}>
        Check a car for free. Upgrade only if you want the report delivered elsewhere.
      </p>
      <p
        className="text-xs text-center mb-12 inline-block mx-auto px-3 py-1 rounded-full"
        style={{ backgroundColor: "#FEF3C7", color: "#92400E", display: "block", width: "fit-content", margin: "0 auto 3rem" }}
      >
        This project is a free portfolio demo — no payment is actually processed.
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="rounded-xl p-6 flex flex-col"
            style={{
              backgroundColor: plan.highlight ? COLORS.navyInk : "white",
              border: `1px solid ${plan.highlight ? COLORS.navyInk : COLORS.paperEdge}`,
              boxShadow: plan.highlight ? "0 8px 24px rgba(11,37,69,0.25)" : "none",
            }}
          >
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: plan.highlight ? COLORS.plateYellow : "#111" }}
            >
              {plan.name}
            </h3>
            <p className="text-2xl font-bold mb-1" style={{ color: plan.highlight ? "white" : "#111" }}>
              {plan.price}
            </p>
            <p className="text-xs mb-6" style={{ color: plan.highlight ? "rgba(255,255,255,0.6)" : COLORS.slate }}>
              {plan.tagline}
            </p>

            <ul className="flex flex-col gap-2 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm" style={{ color: plan.highlight ? "rgba(255,255,255,0.85)" : COLORS.slate }}>
                  <Check size={15} color={plan.highlight ? COLORS.plateYellow : "#15803D"} className="mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={plan.to}
              className="px-4 py-2.5 rounded-md text-sm font-semibold text-center flex items-center justify-center gap-2"
              style={{
                backgroundColor: plan.highlight ? COLORS.plateYellow : COLORS.navyInk,
                color: plan.highlight ? "#111" : "white",
              }}
            >
              {plan.cta} <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}