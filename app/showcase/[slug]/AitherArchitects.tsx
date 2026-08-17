"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

const projects = [
  { n: "01", name: "VILLA ARKO", place: "PAROS / GREECE", type: "PRIVATE RESIDENCE", text: "Белый камень, внутренний двор и горизонт Эгейского моря.", image: "/images/aither/villa-arko.png" },
  { n: "02", name: "HOUSE OF WIND", place: "SANTORINI / GREECE", type: "PRIVATE RESIDENCE", text: "Минимальная архитектура, созданная вокруг света и ветра.", image: "/images/aither/house-wind.png" },
  { n: "03", name: "NEREUS HOTEL", place: "MILOS / GREECE", type: "HOSPITALITY", text: "Террасы, вода, известковая штукатурка и глубокие тени.", image: "/images/aither/nereus-hotel.png" },
  { n: "04", name: "ATHENS COURTYARD", place: "ATHENS / GREECE", type: "URBAN HOUSE", text: "Старые стены, современный интерьер и тихий внутренний сад.", image: "/images/aither/athens-courtyard.png" },
];

const services = [
  ["01", "Частная архитектура", "Дома, сформированные местом, светом и образом жизни."],
  ["02", "Бутик-отели", "Небольшие отели с точным сценарием движения и отдыха."],
  ["03", "Интерьеры", "Цельные пространства от архитектуры до последней фактуры."],
  ["04", "Авторский надзор", "Сопровождение идеи до её точного воплощения."],
];

const process = [
  ["01", "Context", "Изучаем место, свет, климат и окружение."],
  ["02", "Concept", "Формируем ясную архитектурную идею."],
  ["03", "Material", "Определяем материалы, фактуры и детали."],
  ["04", "Build", "Сопровождаем проект до реализации."],
];

