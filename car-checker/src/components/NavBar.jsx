import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";
import { COLORS } from "../theme";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/guides", label: "Guides" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full sticky top-0 z-20" style={{ backgroundColor: COLORS.asphalt }}>
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <Car size={20} color={COLORS.plateYellow} strokeWidth={2.25} />
          <span className="font-mono font-bold tracking-wide text-white text-sm sm:text-base" style={{ letterSpacing: "0.06em" }}>
            PLATE<span style={{ color: COLORS.plateYellow }}>CHECK</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to} to={l.to}
              className="text-sm font-medium transition-colors"
              style={{ color: isActive(l.to) ? COLORS.plateYellow : "rgba(255,255,255,0.7)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-sm font-semibold"
            style={{ backgroundColor: COLORS.plateYellow, color: "#111" }}
          >
            Check a car
          </Link>
        </div>

        <button className="md:hidden text-white/80" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4" style={{ borderTop: "1px solid #2A2E35" }}>
          {links.map((l) => (
            <Link
              key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className="text-left py-3 text-sm font-medium"
              style={{ color: isActive(l.to) ? COLORS.plateYellow : "rgba(255,255,255,0.8)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}