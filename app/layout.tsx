import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./aither.css";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og-v2.png`;
  const title = "Anestis | Web Designer & Developer";
  const description = "Современные сайты, лендинги и веб-дизайн для бизнеса. Портфолио веб-разработчика Anestis.";
  return { title, description, icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }, openGraph: { title, description, type: "website", locale: "ru_RU", images: [{ url: image, width: 1792, height: 936, alt: title }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
