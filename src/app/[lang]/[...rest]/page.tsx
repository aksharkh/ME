import { notFound } from "next/navigation";

// Any unknown URL renders the localized not-found page from [lang]/not-found.tsx
export const instant = false;

export default function CatchAll() {
  notFound();
}
