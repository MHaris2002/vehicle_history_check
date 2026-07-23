import React from "react";

export default function FloatingStyles() {
  return (
    <style>{`
      @keyframes plateFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes plateFloatSlow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-16px) rotate(4deg); }
      }
      .float-a { animation: plateFloat 4s ease-in-out infinite; }
      .float-b { animation: plateFloatSlow 5.5s ease-in-out infinite; animation-delay: 0.6s; }
      .float-c { animation: plateFloat 4.8s ease-in-out infinite; animation-delay: 1.2s; }
      .float-headline { animation: plateFloat 6s ease-in-out infinite; }
    `}</style>
  );
}