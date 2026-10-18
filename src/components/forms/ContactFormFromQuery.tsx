"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./EnquiryForm";

/** Pre-selects the scheme when arriving from a calculator or scheme page (/contact?scheme=pmegp). */
export function ContactFormFromQuery() {
  const scheme = useSearchParams().get("scheme") ?? "";
  return <EnquiryForm defaultScheme={scheme} />;
}
