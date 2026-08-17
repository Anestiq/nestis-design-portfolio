"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { FormEvent, useEffect, useRef, useState } from "react";

const directions = [
  ["01", "STRENGTH", "Свободные веса, силовая техника и точная работа с нагрузкой."],
  ["02", "BOXING", "Ринг, мешки, скорость реакции и выносливость без лишнего шума."],
  ["03", "MOBILITY", "Подвижность, контроль и восстановление для свободного движения."],
  ["04", "ENDURANCE", "Бег, кардио и интервальная работа в собственном темпе."],
];
const sessions = [
  ["19:30", "Strength Basics", "Артём Власов", "Сегодня", "Силовые"],
  ["21:00", "Boxing Fundamentals", "Егор Нестеров", "Сегодня", "Бокс"],
  ["22:15", "Mobility Reset", "София Орлова", "Завтра", "Мобилити"],
  ["23:30", "Night Run", "Мила Ким", "Завтра", "Кардио"],
];
const coaches = [
  ["01", "Артём Власов", "STRENGTH", "Сила начинается с техники"],
  ["02", "Мила Ким", "ENDURANCE", "Дистанция — это разговор с собой"],
  ["03", "Егор Нестеров", "BOXING", "Скорость приходит после дисциплины"],
  ["04", "София Орлова", "MOBILITY", "Тело должно двигаться свободно"],
];
const plans = [
  ["NIGHT", "Тренировки после 21:00", "от 4 900 ₽ / месяц"],
  ["BASE", "Полный доступ в клуб и групповые занятия", "от 8 900 ₽ / месяц"],
  ["LIMITLESS", "Полный доступ, персональные тренировки и recovery-зона", "от 15 900 ₽ / месяц"],
];

