import React, { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { COLORS } from "../theme";

export default function Contact() {
  const CONTACT_WEBHOOK_URL = "http://localhost:5678/webhook/contact";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "error" | ""

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    if (!name.trim() || !email.includes("@") || !message.trim()) {
      setStatus("error");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
      <div className="flex justify-center mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: COLORS.navyInk }}
        >
          <Mail size={22} color={COLORS.plateYellow} />
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ color: "#111" }}>
        Get in touch
      </h1>
      <p className="text-sm text-center mb-10" style={{ color: COLORS.slate }}>
        Questions, feedback, or found something that looks wrong in a report? Send us a message.
      </p>

      {status === "success" ? (
        <div
          className="rounded-lg p-6 text-center flex flex-col items-center gap-3"
          style={{ backgroundColor: "#DCFCE7", border: "1px solid #BBF7D0" }}
        >
          <CheckCircle2 size={28} color="#15803D" />
          <p className="font-semibold text-sm" style={{ color: "#15803D" }}>
            Message sent — thanks for reaching out.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg p-6 sm:p-8 flex flex-col gap-4"
          style={{ backgroundColor: "white", border: `1px solid ${COLORS.paperEdge}` }}
        >
          <div>
            <label className="text-xs font-semibold" style={{ color: COLORS.slate }}>Name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md text-sm focus:outline-none"
              style={{ border: `1px solid ${COLORS.paperEdge}` }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-semibold" style={{ color: COLORS.slate }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md text-sm focus:outline-none"
              style={{ border: `1px solid ${COLORS.paperEdge}` }}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold" style={{ color: COLORS.slate }}>Message</label>
            <textarea
              value={message} onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full mt-1 px-3 py-2 rounded-md text-sm focus:outline-none resize-none"
              style={{ border: `1px solid ${COLORS.paperEdge}` }}
              placeholder="How can we help?"
            />
          </div>

          {status === "error" && (
            <p className="text-xs" style={{ color: "#DC2626" }}>
              Please fill in all fields with a valid email, then try again.
            </p>
          )}

          <button
            type="submit" disabled={sending}
            className="mt-2 px-6 py-3 rounded-md font-semibold text-sm text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: sending ? "#9CA3AF" : COLORS.navyInk }}
          >
            {sending ? <Loader2 size={16} className="animate-spin" /> : null}
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}