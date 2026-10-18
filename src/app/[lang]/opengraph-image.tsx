import { ImageResponse } from "next/og";
import { BAR_PATHS } from "@/components/layout/Logo";

export const alt = "MSME Marg — Financial Consultant for MSMEs, Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shown when the site is shared on WhatsApp / social media. Kept in English (the default OG font has no Kannada glyphs).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#014425",
          color: "white",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <svg width="66" height="94" viewBox="0 0 53 76">
            {BAR_PATHS.map((d) => (
              <path key={d} d={d} fill="#ffffff" />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 50, fontWeight: 800, lineHeight: 0.92, letterSpacing: -2 }}>
            <span>MSME</span>
            <span>Marg</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.05 }}>Government-backed loans</div>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.05, color: "#8fd9ae" }}>& subsidy for your business.</div>
          <div style={{ marginTop: 26, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            Financial Consultant for MSMEs · Bengaluru · +91 90364 40914
          </div>
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          {[
            ["35%", "PMEGP subsidy"],
            ["20 Lakh", "Mudra, no collateral"],
            ["10 Crore", "CGTMSE, no collateral"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: "16px 26px" }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#8fd9ae" }}>{v}</div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
