import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { BadgeIndianRupee, Calculator, Factory, Gauge, Wheat } from "lucide-react";
import type { CalculatorId } from "@/lib/schemes";
import { PmegpCalc } from "./PmegpCalc";
import { PmfmeCalc } from "./PmfmeCalc";
import { EmiCalc } from "./EmiCalc";
import { ClassifyCalc } from "./ClassifyCalc";
import { MudraCalc } from "./MudraCalc";

// Titles and descriptions live in the dictionaries under calc.meta[id]
export const calculators: { id: CalculatorId; icon: LucideIcon; Component: ComponentType }[] = [
  { id: "pmegp", icon: Factory, Component: PmegpCalc },
  { id: "pmfme", icon: Wheat, Component: PmfmeCalc },
  { id: "emi", icon: Calculator, Component: EmiCalc },
  { id: "classify", icon: Gauge, Component: ClassifyCalc },
  { id: "mudra", icon: BadgeIndianRupee, Component: MudraCalc },
];
