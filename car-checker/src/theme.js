import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

export const COLORS = {
  asphalt: "#16181C",
  asphaltSoft: "#1E2126",
  plateYellow: "#FFD400",
  navyInk: "#0B2545",
  paper: "#F5F6F8",
  paperEdge: "#E4E7EB",
  slate: "#5B6472",
  slateSoft: "#8A93A1",
};

export const RISK_META = {
  HIGH: { color: "#DC2626", bg: "#FEE2E2", label: "High risk", Icon: ShieldAlert },
  MEDIUM: { color: "#B45309", bg: "#FEF3C7", label: "Medium risk", Icon: ShieldQuestion },
  LOW: { color: "#15803D", bg: "#DCFCE7", label: "Low risk", Icon: ShieldCheck },
};