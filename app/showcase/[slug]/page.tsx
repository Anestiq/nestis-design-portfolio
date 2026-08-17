import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../data";
import NoxTraining from "./NoxTraining";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.title} | проект Anestis`;
  if (project.slug === "nox-training") {
    const image = "/images/nox/nox-og.png";
    return { title, description: project.description, openGraph: { title, description: project.description, images: [image] }, twitter: { card: "summary_large_image", title, description: project.description, images: [image] } };
  }
  return { title, description: project.description, openGraph: { title, description: project.description, images: [] }, twitter: { title, description: project.description, images: [] } };
}

export default async function ShowcasePage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  if (project.slug === "nox-training") return <NoxTraining />;
  return (
    <main className={`demo-page demo-${project.tone}`}>
      <header className="demo-header"><Link href="/">← ANESTIS / CASE</Link><span>{project.category}</span><Link href="/">CLOSE ×</Link></header>
      <section className="demo-hero"><p>PROJECT {project.number} / 2026</p><h1>{project.title}</h1><h2>{project.subtitle}</h2><div className="demo-art"><i /><i /><i /></div><span className="demo-scroll">SCROLL TO DISCOVER ↓</span></section>
      <section className="demo-story"><p>КОНЦЕПЦИЯ / DIGITAL EXPERIENCE</p><h2>{project.description}</h2><div><span>СТРАТЕГИЯ</span><span>АРТ-ДИРЕКШН</span><span>РАЗРАБОТКА</span><span>МОУШН</span></div></section>
      <section className="demo-gallery"><div><span>01</span></div><div><span>02</span></div><div><span>03</span></div></section>
      <footer className="demo-footer"><p>NEXT PROJECT</p><Link href={`/showcase/${projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length].slug}`}>СЛЕДУЮЩИЙ КЕЙС ↗</Link></footer>
    </main>
  );
}
