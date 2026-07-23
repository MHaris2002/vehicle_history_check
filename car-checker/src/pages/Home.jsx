import React, { useState, useRef, useEffect } from "react";
import {
  ShieldQuestion, ShieldAlert, Loader2, Settings2, MessageCircle, Search,
  Sparkles, FileText, ArrowRight, Database, Zap, AlertTriangle, Gauge,
  EyeOff, Fingerprint,
} from "lucide-react";
import { COLORS, RISK_META } from "../theme";
import { formatReg, isPlausiblePlate, linkifyHtml } from "../utils/format";
import FeatureCard from "../components/FeatureCard";
import StepItem from "../components/StepItem";
import ScamCard from "../components/ScamCard";
import carHeroImage from "../assets/car.avif";

export default function Home() {
  const [reg, setReg] = useState("");
  const [webhookUrl, setWebhookUrl] = useState(
    "http://localhost:5678/webhook/9b0b423e-7a80-4897-b1a0-04294dc097b2"
  );
  const [whatsappWebhookUrl, setWhatsappWebhookUrl] = useState(
    "http://localhost:5678/webhook/6f036323-ca49-4e56-bee4-c22d86eeeb69"
  );
  const [emailWebhookUrl, setEmailWebhookUrl] = useState(
    "http://localhost:5678/webhook/send-email"
  );
  const [recentChecksUrl, setRecentChecksUrl] = useState(
    "http://localhost:5678/webhook/recent-checks"
  );
  const [showSettings, setShowSettings] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [phone, setPhone] = useState("");
  const [sendingWa, setSendingWa] = useState(false);
  const [waStatus, setWaStatus] = useState("");

  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  const [recentChecks, setRecentChecks] = useState([]);

  const heroRef = useRef(null);

  useEffect(() => {
    fetch(recentChecksUrl)
      .then((res) => res.json())
      .then((data) => setRecentChecks(data.checks || []))
      .catch(() => setRecentChecks([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshRecentChecks() {
    fetch(recentChecksUrl)
      .then((res) => res.json())
      .then((d) => setRecentChecks(d.checks || []))
      .catch(() => {});
  }

  async function handleCheck() {
    const cleaned = formatReg(reg);
    setError("");
    setResult(null);
    setWaStatus("");
    setEmailStatus("");

    if (!cleaned) { setError("Enter a registration plate to check."); return; }
    if (!isPlausiblePlate(cleaned)) { setError("That doesn't look like a valid UK plate."); return; }

    setLoading(true);
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration: cleaned }),
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); }
      catch {
        data = { make: "", model: "", registration: cleaned, riskLevel: null, riskScore: null, reportHtml: text };
      }
      setResult(data);
      refreshRecentChecks();
    } catch {
      setError("Couldn't reach the checker. Confirm the webhook URL and that n8n is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendWhatsapp() {
    setWaStatus("");
    if (!phone || phone.replace(/\D/g, "").length < 8) {
      setWaStatus("error:Enter a valid phone number with country code, e.g. +447123456789");
      return;
    }
    setSendingWa(true);
    try {
      const res = await fetch(whatsappWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, ...result }),
      });
      if (res.ok) setWaStatus("success:Report sent — check WhatsApp.");
      else setWaStatus("error:Something went wrong sending the report.");
    } catch {
      setWaStatus("error:Couldn't reach the send service.");
    } finally {
      setSendingWa(false);
    }
  }

  async function handleSendEmail() {
    setEmailStatus("");
    if (!email || !email.includes("@")) {
      setEmailStatus("error:Enter a valid email address");
      return;
    }
    setSendingEmail(true);
    try {
      const res = await fetch(emailWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...result }),
      });
      if (res.ok) setEmailStatus("success:Report sent — check your inbox.");
      else setEmailStatus("error:Something went wrong sending the report.");
    } catch {
      setEmailStatus("error:Couldn't reach the send service.");
    } finally {
      setSendingEmail(false);
    }
  }

  function scrollToChecker() {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const risk = result?.riskLevel ? RISK_META[result.riskLevel] : null;
  const [waKind, waMsg] = waStatus.includes(":") ? waStatus.split(":") : ["", ""];
  const [emailKind, emailMsg] = emailStatus.includes(":") ? emailStatus.split(":") : ["", ""];

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="w-full px-4 sm:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${carHeroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${COLORS.asphalt}99 0%, ${COLORS.asphalt}55 35%, ${COLORS.asphalt}99 75%, ${COLORS.asphalt} 100%)` }}
        />
        <div
          className="max-w-xl mx-auto text-center relative rounded-2xl px-5 sm:px-10 py-8 sm:py-10"
          style={{ backgroundColor: "rgba(10,11,13,0.55)", backdropFilter: "blur(2px)" }}
        >
          <div className="flex justify-center mb-3">
            <button onClick={() => setShowSettings((s) => !s)} className="text-white/40 hover:text-white/80 transition-colors p-1" aria-label="Settings">
              <Settings2 size={16} />
            </button>
          </div>

          <h1 className="text-white font-mono font-extrabold uppercase leading-tight text-2xl sm:text-4xl" style={{ letterSpacing: "0.02em" }}>
            Know what you're<br />really buying
          </h1>
          <p className="mt-3 text-sm sm:text-base" style={{ color: COLORS.slateSoft }}>
            Full MOT history, mileage checks, and known issues — researched automatically from a plate number.
          </p>

          {showSettings && (
            <div className="mt-4 text-left rounded-md p-4 flex flex-col gap-3" style={{ backgroundColor: COLORS.asphaltSoft }}>
              <div>
                <label className="text-xs font-mono text-white/50">CAR-CHECK WEBHOOK URL</label>
                <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded text-xs font-mono"
                  style={{ backgroundColor: "#0F1114", color: "white", border: "1px solid #2A2E35" }} />
              </div>
              <div>
                <label className="text-xs font-mono text-white/50">WHATSAPP-SEND WEBHOOK URL</label>
                <input value={whatsappWebhookUrl} onChange={(e) => setWhatsappWebhookUrl(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded text-xs font-mono"
                  style={{ backgroundColor: "#0F1114", color: "white", border: "1px solid #2A2E35" }} />
              </div>
              <div>
                <label className="text-xs font-mono text-white/50">SEND-EMAIL WEBHOOK URL</label>
                <input value={emailWebhookUrl} onChange={(e) => setEmailWebhookUrl(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded text-xs font-mono"
                  style={{ backgroundColor: "#0F1114", color: "white", border: "1px solid #2A2E35" }} />
              </div>
              <div>
                <label className="text-xs font-mono text-white/50">RECENT-CHECKS WEBHOOK URL</label>
                <input value={recentChecksUrl} onChange={(e) => setRecentChecksUrl(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded text-xs font-mono"
                  style={{ backgroundColor: "#0F1114", color: "white", border: "1px solid #2A2E35" }} />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-stretch rounded-md overflow-hidden shadow-lg" style={{ border: "3px solid #1a1a1a" }}>
              <div className="flex flex-col items-center justify-center px-2" style={{ backgroundColor: COLORS.navyInk }}>
                <span className="text-white text-[10px] font-bold leading-none">GB</span>
              </div>
              <input
                type="text" value={reg}
                onChange={(e) => setReg(formatReg(e.target.value))}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="AB12CDE" maxLength={8}
                className="font-mono font-extrabold uppercase text-center focus:outline-none px-3 sm:px-4 py-3 text-xl sm:text-2xl w-[180px] sm:w-[220px]"
                style={{ backgroundColor: COLORS.plateYellow, color: "#111", letterSpacing: "0.08em" }}
                aria-label="Registration plate"
              />
            </div>
          </div>

          <button
            onClick={handleCheck} disabled={loading}
            className="mt-5 w-full sm:w-auto px-8 py-3 rounded-md font-semibold text-sm sm:text-base focus:outline-none focus-visible:ring-2"
            style={{ backgroundColor: loading ? "#3a3f47" : "white", color: loading ? COLORS.slateSoft : COLORS.asphalt }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" />Checking...</span>
            ) : "Check this car"}
          </button>

          {error && <p className="mt-4 text-sm" style={{ color: "#FCA5A5" }}>{error}</p>}

          {loading && (
            <div className="mt-6 h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: "#2A2E35" }}>
              <div className="h-full animate-pulse" style={{ backgroundColor: COLORS.plateYellow, width: "60%" }} />
            </div>
          )}

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <Database size={15} color={COLORS.plateYellow} />
              <span className="text-xs" style={{ color: COLORS.slateSoft }}>Official DVSA data</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={15} color={COLORS.plateYellow} />
              <span className="text-xs" style={{ color: COLORS.slateSoft }}>AI-powered research</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={15} color={COLORS.plateYellow} />
              <span className="text-xs" style={{ color: COLORS.slateSoft }}>Results in seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sample preview */}
      {!result && !loading && (
        <div className="w-full px-4 sm:px-8 py-10 sm:py-14 flex justify-center">
          <div className="w-full max-w-2xl rounded-lg shadow-sm overflow-hidden relative" style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}>
            <div className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide" style={{ backgroundColor: COLORS.plateYellow, color: "#111" }}>
              Example
            </div>
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4" style={{ backgroundColor: "#FEE2E2", borderBottom: `1px solid ${COLORS.paperEdge}` }}>
              <ShieldAlert size={22} color="#DC2626" />
              <div>
                <p className="font-semibold text-sm sm:text-base" style={{ color: "#DC2626" }}>High risk <span className="font-normal opacity-70">· score 28</span></p>
                <p className="text-xs sm:text-sm" style={{ color: COLORS.slate }}>Toyota — AB00CDF</p>
              </div>
            </div>
            <div className="px-5 sm:px-6 py-6 text-sm" style={{ color: "#444" }}>
              <p className="mb-3">"The MOT history shows a consistent pattern of severe structural corrosion and recurring suspension failures over the last several years..."</p>
              <p className="text-xs italic" style={{ color: COLORS.slateSoft }}>This is what a real report looks like — enter a plate above to generate your own.</p>
            </div>
          </div>
        </div>
      )}

      {/* Report */}
      {result && (
        <div className="w-full px-4 sm:px-8 py-10 sm:py-14 flex justify-center">
          <div className="w-full max-w-2xl rounded-lg shadow-sm overflow-hidden" style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}>
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4" style={{ backgroundColor: risk ? risk.bg : "#EEF0F2", borderBottom: `1px solid ${COLORS.paperEdge}` }}>
              {risk ? <risk.Icon size={22} color={risk.color} /> : <ShieldQuestion size={22} color={COLORS.slate} />}
              <div>
                <p className="font-semibold text-sm sm:text-base" style={{ color: risk ? risk.color : COLORS.slate }}>
                  {risk ? risk.label : "Report"}
                  {result.riskScore != null && <span className="font-normal opacity-70"> · score {result.riskScore}</span>}
                </p>
                {(result.make || result.model) && (
                  <p className="text-xs sm:text-sm" style={{ color: COLORS.slate }}>{result.make} {result.model} — {result.registration}</p>
                )}
              </div>
            </div>

            <div className="px-5 sm:px-6 py-6" style={{ color: "#222" }}
              dangerouslySetInnerHTML={{ __html: linkifyHtml(result.reportHtml || "") }} />

            <div className="px-5 sm:px-6 py-5" style={{ borderTop: `1px solid ${COLORS.paperEdge}`, backgroundColor: "#FAFBFC" }}>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={18} color="#25D366" />
                <p className="text-sm font-semibold" style={{ color: "#111" }}>Send this report to WhatsApp</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+447123456789"
                  className="flex-1 px-3 py-2 rounded-md text-sm focus:outline-none"
                  style={{ border: `1px solid ${COLORS.paperEdge}` }}
                />
                <button
                  onClick={handleSendWhatsapp} disabled={sendingWa}
                  className="px-5 py-2 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-2"
                  style={{ backgroundColor: sendingWa ? "#9CA3AF" : "#25D366" }}
                >
                  {sendingWa ? <Loader2 size={14} className="animate-spin" /> : <MessageCircle size={14} />}
                  {sendingWa ? "Sending..." : "Send PDF"}
                </button>
              </div>
              {waMsg && <p className="mt-2 text-xs" style={{ color: waKind === "success" ? "#15803D" : "#DC2626" }}>{waMsg}</p>}
              <p className="mt-2 text-[11px]" style={{ color: COLORS.slateSoft }}>
                Uses a Twilio WhatsApp Sandbox — your number must have joined the sandbox to receive messages.
              </p>
            </div>

            <div className="px-5 sm:px-6 py-5" style={{ borderTop: `1px solid ${COLORS.paperEdge}` }}>
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} color={COLORS.navyInk} />
                <p className="text-sm font-semibold" style={{ color: "#111" }}>Send this report by email</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 px-3 py-2 rounded-md text-sm focus:outline-none"
                  style={{ border: `1px solid ${COLORS.paperEdge}` }}
                />
                <button
                  onClick={handleSendEmail} disabled={sendingEmail}
                  className="px-5 py-2 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-2"
                  style={{ backgroundColor: sendingEmail ? "#9CA3AF" : COLORS.navyInk }}
                >
                  {sendingEmail ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                  {sendingEmail ? "Sending..." : "Send PDF"}
                </button>
              </div>
              {emailMsg && <p className="mt-2 text-xs" style={{ color: emailKind === "success" ? "#15803D" : "#DC2626" }}>{emailMsg}</p>}
            </div>

            <div className="px-5 sm:px-6 py-3 text-[11px]" style={{ color: COLORS.slateSoft, borderTop: `1px solid ${COLORS.paperEdge}` }}>
              Automated check from DVSA MOT history + AI research. Not professional inspection advice.
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center" style={{ color: "#111" }}>How it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <StepItem number="1" title="Enter a plate" text="Type any UK registration plate into the checker above." />
          <StepItem number="2" title="We pull official records" text="Real MOT history, mileage, and failures — straight from DVSA." />
          <StepItem number="3" title="AI researches the rest" text="Known issues, recalls, and a plain-English risk report, generated live." />
        </div>
      </div>

      {/* Recent checks */}
      {recentChecks.length > 0 && (
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center" style={{ color: "#111" }}>Recently checked</h2>
          <div className="flex flex-col gap-3">
            {recentChecks.map((check, i) => {
              const meta = RISK_META[check.riskLevel] || {};
              return (
                <div key={i} className="flex items-center justify-between rounded-lg p-4" style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#111" }}>{check.make} {check.model}</p>
                    <p className="text-xs" style={{ color: COLORS.slate }}>{check.registration}</p>
                  </div>
                  {meta.Icon && (
                    <div className="flex items-center gap-2">
                      <meta.Icon size={16} color={meta.color} />
                      <span className="text-xs font-semibold" style={{ color: meta.color }}>{check.riskLevel}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Scam awareness */}
      <div className="relative overflow-hidden" style={{ backgroundColor: COLORS.asphalt }}>
        <AlertTriangle className="absolute top-10 left-8 sm:left-16 float-a" size={36} color={COLORS.plateYellow} style={{ opacity: 0.15 }} />
        <Gauge className="absolute top-24 right-10 sm:right-24 float-b" size={44} color={COLORS.plateYellow} style={{ opacity: 0.12 }} />
        <EyeOff className="absolute bottom-16 left-16 sm:left-32 float-c" size={30} color={COLORS.plateYellow} style={{ opacity: 0.15 }} />
        <Fingerprint className="absolute bottom-10 right-8 sm:right-40 float-a" size={34} color={COLORS.plateYellow} style={{ opacity: 0.1 }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-20 relative text-center">
          <p className="text-xs font-mono tracking-widest mb-3" style={{ color: COLORS.plateYellow }}>WHY THIS MATTERS</p>
          <h2 className="float-headline text-2xl sm:text-3xl font-bold text-white mb-10">Used cars hide more than you'd think</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-left">
            <ScamCard icon={Gauge} title="Odometer clocking" text="Mileage rolled back to hide true wear — invisible without checking the MOT history trail." />
            <ScamCard icon={EyeOff} title="Underseal masking rust" text="Fresh underseal can hide structural corrosion rather than treat it." />
            <ScamCard icon={AlertTriangle} title="Repeat structural failures" text="The same MOT advisory reappearing year after year is a pattern worth questioning." />
            <ScamCard icon={Fingerprint} title="Cloned or altered plates" text="Cross-checking official records helps confirm a vehicle's history actually matches what you're told." />
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ backgroundColor: "white", borderTop: `1px solid ${COLORS.paperEdge}`, borderBottom: `1px solid ${COLORS.paperEdge}` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center" style={{ color: "#111" }}>Why PlateCheck</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard icon={FileText} title="Real DVSA data" text="Official MOT test history, not a scraped estimate." />
            <FeatureCard icon={Search} title="Live AI research" text="Searches the web for known issues specific to this make and model." />
            <FeatureCard icon={ShieldAlert} title="Mileage fraud checks" text="Flags inconsistent or decreasing mileage across MOT tests." />
            <FeatureCard icon={MessageCircle} title="Send to WhatsApp" text="Get a PDF copy of any report sent straight to your phone." />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-14 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: "#111" }}>Ready to check a car?</h2>
        <button
          onClick={scrollToChecker}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm text-white"
          style={{ backgroundColor: COLORS.navyInk }}
        >
          Check a plate now <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}