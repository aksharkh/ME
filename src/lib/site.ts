// Business details — taken from the founder's visiting card.
export const site = {
  name: "MSME Marg",
  legalName: "Six Star Axis Ventures",
  domain: "msmemarg.com",
  url: "https://msmemarg.com",
  founder: "Narendra Kumar B",
  // Palette button above WhatsApp so the client can try every colour theme. Turn off once a theme is chosen
  // (and set DEFAULT_THEME in src/lib/themes.ts to the chosen one).
  showThemePicker: true,
  phoneDisplay: "+91 90364 40914",
  phoneHref: "tel:+919036440914",
  // Assumed to be the same number as the phone on the card — confirm with the client.
  whatsapp: "919036440914",
  email: "narendra@msmemarg.com",
  address: {
    street: "No 59/1, Krishna Reddy Industrial Area, FCI Godown Road",
    locality: "Dooravaninagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560016",
    country: "IN",
  },
};

const mapsQuery = encodeURIComponent(
  `MSME Marg, ${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}`,
);
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}`,
)}&z=16&output=embed`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Headline numbers on the home page — published scheme limits, not company claims.
 * Labels live in the dictionaries under `facts`.
 */
export const facts: { value: number; prefix: string; unit?: "lakh" | "crore"; suffix?: string }[] = [
  { value: 35, prefix: "", suffix: "%" },
  { value: 20, prefix: "₹", unit: "lakh" },
  { value: 10, prefix: "₹", unit: "crore" },
  { value: 10, prefix: "₹", unit: "lakh" },
];

export const navItems = [
  { href: "/schemes", key: "schemes" },
  { href: "/calculators", key: "calculators" },
  { href: "/eligibility", key: "eligibility" },
  { href: "/#industries", key: "industries" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;
