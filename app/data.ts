export const projects = [
  {
    number: "01",
    slug: "nordica",
    title: "NØRDICA",
    subtitle: "Архитектура тишины",
    category: "Architecture / Editorial / Web Design",
    description: "Сайт архитектурного бюро, где пространство, типографика и ритм работают так же точно, как чертёж.",
    url: "/showcase/nordica",
    tone: "sand",
  },
  {
    number: "02",
    slug: "synthesis",
    title: "SYNTHESIS",
    subtitle: "Будущее на коже",
    category: "Beauty / Interactive / UI",
    description: "Иммерсивная витрина технологичной косметики с пластичной графикой и выразительной продуктовой подачей.",
    url: "/showcase/synthesis",
    tone: "silver",
  },
  {
    number: "03",
    slug: "terra",
    title: "TERRA",
    subtitle: "Вкус, у которого есть место",
    category: "Restaurant / Creative Development",
    description: "Тёплая цифровая история ресторана — от первого впечатления до быстрого бронирования стола.",
    url: "/showcase/terra",
    tone: "terra",
  },
] as const;

export const contacts = {
  telegram: { label: "@anestis", href: "https://t.me/anestis" },
  email: { label: "hello@anestis.dev", href: "mailto:hello@anestis.dev" },
  phone: { label: "По запросу в Telegram", href: "https://t.me/anestis" },
};
