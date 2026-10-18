// Receives enquiry / lead forms.
// Set ENQUIRY_WEBHOOK_URL (Google Apps Script, Zapier, Make, Slack, a CRM…) to forward each lead as JSON.

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled → silently accept and drop
  if (clean(body.company)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 10),
    city: clean(body.city, 80),
    business: clean(body.business, 60),
    amount: clean(body.amount, 60),
    scheme: clean(body.scheme, 60),
    message: clean(body.message, 1000),
    lang: clean(body.lang, 5) || "en",
    receivedAt: new Date().toISOString(),
  };

  if (lead.name.length < 2) return Response.json({ error: "Please enter your name" }, { status: 422 });
  if (!/^[6-9]\d{9}$/.test(lead.phone)) return Response.json({ error: "Please enter a valid 10-digit mobile number" }, { status: 422 });
  if (!lead.city) return Response.json({ error: "Please enter your city" }, { status: 422 });

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
      return Response.json({ error: "Could not submit right now" }, { status: 502 });
    }
  } else {
    console.info("[enquiry] new lead (set ENQUIRY_WEBHOOK_URL to forward):", lead);
  }

  return Response.json({ ok: true });
}