export default function NoxTraining() {
  const [menu, setMenu] = useState(false);
  const [activeDirection, setActiveDirection] = useState(0);
  const [filter, setFilter] = useState("Сегодня");
  const [modal, setModal] = useState(false);
  const [sent, setSent] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("nox-in")), { threshold: .15 });
    document.querySelectorAll(".nox-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!modal) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [modal]);
  const filtered = sessions.filter((s) => filter === "Сегодня" || filter === "Завтра" ? s[3] === filter : s[4] === filter);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return <main className="nox">
    <a className="nox-skip" href="#nox-content">К содержанию</a>
    <header className="nox-header"><a href="/">← ANESTIS / CASE</a><a className="nox-logo" href="#top">NOX <b>TRAINING</b></a><nav>{[["Направления","#directions"],["Расписание","#schedule"],["Клуб","#club"]].map(([a,b])=><a key={b} href={b}>{a}</a>)}</nav><button className="nox-menu-btn" aria-expanded={menu} aria-label="Открыть меню" onClick={()=>setMenu(!menu)}>MENU</button></header>
    <div className={`nox-mobile-menu ${menu ? "open" : ""}`}>{[["Направления","#directions"],["Расписание","#schedule"],["Тренеры","#coaches"],["Клуб","#club"]].map(([a,b])=><a key={b} href={b} onClick={()=>setMenu(false)}>{a}<span>↘</span></a>)}</div>
    <section className="nox-hero" id="top"><div className="nox-hero-image"/><div className="nox-hero-shade"/><div className="nox-hero-copy"><p>MOSCOW / AFTER DARK</p><h1>РАБОТАЕМ,<br/>КОГДА ОСТАЛЬНЫЕ<br/><em>СПЯТ.</em></h1><div><p>Тренировочный клуб для тех,<br/>кто выбирает свой ритм.</p><span><a href="#directions">Выбрать направление</a><a href="#club">Посмотреть клуб</a></span></div></div><small>SCROLL TO ENTER ↓</small></section>
    <div className="nox-ticker"><div>STRENGTH / BOXING / MOBILITY / ENDURANCE / RECOVERY / STRENGTH / BOXING / MOBILITY / ENDURANCE / RECOVERY /</div></div>
    <div id="nox-content">
      <section className="nox-manifest nox-reveal"><p>MANIFEST / 00:47</p><h2>Когда город<br/>замедляется,<br/><i>ты продолжаешь.</i></h2><div className="nox-facts">{[["24/7","доступ в клуб"],["04","тренировочные зоны"],["45+","занятий в неделю"],["01","режим: твой"]].map(([n,l])=><div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div></section>
      <section className="nox-directions" id="directions"><header className="nox-section-title nox-reveal"><p>01 / TRAINING</p><h2>ВЫБЕРИ<br/>СВОЮ РАБОТУ.</h2></header><div className="nox-dir-layout"><div className="nox-dir-image" style={{backgroundPosition:`${20+activeDirection*20}% center`}}><span>0{activeDirection+1}</span></div><div className="nox-dir-list">{directions.map(([n,t,d],i)=><button key={t} className={i===activeDirection?"active":""} onMouseEnter={()=>setActiveDirection(i)} onClick={()=>setActiveDirection(i)} aria-expanded={i===activeDirection}><span>{n}</span><strong>{t}</strong><i>↗</i><p>{d}</p></button>)}</div></div></section>
      <section className="nox-schedule" id="schedule"><header className="nox-section-title nox-reveal"><p>02 / SCHEDULE</p><h2>ГОРОД СПИТ.<br/>ЗАЛ РАБОТАЕТ.</h2></header><div className="nox-filters" role="group" aria-label="Фильтры расписания">{["Сегодня","Завтра","Силовые","Бокс","Мобилити","Кардио"].map(f=><button className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div><div className="nox-session-list">{filtered.map(([time,title,coach,,type])=><article key={title}><time>{time}</time><h3>{title}</h3><p>{coach}</p><span>{type}</span></article>)}</div></section>
      <section className="nox-coaches" id="coaches"><header className="nox-section-title nox-reveal"><p>03 / COACHES</p><h2>ЛЮДИ,<br/>КОТОРЫЕ ВЕДУТ.</h2></header><div className="nox-coach-grid">{coaches.map(([n,name,type,quote],i)=><article key={name} style={{"--pos":`${i*24}%`} as React.CSSProperties}><div/><span>{n}</span><h3>{name}</h3><p>{type}</p><blockquote>«{quote}»</blockquote></article>)}</div></section>
      <section className="nox-pricing"><header className="nox-section-title nox-reveal"><p>04 / MEMBERSHIP</p><h2>ДОСТУП<br/>К СВОЕМУ РИТМУ.</h2></header><div>{plans.map(([name,desc,price],i)=><article className={i===2?"featured":""} key={name}><span>0{i+1}</span><h3>{name}</h3><p>{desc}</p><strong>{price}</strong><button onClick={()=>setModal(true)}>Выбрать абонемент ↗</button></article>)}</div></section>
      <section className="nox-club" id="club"><header className="nox-section-title nox-reveal"><p>05 / THE CLUB</p><h2>МЕТАЛЛ. СВЕТ.<br/>ТИШИНА.</h2></header><div className="nox-gallery">{["Свободные веса","Ночной зал","Боксёрская зона","Кардио после полуночи","Recovery-зона","Свет и детали"].map((x,i)=><figure key={x} className={`g${i+1}`}><div style={{backgroundPosition:`${i*18}% center`}}/><figcaption>0{i+1} / {x}</figcaption></figure>)}</div></section>
      <section className="nox-final"><p>NO EXCUSES / NO NOISE</p><h2>ТВОЙ РЕЖИМ<br/>НАЧИНАЕТСЯ<br/><i>ПОСЛЕ ТЕМНОТЫ.</i></h2><div><p>Первая тренировка — без обязательств. Выбери направление, оставь контакты, и мы подберём удобное время.</p><button onClick={()=>{setSent(false);setModal(true)}}>Записаться на первую тренировку ↗</button></div></section>
    </div>
    <footer className="nox-footer"><a href="#top">NOX <b>TRAINING</b></a><div><span>Москва, Хлебный переулок, 19</span><a href="tel:+74950000000">+7 (495) 000-00-00</a></div><div><button type="button">Instagram</button><button type="button">Telegram</button><a href="#club">Контакты</a></div><p>Работаем, когда остальные спят.</p></footer>
    {modal && <div className="nox-modal" role="dialog" aria-modal="true" aria-labelledby="nox-modal-title"><button className="nox-modal-backdrop" onClick={()=>setModal(false)} aria-label="Закрыть окно"/><div><button ref={closeRef} className="nox-modal-close" onClick={()=>setModal(false)} aria-label="Закрыть">×</button>{sent?<div className="nox-success"><span>✓</span><h2 id="nox-modal-title">ЗАЯВКА ПРИНЯТА.</h2><p>Мы свяжемся с тобой и подберём подходящее время.</p><button onClick={()=>setModal(false)}>Закрыть</button></div>:<form onSubmit={submit}><p>FIRST SESSION / DEMO</p><h2 id="nox-modal-title">ТВОЯ ПЕРВАЯ<br/>ТРЕНИРОВКА.</h2><label>Имя<input required name="name" autoComplete="name" /></label><label>Телефон<input required name="phone" type="tel" autoComplete="tel" /></label><label>Направление<select name="direction">{directions.map(d=><option key={d[1]}>{d[1]}</option>)}</select></label><label>Удобное время<input required name="time" type="time" /></label><button type="submit">Оставить заявку ↗</button></form>}</div></div>}
  </main>;
}
