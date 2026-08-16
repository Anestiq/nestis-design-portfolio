"use client";

import { useEffect, useRef, useState } from "react";
import { contacts, projects } from "./data";

const services = ["Лендинги", "Сайты для бизнеса", "Сайты-портфолио", "Редизайн", "Анимации интерфейса", "Мобильный адаптив"];
const steps = [
  ["01", "Обсуждение", "Вы рассказываете о задаче, аудитории и результате, который должен приносить сайт."],
  ["02", "Структура", "Продумываем сценарий, страницы, блоки и логику движения пользователя."],
  ["03", "Дизайн и разработка", "Создаю визуальную систему, адаптивную вёрстку и точные анимации."],
  ["04", "Запуск", "Тестируем всё на реальных экранах, подключаем домен и публикуем проект."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    let value = 0;
    const timer = window.setInterval(() => {
      value += 7 + Math.random() * 18;
      if (value >= 100) {
        value = 100;
        window.clearInterval(timer);
        window.setTimeout(() => setLoaded(true), 180);
      }
      setProgress(Math.min(100, Math.round(value)));
    }, 70);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const move = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      cursorDotRef.current?.style.setProperty("transform", `translate3d(${x}px,${y}px,0)`);
      cursorRef.current?.style.setProperty("transform", `translate3d(${x}px,${y}px,0)`);
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
      document.documentElement.style.setProperty("--mx", `${(x / innerWidth - .5) * 28}px`);
      document.documentElement.style.setProperty("--my", `${(y / innerHeight - .5) * 28}px`);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.clearInterval(timer); revealObserver.disconnect(); window.removeEventListener("mousemove", move); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden="true">
        <div className="loader-word"><span>ANESTIS</span><span>PORTFOLIO / 2026</span></div>
        <div className="loader-track"><i style={{ width: `${progress}%` }} /></div>
        <p>{progress.toString().padStart(3, "0")}%</p>
      </div>

      <div ref={cursorRef} className="cursor"><span>VIEW</span></div>
      <div ref={cursorDotRef} className="cursor-dot" />

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Anestis — наверх">ANESTIS<span>®</span></a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#work">Работы</a><a href="#about">Обо мне</a><a href="#process">Процесс</a><a href="#contact">Контакты</a>
          <a className="nav-cta magnetic" href="#contact"><span>Заказать сайт</span></a>
        </nav>
        <button className={`burger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}><i /><i /></button>
      </header>

      <aside id="mobile-menu" className={`mobile-menu ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
        <p>НАВИГАЦИЯ / 2026</p>
        <nav aria-label="Мобильная навигация">
          {[['Работы','#work'],['Обо мне','#about'],['Процесс','#process'],['Контакты','#contact']].map(([label,href],i) => <a key={href} href={href} onClick={closeMenu}><span>0{i+1}</span>{label}</a>)}
        </nav>
        <div className="mobile-menu-foot"><a href={contacts.telegram.href}>TELEGRAM ↗</a><span>AVAILABLE FOR WORK</span></div>
      </aside>

      <main>
        <section className="hero" id="top">
          <div className="orb orb-a" aria-hidden="true" /><div className="orb orb-b" aria-hidden="true" />
          <p className="hero-ghost" aria-hidden="true">PORTFOLIO<br />2026</p>
          <div className="eyebrow"><span>01 / INTRO</span><span>WEB DESIGN &amp; DEVELOPMENT</span></div>
          <div className="hero-copy">
            <h1 className="hero-title"><span><b>САЙТЫ, КОТОРЫЕ</b></span><span><b>ХОЧЕТСЯ <em>ИЗУЧАТЬ</em></b></span></h1>
            <div className="hero-bottom">
              <p>Современные сайты для бизнеса — с сильной идеей, точным дизайном и плавной анимацией.</p>
              <div className="hero-actions">
                <a className="button button-light magnetic" href="#work"><span>Смотреть проекты</span><b>↘</b></a>
                <a className="button button-line magnetic" href="#contact"><span>Обсудить сайт</span><b>↗</b></a>
              </div>
            </div>
          </div>
          <p className="scroll-note">SCROLL TO EXPLORE <span>↓</span></p>
        </section>

        <section className="work-section" id="work">
          <div className="section-head reveal"><span>02 / WORK</span><h2>ИЗБРАННЫЕ<br /><em>ПРОЕКТЫ</em></h2><p>Три разных характера.<br />Одна точность исполнения.</p></div>
          <div className="projects-list">
            {projects.map((project, index) => (
              <article className={`project project-${index + 1} reveal`} key={project.slug}>
                <div className="project-copy">
                  <p className="project-no">PROJECT / {project.number}</p><h3>{project.title}</h3><p className="project-sub">{project.subtitle}</p>
                  <p className="project-cat">{project.category}</p><p className="project-desc">{project.description}</p>
                  <a href={project.url} target="_blank" rel="noreferrer">Открыть сайт <span>↗</span></a>
                </div>
                <a className={`project-visual ${project.tone}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Открыть проект ${project.title}`}>
                  <span className="visual-mask" />
                  {project.slug === "nordica" && <div className="mock mock-nord"><div className="mock-top">NØRDICA <i>MENU</i></div><div className="nord-building"><i /><i /><i /></div><strong>FORM<br />FOLLOWS<br /><em>SILENCE</em></strong><small>OSLO / 59.9139° N</small></div>}
                  {project.slug === "synthesis" && <div className="mock mock-synth"><div className="mock-top">SYNTHESIS <i>SKIN / 01</i></div><div className="synth-orb"><i /></div><strong>BEYOND<br />THE <em>SURFACE</em></strong><small>BIOTECH FORMULA / 30 ML</small></div>}
                  {project.slug === "terra" && <div className="mock mock-terra"><div className="mock-top">TERRA <i>BOOK A TABLE ↗</i></div><div className="terra-plate"><i /><b /></div><strong>ЗЕМЛЯ.<br />ОГОНЬ.<br /><em>ВКУС.</em></strong><small>LOCAL PRODUCE / OPEN FIRE</small></div>}
                  <span className="view-label">VIEW PROJECT ↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div>DESIGN <i>•</i> DEVELOPMENT <i>•</i> MOTION <i>•</i> WEB <i>•</i> DESIGN <i>•</i> DEVELOPMENT <i>•</i> MOTION <i>•</i> WEB <i>•</i></div></div>

        <section className="about" id="about">
          <div className="section-label">03 / ABOUT</div>
          <div className="about-grid">
            <h2 className="reveal">НЕ ПРОСТО<br />ДЕЛАЮ <em>САЙТЫ</em></h2>
            <div className="about-copy reveal"><p>Я создаю современные сайты для бизнеса, проектов и личных брендов. В каждом соединяю ясную структуру, выразительный дизайн и аккуратную разработку.</p><p>Сайт должен не только выглядеть красиво — он должен быть быстрым, понятным и приводить человека к действию.</p></div>
          </div>
          <div className="stats reveal"><div><strong>3+</strong><span>готовых<br />проектов</span></div><div><strong>100%</strong><span>адаптивность<br />каждого экрана</span></div><div><strong>03</strong><span>desktop / tablet<br />/ mobile</span></div></div>
        </section>

        <section className="services">
          <div className="section-label">WHAT I DO / 04</div><h2 className="reveal">ЧТО Я МОГУ<br /><em>СДЕЛАТЬ</em></h2>
          <div className="service-list">{services.map((service,i) => <div className="service-row reveal" key={service}><span>0{i+1}</span><h3>{service}</h3><i>↗</i></div>)}</div>
        </section>

        <section className="process" id="process">
          <div className="section-head reveal"><span>05 / PROCESS</span><h2>КАК ПРОХОДИТ<br /><em>РАБОТА</em></h2><p>Прозрачный маршрут<br />от идеи до запуска.</p></div>
          <div className="steps">{steps.map(([number,title,text]) => <article className="step reveal" key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div><i>↘</i></article>)}</div>
        </section>

        <section className="idea">
          <div className="idea-glow" aria-hidden="true" /><p>06 / YOUR MOVE</p><h2 className="reveal">ЕСТЬ ИДЕЯ?<br /><em>СДЕЛАЕМ</em> ИЗ НЕЁ<br />САЙТ.</h2><a href="#contact">НАЧАТЬ ПРОЕКТ <span>↘</span></a>
        </section>

        <section className="contact" id="contact">
          <div className="contact-top"><span>07 / CONTACT</span><span>МОСКВА / РАБОТАЮ ПО ВСЕМУ МИРУ</span></div>
          <h2 className="reveal">ДАВАЙТЕ СОЗДАДИМ<br /><em>ЧТО-НИБУДЬ КРУТОЕ</em></h2>
          <div className="contact-grid">
            <p>Расскажите о задаче — отвечу, задам несколько точных вопросов и предложу следующий шаг.</p>
            <a className="contact-button magnetic" href={contacts.telegram.href} target="_blank" rel="noreferrer"><span>Написать мне</span><b>↗</b></a>
          </div>
          <div className="contact-links"><a href={contacts.telegram.href} target="_blank" rel="noreferrer"><small>TELEGRAM</small>{contacts.telegram.label}<span>↗</span></a><a href={contacts.email.href}><small>EMAIL</small>{contacts.email.label}<span>↗</span></a><a href={contacts.phone.href}><small>ТЕЛЕФОН</small>{contacts.phone.label}<span>↗</span></a></div>
        </section>
      </main>

      <footer><span>© 2026 ANESTIS</span><span>DESIGNED &amp; DEVELOPED BY ANESTIS</span><a href="#top">BACK TO TOP ↑</a></footer>
    </>
  );
}
