"use client";

import { useEffect } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSense({ slot, format = "auto", className }: AdSenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`ad-container my-6 ${className ?? ""}`} aria-label="Publicidad">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9649239009303767"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
