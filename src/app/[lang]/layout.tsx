import type { Metadata, Viewport } from "next";
import { Arimo, Instrument_Sans, Noto_Sans_Kannada } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { I18nProvider } from "@/i18n/client";
import { locales } from "@/i18n/config";
import { alternates, getDictionary, getLang } from "@/i18n/server";
import { site } from "@/lib/site";
import "../globals.css";

// Instrument Sans for the interface, Arimo (Arial metrics) only for the logo wordmark as printed on the card,
// Noto Sans Kannada for Kannada text in both.
const ui = Instrument_Sans({ variable: "--font-ui-face", subsets: ["latin"] });
const logo = Arimo({ variable: "--font-logo-face", subsets: ["latin"], weight: "700" });
const kannada = Noto_Sans_Kannada({ variable: "--font-kannada-face", subsets: ["kannada"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  const lang = await getLang();
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.homeTitle, template: "%s | MSME Marg" },
    description: t.meta.homeDesc,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.homeTitle,
      description: t.meta.homeDesc,
      locale: lang === "kn" ? "kn_IN" : "en_IN",
    },
    twitter: { card: "summary_large_image" },
    alternates: await alternates("/"),
  };
}

export const viewport: Viewport = { themeColor: "#014425" };

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const t = await getDictionary();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    slogan: t.brand.tag,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    telephone: site.phoneHref.replace("tel:", ""),
    description: t.meta.homeDesc,
    founder: { "@type": "Person", name: site.founder },
    parentOrganization: { "@type": "Organization", name: site.legalName },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "State", name: "Karnataka" },
    availableLanguage: ["English", "Kannada"],
  };

  return (
    <html lang={lang === "kn" ? "kn-IN" : "en-IN"} className={`${ui.variable} ${logo.variable} ${kannada.variable} antialiased`}>
      {/* suppressHydrationWarning: browser extensions (Grammarly etc.) inject attributes into <body> */}
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <I18nProvider lang={lang} dict={t}>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </I18nProvider>
      </body>
    </html>
  );
}
