"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contacts, projects } from "./data";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const ready = window.setTimeout(() => setLoaded(true), 700);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    const pointer = (event: PointerEvent) => {
      cursorRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      document.documentElement.style.setProperty("--px", `${event.clientX}px`);
      document.documentElement.style.setProperty("--py", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => { window.clearTimeout(ready); observer.disconnect(); window.removeEventListener("pointermove", pointer); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#content">К содержанию</a>
      <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden="true"><p>ANESTIS®</p><span>IDEA / DESIGN / CODE</span></div>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>ANESTIS®</a>
        <nav className="desktop-nav" aria-label="Основная навигация"><a href="#work">Работы</a><a href="/shop">ПАРА / SHOP</a><a href="#about">Обо мне</a><a href="#contact">Контакты</a></nav>
        <a className="header-cta" href="#contact">Начать проект <span>↗</span></a>
        <button className={`burger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}><i /><i /></button>
      </header>

      <aside id="mobile-menu" className={`mobile-menu ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Мобильная навигация">{[['Работы','#work'],['ПАРА / SHOP','/shop'],['Обо мне','#about'],['Контакты','#contact']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<span>↘</span></a>)}</nav>
        <a href={contacts.telegram.href} target="_blank" rel="noreferrer">{contacts.telegram.label} ↗</a>
      </aside>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-halo" aria-hidden="true" />
          <p className="availability"><i /> ДОСТУПЕН ДЛЯ НОВЫХ ПРОЕКТОВ</p>
          <h1><span>Сайты с идеей.</span><span>Код с характером.</span></h1>
          <div className="hero-note"><span>01</span><p>Создаю цифровые пространства для бизнеса и личных брендов: от первого смысла до последней анимации.</p></div>
          <div className="hero-actions"><a className="primary-action" href="#work">Смотреть работы <span>↘</span></a><a className="text-action" href="#contact">Обсудить задачу <span>↗</span></a></div>
          <div className="hero-meta" aria-label="Специализация"><span>WEB DESIGN</span><span>DEVELOPMENT</span><span>MOTION</span></div>
        </section>

        <section className="work" id="work">
          <div className="work-intro reveal"><p>SELECTED WORK</p><h2>Четыре проекта.<br />Четыре характера.</h2><span>Архитектура, фитнес, обувь и премиальное ателье — каждый проект можно открыть и посмотреть.</span></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project reveal" key={project.slug}>
                <a className="project-media" href={project.url} aria-label={`Открыть кейс ${project.title}`}><Image src={project.image} alt={`Главный экран проекта ${project.title}`} fill sizes="(max-width: 800px) 94vw, 70vw" priority={index === 0} /><span className="project-view">Смотреть кейс ↗</span></a>
                <div className="project-info"><span>{project.number} / 2026</span><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><p>{project.category}</p></div>
              </article>
            ))}
            <article className="project project-shop reveal">
              <a className="project-media" href="/shop" aria-label="Открыть интернет-магазин ПАРА"><div className="project-shop-art"><span>ПАРА</span><i /></div><span className="project-view">Открыть магазин ↗</span></a>
              <div className="project-info"><span>03 / 2026</span><div><h3>ПАРА</h3><p>Город оставляет след</p></div><p>Footwear / Commerce / Motion</p></div>
            </article>
            <article className="project project-atelier reveal">
              <a className="project-media" href="https://atelier-anest-2026.kaloerovanestis603.chatgpt.site" target="_blank" rel="noreferrer" aria-label="Открыть сайт Atelier Anest в новой вкладке">
                <Image src="/images/project-atelier-v2.webp" alt="Мастер Atelier Anest раскраивает шерстяную ткань на рабочем столе" fill sizes="(max-width: 800px) 94vw, 70vw" />
                <span className="project-view">Открыть сайт ↗</span>
              </a>
              <div className="project-info"><span>04 / 2026</span><div><h3>ATELIER</h3><p>Одежда, созданная для вас</p></div><p>Fashion / Editorial / Development</p></div>
            </article>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div>NOX TRAINING <i>✳</i> AITHER ARCHITECTS <i>✳</i> ПАРА <i>✳</i> ATELIER <i>✳</i> NOX TRAINING <i>✳</i> AITHER ARCHITECTS <i>✳</i> ПАРА <i>✳</i> ATELIER <i>✳</i></div></div>

        <section className="about" id="about">
          <div className="about-manifesto reveal"><span>ABOUT / ANESTIS</span><h2>Красивый сайт ничего не стоит, если он ничего не меняет.</h2></div>
          <div className="about-detail reveal"><div className="about-mark">A®</div><div><p>Я собираю сайты с разным характером и показываю здесь только те работы, которые уже можно открыть и проверить.</p><p>В портфолио — четыре проекта: архитектурное бюро, фитнес-клуб, магазин обуви и ателье.</p></div><dl><div><dt>04</dt><dd>работы в портфолио</dd></div><div><dt>UI</dt><dd>дизайн интерфейсов</dd></div><div><dt>CODE</dt><dd>фронтенд-разработка</dd></div></dl></div>
        </section>

        <section className="contact" id="contact">
          <p className="reveal">ЕСТЬ ЗАДАЧА?</p><h2 className="reveal">Давайте сделаем<br />её заметной.</h2>
          <a className="contact-button" href={contacts.telegram.href} target="_blank" rel="noreferrer"><span>Написать в Telegram</span><b>↗</b></a>
          <div className="contact-bottom"><div><span>TELEGRAM</span><a href={contacts.telegram.href} target="_blank" rel="noreferrer">{contacts.telegram.label}</a></div><div><span>MAX / НАЙТИ ПО НОМЕРУ</span><a href={contacts.max.href} target="_blank" rel="noreferrer">{contacts.max.label}</a></div><div><span>ЛОКАЦИЯ</span><p>КРАСНОДАР</p></div></div>
        </section>
      </main>

      <footer><span>© 2026 ANESTIS</span><span>DESIGN + CODE + MOTION</span><a href="#top">НАВЕРХ ↑</a></footer>
    </>
  );
}
