"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, LoaderCircle, MessageCircle, PhoneCall } from "lucide-react";
import { getSchemes } from "@/lib/schemes";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";

type Status = "idle" | "sending" | "done" | "error";

export function EnquiryForm({ defaultScheme = "", compact = false }: { defaultScheme?: string; compact?: boolean }) {
  const { t, lang } = useI18n();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setName(String(data.name || ""));
      setStatus("done");
    } catch {
      setError(f.error);
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-steel-2 focus:border-brand-600";

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-600 text-white"
          >
            <PhoneCall className="h-9 w-9" />
          </motion.div>
          <h3 className="font-display mt-5 text-2xl font-bold text-ink">{fill(f.thanks, { name: name ? `, ${name.split(" ")[0]}` : "" })}</h3>
          <p className="mt-2 text-ink-3">{f.thanksSub}</p>
          <a
            href={whatsappLink(t.cta.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white"
          >
            <MessageCircle className="h-5 w-5" /> {f.thanksWhatsapp}
          </a>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" exit={{ opacity: 0 }}>
          {/* honeypot — real people never see or fill this */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.name}</span>
            <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder={f.namePh} className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.phone}</span>
            <div className="flex">
              <span className="grid place-items-center rounded-l-xl border-2 border-r-0 border-line bg-mist px-3 font-bold text-ink-3">+91</span>
              <input
                name="phone"
                required
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                autoComplete="tel-national"
                placeholder={f.phonePh}
                title={f.phoneTitle}
                className={`${field} rounded-l-none`}
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.city}</span>
            <input name="city" required maxLength={80} autoComplete="address-level2" placeholder={f.cityPh} className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.business}</span>
            <select name="business" className={field} defaultValue="">
              <option value="" disabled>
                {f.select}
              </option>
              {f.businessTypes.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.amount}</span>
            <select name="amount" className={field} defaultValue="">
              <option value="" disabled>
                {f.select}
              </option>
              {f.amounts.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.scheme}</span>
            <select name="scheme" className={field} defaultValue={defaultScheme}>
              <option value="">{f.schemeAny}</option>
              {getSchemes(t).map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          {!compact && (
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-bold text-ink-3">{f.message}</span>
              <textarea name="message" rows={3} maxLength={1000} placeholder={f.messagePh} className={field} />
            </label>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-4 text-lg font-bold text-white shadow-[0_6px_0_0_var(--color-brand-950)] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_var(--color-brand-950)] active:translate-y-[6px] active:shadow-none disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" /> {f.sending}
                </>
              ) : (
                <>
                  {f.submit} <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
            {status === "error" && (
              <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}
            <p className="mt-3 text-center text-xs text-steel">{f.privacy}</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
