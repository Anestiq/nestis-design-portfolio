"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contacts, projects } from "./data";

const services = [
  ["Лендинги", "Запуск продукта, услуги или события"],
  ["Сайты для бизнеса", "Понятная система, которая ведёт к заявке"],
  ["Портфолио", "Характер, ритм и сильная подача работ"],
  ["Редизайн", "Новый уровень без потери узнаваемости"],
  ["Motion и адаптив", "Живой интерфейс на каждом экране"],
];

const steps = [
  ["01", "Погружение", "Разбираю задачу, аудиторию и результат, который должен приносить сайт."],
  ["02", "Система", "Собираю сценарий, структуру и визуальное направление до начала разработки."],
  ["03", "Сборка", "Проектирую интерфейс, пишу код и настраиваю движение без лишнего шума."],
  ["04", "Запуск", "Проверяю ключевые экраны, подключаю домен и передаю готовый продукт."],
];

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
        <nav className="desktop-nav" aria-label="Основная навигация"><a href="#work">Работы</a><a href="/shop">ПАРА / SHOP</a><a href="#about">Обо мне</a><a href="#process">Процесс</a></nav>
        <a className="header-cta" href="#contact">Начать проект <span>↗</span></a>
        <button className={`burger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}><i /><i /></button>
      </header>

      <aside id="mobile-menu" className={`mobile-menu ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Мобильная навигация">{[['Работы','#work'],['ПАРА / SHOP','/shop'],['Обо мне','#about'],['Процесс','#process'],['Контакты','#contact']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<span>↘</span></a>)}</nav>
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
          <div className="work-intro reveal"><p>SELECTED WORK</p><h2>Не обещания.<br />Готовые миры.</h2><span>Три концепции, три характера, одна точность исполнения.</span></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project reveal" key={project.slug}>
                <Link className="project-media" href={project.url} aria-label={`Открыть кейс ${project.title}`}><Image src={project.image} alt={`Главный экран проекта ${project.title}`} fill sizes="(max-width: 800px) 94vw, 70vw" priority={index === 0} /><span className="project-view">Смотреть кейс ↗</span></Link>
                <div className="project-info"><span>{project.number} / 2026</span><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><p>{project.category}</p></div>
              </article>
            ))}
            <article className="project project-shop reveal">
              <a className="project-media" href="/shop" aria-label="Открыть интернет-магазин ПАРА"><div className="project-shop-art"><span>ПАРА</span><i /></div><span className="project-view">Открыть магазин ↗</span></a>
              <div className="project-info"><span>04 / 2026</span><div><h3>ПАРА</h3><p>Город оставляет след</p></div><p>Footwear / Commerce / Motion</p></div>
            </article>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div>DESIGN <i>✳</i> DEVELOPMENT <i>✳</i> MOTION <i>✳</i> MEANING <i>✳</i> DESIGN <i>✳</i> DEVELOPMENT <i>✳</i> MOTION <i>✳</i> MEANING <i>✳</i></div></div>

        <section className="about" id="about">
          <div className="about-manifesto reveal"><span>ABOUT / ANESTIS</span><h2>Красивый сайт ничего не стоит, если он ничего не меняет.</h2></div>
          <div className="about-detail reveal"><div className="about-mark">A®</div><div><p>Я создаю современные сайты для бизнеса, проектов и личных брендов. Соединяю ясную структуру, выразительный дизайн и аккуратную разработку.</p><p>Каждый проект должен быстро загружаться, легко читаться и уверенно вести человека к действию.</p></div><dl><div><dt>03+</dt><dd>авторских кейса</dd></div><div><dt>100%</dt><dd>адаптивный подход</dd></div><div><dt>1:1</dt><dd>работа напрямую</dd></div></dl></div>
        </section>

        <section className="services">
          <div className="services-title reveal"><p>CAPABILITIES</p><h2>От первой мысли<br />до живого сайта.</h2></div>
          <div className="service-list">{services.map(([title, text], index) => <div className="service-row reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p><i>↗</i></div>)}</div>
        </section>

        <section className="process" id="process">
          <div className="process-title"><span>КАК МЫ РАБОТАЕМ</span><h2>Четыре шага.<br />Ноль тумана.</h2><a href="#contact">Начать разговор ↗</a></div>
          <div className="steps">{steps.map(([number, title, text]) => <article className="step reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </section>

        <section className="contact" id="contact">
          <p className="reveal">ЕСТЬ ЗАДАЧА?</p><h2 className="reveal">Давайте сделаем<br />её заметной.</h2>
          <a className="contact-button" href={contacts.telegram.href} target="_blank" rel="noreferrer"><span>Написать в Telegram</span><b>↗</b></a>
          <div className="contact-bottom"><div><span>EMAIL</span><a href={contacts.email.href}>{contacts.email.label}</a></div><div><span>TELEGRAM</span><a href={contacts.telegram.href} target="_blank" rel="noreferrer">{contacts.telegram.label}</a></div><div><span>ЛОКАЦИЯ</span><p>МОСКВА / WORLDWIDE</p></div></div>
        </section>
      </main>

      <footer><span>© 2026 ANESTIS</span><span>DESIGN + CODE + MOTION</span><a href="#top">НАВЕРХ ↑</a></footer>
    </>
  );
}
