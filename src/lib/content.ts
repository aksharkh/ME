import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Cookie,
  Croissant,
  Droplets,
  Dumbbell,
  Factory,
  Hammer,
  Milk,
  Package,
  Printer,
  Scissors,
  Shirt,
  Soup,
  Sprout,
  Stethoscope,
  Store,
  Truck,
  Wheat,
} from "lucide-react";
import type { Dictionary } from "@/i18n/en";

type IndustryId = keyof Dictionary["industries"];

export interface Industry {
  id: IndustryId;
  icon: LucideIcon;
  /** Typical project cost range in lakh */
  range: [number, number];
  schemes: string[];
  food?: boolean;
}

export const industries: Industry[] = [
  { id: "snacks", icon: Cookie, range: [8, 25], schemes: ["PMFME", "PMEGP"], food: true },
  { id: "bakery", icon: Croissant, range: [10, 40], schemes: ["PMFME", "PMEGP"], food: true },
  { id: "spices", icon: Soup, range: [6, 20], schemes: ["PMFME", "Mudra"], food: true },
  { id: "mill", icon: Wheat, range: [10, 50], schemes: ["PMEGP", "CGTMSE"], food: true },
  { id: "dairy", icon: Milk, range: [10, 45], schemes: ["PMFME", "PMEGP"], food: true },
  { id: "oil", icon: Droplets, range: [8, 30], schemes: ["PMFME", "PMEGP"], food: true },
  { id: "agro", icon: Sprout, range: [5, 30], schemes: ["PMFME", "Udyogini"], food: true },
  { id: "garments", icon: Shirt, range: [3, 25], schemes: ["Mudra", "Udyogini"] },
  { id: "printing", icon: Printer, range: [15, 50], schemes: ["PMEGP", "CGTMSE"] },
  { id: "paper", icon: Package, range: [10, 50], schemes: ["PMEGP", "CGTMSE"] },
  { id: "furniture", icon: Armchair, range: [5, 30], schemes: ["PMEGP", "Vishwakarma"] },
  { id: "fabrication", icon: Hammer, range: [10, 50], schemes: ["PMEGP", "CGTMSE"] },
  { id: "manufacturing", icon: Factory, range: [25, 500], schemes: ["CGTMSE", "PMEGP"] },
  { id: "salon", icon: Scissors, range: [3, 15], schemes: ["Mudra", "Udyogini"] },
  { id: "clinic", icon: Stethoscope, range: [10, 50], schemes: ["CGTMSE", "Mudra"] },
  { id: "gym", icon: Dumbbell, range: [8, 20], schemes: ["PMEGP", "Mudra"] },
  { id: "retail", icon: Store, range: [1, 10], schemes: ["Mudra"] },
  { id: "transport", icon: Truck, range: [5, 50], schemes: ["Mudra", "CGTMSE"] },
];

/** [8, 25] → "₹8 – 25 lakh", [25, 500] → "₹25 lakh – 5 crore" */
export function rangeLabel([a, b]: [number, number], units: Dictionary["units"]) {
  if (b >= 100) return `₹${a} ${units.lakh} – ${b / 100} ${units.crore}`;
  return `₹${a} – ${b} ${units.lakh}`;
}

/**
 * Worked examples for the home page. Numbers are computed from the scheme rules in lib/calc —
 * they are illustrations, not client results. Titles live in the dictionaries under examples.items.
 */
export const exampleProjects = [
  { id: "mill", scheme: "PMEGP", href: "/calculators#pmegp" },
  { id: "masala", scheme: "PMFME", href: "/calculators#pmfme" },
  { id: "tailoring", scheme: "Udyogini", href: "/schemes/udyogini" },
  { id: "packaging", scheme: "CGTMSE", href: "/calculators#emi" },
] as const;