export default function AitherArchitects() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState("");
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("aither-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".aither-reveal").forEach((element) => observer.observe(element));
    const onScroll = () => document.documentElement.style.setProperty("--aither-scroll", `${window.scrollY}px`);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("aither-locked", modalOpen || menuOpen);
    if (modalOpen) window.setTimeout(() => closeButton.current?.focus(), 20);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setModalOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.classList.remove("aither-locked"); window.removeEventListener("keydown", keydown); };
  }, [modalOpen, menuOpen]);

  const closeModal = () => { setModalOpen(false); window.setTimeout(() => openButton.current?.focus(), 20); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  const openBrief = (type = "") => { setProjectType(type); setSent(false); setModalOpen(true); };

  return (
    <main className="aither" id="aither-top">
      <a className="aither-skip" href="#aither-content">К содержанию</a>
      <header className="aither-header">
        <a className="aither-logo" href="#aither-top" aria-label="Aither Architects, наверх"><b>AITHER</b><span>ARCHITECTS / ATHENS</span></a>
        <p className="aither-coordinate">37.9838° N<br />23.7275° E</p>
        <nav aria-label="Навигация Aither"><a href="#aither-projects"><i>01</i>Проекты</a><a href="#aither-studio"><i>02</i>Студия</a><a href="#aither-contact"><i>03</i>Контакт</a></nav>
        <a href="/" className="aither-back">ANESTIS / CASE ↗</a>
        <button className="aither-menu-button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="aither-mobile-menu">MENU</button>
      </header>

      <div className={`aither-mobile-menu ${menuOpen ? "open" : ""}`} id="aither-mobile-menu" aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">CLOSE ×</button>
        <nav><a href="#aither-projects" onClick={() => setMenuOpen(false)}>Проекты <span>01</span></a><a href="#aither-studio" onClick={() => setMenuOpen(false)}>Студия <span>02</span></a><a href="#aither-contact" onClick={() => setMenuOpen(false)}>Контакт <span>03</span></a></nav>
        <p>ATHENS / CYCLADES / WORLDWIDE</p>
      </div>

      <section className="aither-hero" id="aither-content">
        <Image src="/images/aither/hero.png" alt="Современная светлая вилла Aither у Эгейского моря" fill priority sizes="100vw" />
        <div className="aither-hero-wash" />
        <p className="aither-locations">ATHENS / CYCLADES / WORLDWIDE</p>
        <div className="aither-hero-copy">
          <h1><span>ПРОСТРАНСТВА,</span><span>В КОТОРЫХ</span><span>ОСТАЁТСЯ СВЕТ.</span></h1>
          <div><p>AITHER ARCHITECTS создаёт современную архитектуру, в которой форма, воздух и окружающий ландшафт становятся единым целым.</p><span><a href="#aither-projects">Смотреть проекты ↘</a><a href="#aither-studio">О студии</a></span></div>
        </div>
        <p className="aither-scroll">SCROLL TO EXPLORE</p><span className="aither-count">01 / 04</span>
      </section>

      <section className="aither-philosophy" id="aither-studio">
        <p className="aither-kicker aither-reveal">02 / PHILOSOPHY</p>
        <blockquote className="aither-reveal">Архитектура начинается не со стен. Она начинается с того, как свет входит в пространство.</blockquote>
        <div className="aither-principles">
          {[["Light", "свет как главный материал"], ["Silence", "пространство без визуального шума"], ["Place", "архитектура, связанная с местом"]].map(([name, text], i) => <article className="aither-reveal" key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="aither-proportion">
        <div className="aither-grid-art" aria-hidden="true">{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</div>
        <div className="aither-reveal"><p className="aither-kicker">PARTHENON / PRINCIPLE, NOT STYLE</p><h2>ПРОПОРЦИЯ<br />ВНЕ ВРЕМЕНИ.</h2></div>
        <p className="aither-reveal">Вдохновляясь архитектурой Парфенона в Афинах, мы работаем не с декоративностью прошлого, а с его принципами: ритмом, масштабом, светом и точностью пропорций.</p>
        <span>3 : 8</span>
      </section>

      <section className="aither-projects" id="aither-projects">
        <header className="aither-reveal"><p className="aither-kicker">SELECTED PROJECTS / 2026</p><h2>Архитектура<br />как состояние.</h2></header>
        <div className="aither-project-list">
          {projects.map((project, i) => <article id={project.name.toLowerCase().replaceAll(" ", "-")} className={`aither-project aither-reveal p${i + 1}`} key={project.name}>
            <a href={`#${project.name.toLowerCase().replaceAll(" ", "-")}`} className="aither-project-image" aria-label={`Подробнее о ${project.name}`}><Image src={project.image} alt={project.text} fill sizes="(max-width: 700px) 100vw, 80vw" /><span>Подробнее ↗</span></a>
            <div><span>{project.n}</span><h3>{project.name}</h3><p>{project.text}</p><dl><div><dt>LOCATION</dt><dd>{project.place}</dd></div><div><dt>TYPE</dt><dd>{project.type}</dd></div></dl></div>
          </article>)}
        </div>
      </section>

      <section className="aither-panorama">
        <Image src="/images/aither/material-light.png" alt="Ритм светлых вертикалей современной архитектуры у воды" fill sizes="100vw" />
        <p>MATERIAL / LIGHT / LANDSCAPE</p><h2>МЫ НЕ ЗАПОЛНЯЕМ ПРОСТРАНСТВО.<br />МЫ ОСТАВЛЯЕМ ЕМУ ВОЗДУХ.</h2>
      </section>

      <section className="aither-services">
        <header className="aither-reveal"><p className="aither-kicker">WHAT WE DO</p><h2>Направления</h2></header>
        <div>{services.map(([n, title, text]) => <button type="button" className="aither-service aither-reveal" key={n} onClick={() => openBrief(title)} aria-label={`${title}: открыть форму заявки`}><span>{n}</span><h3>{title}</h3><p>{text}</p><i>ОБСУДИТЬ ↗</i></button>)}</div>
      </section>

      <section className="aither-process">
        <header className="aither-reveal"><p className="aither-kicker">HOW WE WORK</p><h2>От места<br />к материи.</h2></header>
        <div>{process.map(([n, title, text]) => <article className="aither-reveal" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="aither-team">
        <div className="aither-founder-image aither-reveal"><Image src="/images/aither/eleni-markou.png" alt="Eleni Markou, Creative Director и архитектор Aither" fill sizes="(max-width: 700px) 100vw, 44vw" /></div>
        <div className="aither-founder-copy aither-reveal"><p className="aither-kicker">FOUNDER / ATHENS</p><h2>Eleni<br />Markou</h2><h3>Creative Director / Architect</h3><p>Архитектор из Афин, работающая на стыке современной средиземноморской архитектуры, природного света и спокойной материальности.</p></div>
        <figure className="aither-process-image one aither-reveal"><Image src="/images/aither/studio-model.png" alt="Работа над архитектурным макетом" fill sizes="40vw" /><figcaption>MODEL STUDY / 01</figcaption></figure>
        <figure className="aither-process-image two aither-reveal"><Image src="/images/aither/studio-materials.png" alt="Подбор камня, штукатурки и стекла" fill sizes="40vw" /><figcaption>MATERIAL STUDY / 02</figcaption></figure>
      </section>

      <section className="aither-contact" id="aither-contact">
        <p className="aither-kicker aither-reveal">START A CONVERSATION</p><h2 className="aither-reveal">НАЧНЁМ<br />С МЕСТА.</h2>
        <div className="aither-reveal"><p>Расскажите о вашем участке, идее или будущем пространстве. Мы вернёмся с первым направлением для разговора.</p><button ref={openButton} onClick={() => openBrief()}>Обсудить проект ↗</button></div>
      </section>

      <footer className="aither-footer"><a href="#aither-top"><b>AITHER</b><span>ARCHITECTS</span></a><div><p>Athens / Greece</p><a href="mailto:hello@aither-architects.com">hello@aither-architects.com</a></div><nav><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a><a href="#aither-contact">Contact</a></nav><p>Built around light.<br />© 2026</p></footer>

      {modalOpen && <div className="aither-modal" role="dialog" aria-modal="true" aria-labelledby="aither-modal-title">
        <button className="aither-modal-backdrop" onClick={closeModal} aria-label="Закрыть окно" />
        <div>{!sent ? <><button ref={closeButton} className="aither-modal-close" onClick={closeModal}>CLOSE ×</button><p className="aither-kicker">NEW PROJECT / AITHER</p><h2 id="aither-modal-title">Расскажите<br />о месте.</h2><form onSubmit={submit}><label>Имя<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Тип проекта<select name="type" required value={projectType} onChange={(event) => setProjectType(event.target.value)}><option value="" disabled>Выберите направление</option><option>Частная архитектура</option><option>Бутик-отели</option><option>Интерьеры</option><option>Авторский надзор</option><option>Другое</option></select></label><label>Коротко о задаче<textarea name="message" required rows={3} /></label><button type="submit">Отправить запрос ↗</button></form></> : <div className="aither-success"><span>✓</span><h2>Спасибо.</h2><p>Мы получили ваше сообщение и скоро свяжемся с вами.</p><button ref={closeButton} onClick={closeModal}>Закрыть</button></div>}</div>
      </div>}
    </main>
  );
}
