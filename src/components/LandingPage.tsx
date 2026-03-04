import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Menu, X, Phone, Mail, GraduationCap,
  ArrowRight, Facebook, Instagram, MapPin, ChevronRight,
  Award, Star, CheckCircle2, Building2, Globe, Clock, Laptop,
  Trophy, Users
} from 'lucide-react';

// ─── Brand palette ────────────────────────────────────────────────────────────
// #004682  dark navy  (primary)
// #0064b4  mid blue
// #0096f0  sky blue   (accent / CTA)
// #80b1d9  light blue (muted text)
// #f1f1e9  warm cream (bg)
// ─────────────────────────────────────────────────────────────────────────────

type Lang = 'uk' | 'en';

const t = {
  uk: {
    subtitle: 'Дистанційне навчання',
    nav: {
      home: 'Головна',
      about: 'Про МАУП',
      programs: 'Спеціальності',
      admission: 'Вступ',
      contacts: 'Контакти',
    },
    login: 'Вхід до системи',
    phone: '044 494-47-49',
    ticker: [
      'QS World University Rankings: Europe 2025', 'QS World University Rankings: Sustainability 2025',
      'Times Higher Education Impact Rankings 2025', 'Webometrics University Rankings',
      'EUA European University Association', 'HESI Sustainability Initiative',
      'CANIE Member', 'Interregional Academy Q1 UKR 2025', 'QS World University Rankings: Europe 2026',
      'QS World University Rankings Sustainability 2026',
    ],
    hero: {
      badge: 'Прийом на 2026 рік відкрито',
      h1a: 'Навчайся онлайн',
      h1b: 'в найкращому приватному',
      h1c: 'університеті',
      h1d: 'України',
      accent: 'в найкращому',
      desc: 'Дистанційна освіта від МАУП — №1 серед приватних ВНЗ. Диплом державного зразка, підтримка 24/7.',
      bullets: [
        'Вступ без ЗНО/НМТ',
        '90+ програм',
        'Мережа філій по всій Україні та за кордоном',
      ],
      cta: 'Подати заявку',
      ctaSecondary: 'Переглянути програми',
      cards: [
        { label: 'Рейтинг',   value: '№1',   sub: 'Серед приватних ВНЗ' },
        { label: 'Програм',   value: '90+',  sub: 'Бакалавр · Магістр'  },
        { label: 'Студентів', value: '50к+', sub: 'Активних студентів'   },
        { label: 'Років',   value: '30+',  sub: 'Досвіду на ринку'       },
      ],
    },
    stats: [
      { label: 'Рейтинг',       sub: 'Серед приватних ВНЗ' },
      { label: 'Програм',       sub: 'Бакалавр та Магістр'  },
      { label: 'Років досвіду', sub: 'На освітньому ринку'  },
    ],
    why: {
      tag: 'Переваги',
      h2a: 'Чому обирають нас?',
      h2b: '',
      items: [
        { title: 'Зручне онлайн-навчання',  desc: 'Навчайтеся з будь-якого пристрою у зручний час. Всі матеріали доступні 24/7 на сучасній LMS-платформі.' },
        { title: 'Визнаний диплом',          desc: 'Диплом МАУП визнається роботодавцями в Україні та за кордоном. Університет у провідних міжнародних рейтингах.' },
        { title: 'Досвідчені викладачі',     desc: 'Доктори наук, PhD та практикуючі фахівці. Персональний підхід та підтримка кожного студента.' },
        { title: 'Навчання з усього світу',  desc: 'Відкриті програми для студентів за кордоном. Навчайтеся де б ви не знаходились.' },
        { title: 'Гнучкий графік',           desc: "Поєднуйте навчання з роботою та особистим життям. Власний темп без прив'язки до розкладу." },
        { title: 'Мережа філій',             desc: 'Понад 50 регіональних підрозділів по всій Україні. Вступ та офлайн-підтримка у вашому місті.' },
      ],
    },
    programs: {
      tag: 'Освітні програми',
      h2a: 'Оберіть свій',
      h2b: 'напрям',
      allBtn: 'Більше',
      items: [
        { title: 'Менеджмент',        tag: '', desc: 'Управління проєктами · HR · Бізнес\u2011адміністрування' },
        { title: 'Право',             tag: '',          desc: 'Цивільне · Господарське · Міжнародне право' },
        { title: 'Психологія',        tag: '',          desc: 'Клінічна · Організаційна · Консультування' },
        { title: 'IT та Кібербезпека',tag: '', desc: 'Розробка ПЗ · Аналіз даних · Кібербезпека' },
        { title: 'Економіка',         tag: '',          desc: 'Фінанси · Банківська справа · Облік і аудит' },
        { title: 'Маркетинг',         tag: '',          desc: 'Digital · Бренд-менеджмент · Дослідження ринку' },
      ],
      more: 'Детальніше',
    },
    admission: {
      tag: 'Вступна кампанія 2026',
      h2a: 'Починай навчатися',
      h2b: 'вже зараз',
      desc: 'Вступ без ЗНО/НМТ. Подавай заявку онлайн зручно та швидко.',
      cta: 'Подати заявку',
      call: 'Отримати консультацію',
      hours: 'Пн–Пт з 9:00 до 17:00 за Київським часом',
      facts: [
        { val: 'Безкоштовна', label: 'консультація абітурієнта' },
        { val: 'Без ЗНО',     label: 'вступ на основі співбесіди' },
        { val: '100% онлайн', label: 'без відвідування офісу' },
      ],
    },
    rankings: {
      tag: 'Міжнародне визнання та рейтинги',
      items: [
        { title: 'QS World University Rankings:', sub: 'Sustainability 2026'       },
        { title: 'QS World University Rankings:', sub: 'Europe 2026'               },
        { title: 'QS World University Rankings:', sub: 'Sustainability 2025'       },
        { title: 'QS World University Rankings:', sub: 'Europe 2025'               },
        { title: 'Times Higher Education',        sub: 'Impact Rankings 2025'      },
      ],
    },
    contacts: {
      tag: "Зв'яжіться з нами",
      h2: 'Ми завжди на зв\'язку',
      desc: 'Наші фахівці готові відповісти на всі питання щодо вступу, програм та умов навчання.',
      phone: 'Телефон',
      email: 'Email',
      address: 'Адреса',
      addressVal: 'вул. Фрометівська, 2, Київ',
      cta: 'Подати заявку',
    },
    footer: {
      desc: 'Найбільший недержавний університет України з 1989 року. Понад 50 регіональних підрозділів.',
      contacts: 'Контакти',
      address: 'вул. Фрометівська, 2,\nм. Київ, 03039',
      nav: 'Навігація',
      useful: 'Корисні посилання',
      copyright: '© 2026 ПрАТ «ВНЗ «МАУП». Всі права захищено.',
    },
    programsPage: {
      heroTag: 'Освітні програми',
      heroH1: 'Оберіть свій напрям',
      heroDesc: 'Дистанційна форма навчання · Диплом державного зразка · Вступ без ЗНО/НМТ',
      back: 'Повернутися',
      tabBachelor: 'Бакалаврат',
      tabMaster: 'Магістратура',
      ctaH3: 'Готові вступити?',
      ctaP: 'Вступ без ЗНО/НМТ · Диплом державного зразка · 100% онлайн',
      ctaBtn: 'Подати заявку →',
      bachelor: [
        { code: 'B2', title: 'Дизайн',                                                 op: "ОП «Графічний дизайн», «Веб-дизайн»" },
        { code: 'C1', title: 'Економіка та міжнародні економічні відносини',            op: "ОП «Економіка та фінанси»" },
        { code: 'C4', title: 'Психологія',                                              op: "ОП «Психологія», «Клінічна психологія»" },
        { code: 'C7', title: 'Журналістика',                                            op: "ОП «Політологія та журналістика»" },
        { code: 'D1', title: 'Облік і оподаткування',                                  op: "ОП «Облік і оподаткування»" },
        { code: 'D2', title: 'Фінанси, банківська справа, страхування та фондовий ринок', op: "ОП «Економіка та фінанси»" },
        { code: 'D3', title: 'Менеджмент',                                              op: "ОП «Менеджмент», «Адміністративний менеджмент»" },
        { code: 'D5', title: 'Маркетинг',                                               op: "ОП «Маркетинг і рекламний бізнес»" },
        { code: 'D8', title: 'Право',                                                   op: "ОП «Право»" },
        { code: 'F2', title: 'Інженерія програмного забезпечення',                     op: "ОП «Інженерія програмного забезпечення»" },
        { code: 'F3', title: "Комп'ютерні науки",                                       op: "ОП «Комп'ютерні науки»" },
        { code: 'F5', title: 'Кібербезпека та захист інформації',                       op: "ОП «Кібербезпека»" },
        { code: 'K3', title: 'Національна безпека',                                     op: "ОП «Національна безпека (за окремими сферами забезпечення)»" },
      ],
      master: [
        { code: 'B2', title: 'Дизайн',                                                 op: "ОП «Дизайн»" },
        { code: 'C1', title: 'Економіка та міжнародні економічні відносини',            op: "ОП «Корпоративна економіка»" },
        { code: 'C4', title: 'Психологія',                                              op: "ОП «Психологія», «Клінічна психологія»" },
        { code: 'D1', title: 'Облік і оподаткування',                                  op: "ОП «Облік і оподаткування»" },
        { code: 'D2', title: 'Фінанси, банківська справа, страхування та фондовий ринок', op: "ОП «Корпоративні фінанси»" },
        { code: 'D3', title: 'Менеджмент',                                              op: "ОП «Менеджмент»" },
        { code: 'D4', title: 'Публічне управління та адміністрування',                  op: "ОП «Публічне управління та адміністрування»" },
        { code: 'D5', title: 'Маркетинг',                                               op: "ОП «Маркетинг і рекламний бізнес»" },
        { code: 'D8', title: 'Право',                                                   op: "ОП «Право»" },
        { code: 'F2', title: 'Інженерія програмного забезпечення',                     op: "ОП «Інженерія програмного забезпечення»" },
        { code: 'F3', title: "Комп'ютерні науки",                                       op: "ОП «Комп'ютерні науки»" },
        { code: 'F5', title: 'Кібербезпека та захист інформації',                       op: "ОП «Кібербезпека»" },
      ],
    },
  },

  en: {
    subtitle: 'Distance Learning',
    nav: {
      home: 'Home',
      about: 'About IAPM',
      programs: 'Programs',
      admission: 'Admission',
      contacts: 'Contacts',
    },
    login: 'Sign In',
    phone: '044 494-47-49',
    ticker: [
      'QS World University Rankings: Europe 2025', 'QS World University Rankings: Sustainability 2025',
      'Times Higher Education Impact Rankings 2025', 'Webometrics University Rankings',
      'EUA European University Association', 'HESI Sustainability Initiative',
      'CANIE Member', 'Interregional Academy Q1 UKR 2025', 'QS World University Rankings: Europe 2026',
      'QS World University Rankings Sustainability 2026',
    ],
    hero: {
      badge: 'Admissions 2026 are open',
      h1a: 'Study online',
      h1b: 'at the best private',
      h1c: 'university',
      h1d: 'in Ukraine',
      accent: 'at the best',
      desc: 'Distance education from IAPM — #1 among private universities. State-recognized diploma, 24/7 support, no entrance exam required.',
      bullets: [
        'No entrance exam',
        "90+ bachelor's and master's programs",
        'Network of branches across Ukraine and abroad',
      ],
      cta: 'Apply Now',
      ctaSecondary: 'Browse Programs',
      cards: [
        { label: 'Ranking',   value: '#1',   sub: 'Among private universities' },
        { label: 'Programs',  value: '90+',  sub: "Bachelor's · Master's"      },
        { label: 'Students',  value: '50k+', sub: 'Active students'             },
        { label: 'Years',value: '30+',  sub: 'On the market'         },
      ],
    },
    stats: [
      { label: 'Ranking',         sub: 'Among private universities' },
      { label: 'Programs',        sub: "Bachelor's and Master's"    },
      { label: 'Years of experience', sub: 'In the education market' },
    ],
    why: {
      tag: 'Benefits',
      h2a: 'Why choose us?',
      h2b: '',
      items: [
        { title: 'Convenient online learning',  desc: 'Study from any device at any time. All materials available 24/7 on a modern LMS platform.' },
        { title: 'Recognized diploma',          desc: 'IAPM diploma is recognized by employers in Ukraine and abroad. The university is in leading international rankings.' },
        { title: 'Experienced faculty',         desc: 'Doctors of science, PhDs and practicing specialists. Personal approach and support for every student.' },
        { title: 'Study from anywhere',         desc: 'Open programs for students abroad. Study wherever you are in the world.' },
        { title: 'Flexible schedule',           desc: 'Combine studies with work and personal life. Your own pace without being tied to a timetable.' },
        { title: 'Branch network',              desc: 'Over 50 regional branches across Ukraine. Enrollment and offline support in your city.' },
      ],
    },
    programs: {
      tag: 'Academic Programs',
      h2a: 'Choose your',
      h2b: 'specialization',
      allBtn: 'More',
      items: [
        { title: 'Management',       tag: '', desc: 'Project Management · HR · Business Administration' },
        { title: 'Law',              tag: '',           desc: 'Civil · Commercial · International Law' },
        { title: 'Psychology',       tag: '',           desc: 'Clinical · Organizational · Counseling' },
        { title: 'IT & Cybersecurity',tag: '', desc: 'Software Development · Data Analysis · Cybersecurity' },
        { title: 'Economics',        tag: '',           desc: 'Finance · Banking · Accounting & Auditing' },
        { title: 'Marketing',        tag: '',           desc: 'Digital · Brand Management · Market Research' },
      ],
      more: 'Learn more',
    },
    admission: {
      tag: 'Admission Campaign 2026',
      h2a: 'Start studying',
      h2b: 'right now',
      desc: 'Free consultation. No entrance exam. Apply online easily and quickly.',
      cta: 'Apply Now',
      call: 'Get Consultation',
      hours: 'Mon–Fri 9:00–17:00 Kyiv time',
      facts: [
        { val: 'Free',        label: 'applicant consultation' },
        { val: 'No exam',     label: 'admission via interview' },
        { val: '100% online', label: 'no office visit required' },
      ],
    },
    rankings: {
      tag: 'International Recognition & Rankings',
      items: [
        { title: 'QS World University Rankings:', sub: 'Sustainability 2026'  },
        { title: 'QS World University Rankings:', sub: 'Europe 2026'          },
        { title: 'QS World University Rankings:', sub: 'Sustainability 2025'  },
        { title: 'QS World University Rankings:', sub: 'Europe 2025'          },
        { title: 'Times Higher Education',        sub: 'Impact Rankings 2025' },
      ],
    },
    contacts: {
      tag: 'Get in Touch',
      h2: 'We are always here',
      desc: 'Our consultants are ready to answer all questions about admission, programs and study conditions.',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      addressVal: '2 Frometivska St, Kyiv',
      cta: 'Apply Now',
    },
    footer: {
      desc: 'The largest non-state university in Ukraine since 1989. Over 50 regional branches.',
      contacts: 'Contacts',
      address: '2 Frometivska St,\nKyiv, 03039',
      nav: 'Navigation',
      useful: 'Useful Links',
      copyright: '© 2026 PJSC "HEI IAPM". All rights reserved.',
    },
    programsPage: {
      heroTag: 'Academic Programs',
      heroH1: 'Choose your specialization',
      heroDesc: 'Distance learning · State-recognized diploma · No entrance exam required',
      back: 'Go Back',
      tabBachelor: "Bachelor's",
      tabMaster: "Master's",
      ctaH3: 'Ready to apply?',
      ctaP: 'No entrance exam · State-recognized diploma · 100% online',
      ctaBtn: 'Apply Now →',
      bachelor: [
        { code: 'B2', title: 'Design',                                         op: 'EP "Graphic Design", "Web Design"' },
        { code: 'C1', title: 'Economics and International Economic Relations',  op: 'EP "Economics and Finance"' },
        { code: 'C4', title: 'Psychology',                                      op: 'EP "Psychology", "Clinical Psychology"' },
        { code: 'C7', title: 'Journalism',                                      op: 'EP "Political Science and Journalism"' },
        { code: 'D1', title: 'Accounting and Taxation',                         op: 'EP "Accounting and Taxation"' },
        { code: 'D2', title: 'Finance, Banking, Insurance and Stock Market',    op: 'EP "Economics and Finance"' },
        { code: 'D3', title: 'Management',                                      op: 'EP "Management", "Administrative Management"' },
        { code: 'D5', title: 'Marketing',                                       op: 'EP "Marketing and Advertising Business"' },
        { code: 'D8', title: 'Law',                                             op: 'EP "Law"' },
        { code: 'F2', title: 'Software Engineering',                            op: 'EP "Software Engineering"' },
        { code: 'F3', title: 'Computer Science',                                op: 'EP "Computer Science"' },
        { code: 'F5', title: 'Cybersecurity and Information Protection',        op: 'EP "Cybersecurity"' },
        { code: 'K3', title: 'National Security',                               op: 'EP "National Security (by specific areas)"' },
      ],
      master: [
        { code: 'B2', title: 'Design',                                         op: 'EP "Design"' },
        { code: 'C1', title: 'Economics and International Economic Relations',  op: 'EP "Corporate Economics"' },
        { code: 'C4', title: 'Psychology',                                      op: 'EP "Psychology", "Clinical Psychology"' },
        { code: 'D1', title: 'Accounting and Taxation',                         op: 'EP "Accounting and Taxation"' },
        { code: 'D2', title: 'Finance, Banking, Insurance and Stock Market',    op: 'EP "Corporate Finance"' },
        { code: 'D3', title: 'Management',                                      op: 'EP "Management"' },
        { code: 'D4', title: 'Public Administration',                           op: 'EP "Public Administration"' },
        { code: 'D5', title: 'Marketing',                                       op: 'EP "Marketing and Advertising Business"' },
        { code: 'D8', title: 'Law',                                             op: 'EP "Law"' },
        { code: 'F2', title: 'Software Engineering',                            op: 'EP "Software Engineering"' },
        { code: 'F3', title: 'Computer Science',                                op: 'EP "Computer Science"' },
        { code: 'F5', title: 'Cybersecurity and Information Protection',        op: 'EP "Cybersecurity"' },
      ],
    },
  },
} as const;

const programImgs = [
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
];

const whyIcons = [Laptop, Award, Users, Globe, Clock, Building2];
const rankingIcons = [Trophy, Globe, Trophy, Globe, Star];
const rankingColors = ['#0096f0', '#0064b4', '#0096f0', '#0064b4', '#004682'];

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const inc = to / (1600 / 16);
    const timer = setInterval(() => {
      v += inc;
      if (v >= to) { setCount(to); clearInterval(timer); } else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── Programs overlay page ────────────────────────────────────────────────────
type PPData = {
  heroTag: string; heroH1: string; heroDesc: string; back: string;
  tabBachelor: string; tabMaster: string;
  ctaH3: string; ctaP: string; ctaBtn: string;
  bachelor: { code: string; title: string; op: string }[];
  master:   { code: string; title: string; op: string }[];
};

function ProgramsPage({ pp, subtitle, lang, onToggleLang, activeTab, setActiveTab, onClose }: {
  pp: PPData;
  subtitle: string;
  lang: Lang;
  onToggleLang: () => void;
  activeTab: 'bachelor' | 'master';
  setActiveTab: (tab: 'bachelor' | 'master') => void;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const programs = activeTab === 'bachelor' ? pp.bachelor : pp.master;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] bg-[#f1f1e9] overflow-y-auto"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="bg-[#004682] py-5 sticky top-0 z-10" style={{ boxShadow: '0 2px 20px rgba(0,70,130,.4)' }}>
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-4">
          <button onClick={onClose} className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0">
            <div className="w-11 h-11 bg-[#0064b4] flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} className="text-white" strokeWidth={1.6} />
            </div>
            <div className="text-left">
              <div className="text-white text-[1.3rem] font-black leading-none tracking-tight">МАУП</div>
              <div className="text-[#0096f0] text-[10px] font-bold uppercase tracking-[0.14em] mt-0.5">{subtitle}</div>
            </div>
          </button>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleLang}
              className="bg-transparent text-white px-4 py-2 text-sm font-bold cursor-pointer transition-all hover:bg-[#0096f0]"
              style={{ border: '2px solid rgba(255,255,255,.3)', letterSpacing: '0.04em' }}
            >
              {lang === 'uk' ? 'EN' : 'УК'}
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-transparent text-white px-5 py-2.5 text-sm font-bold cursor-pointer transition-all hover:bg-[#0096f0]"
              style={{ border: '2px solid rgba(255,255,255,.3)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {pp.back}
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative overflow-hidden py-14"
        style={{ background: 'linear-gradient(135deg,#004682 0%,#0064b4 60%,#0096f0 100%)' }}
      >
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1.5px,transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-[#0096f0] text-[11px] font-extrabold uppercase tracking-[0.22em] mb-4">{pp.heroTag}</span>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white leading-[1.1] tracking-tight mb-3">{pp.heroH1}</h1>
          <p className="text-white/70 text-base m-0 max-w-[560px]">{pp.heroDesc}</p>
        </div>
      </div>

      {/* Tabs + cards */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex bg-white sticky top-[84px] z-[5]" style={{ borderBottom: '3px solid #e5e7eb', marginBottom: '2.5rem' }}>
          {([
            { key: 'bachelor' as const, label: pp.tabBachelor, emoji: '🎓', count: pp.bachelor.length },
            { key: 'master'   as const, label: pp.tabMaster,   emoji: '📚', count: pp.master.length   },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-5 py-4 text-[15px] font-bold transition-all text-center cursor-pointer bg-transparent border-none -mb-[3px] ${
                activeTab === tab.key
                  ? 'text-[#004682]'
                  : 'text-gray-500 hover:text-[#004682] hover:bg-gray-50'
              }`}
              style={{ borderBottom: `3px solid ${activeTab === tab.key ? '#0096f0' : 'transparent'}` }}
            >
              {tab.emoji} {tab.label}{' '}
              <span className="text-xs font-semibold text-[#0096f0]">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 pb-16" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {programs.map((prog, i) => (
            <div key={i}
              className="bg-white p-6 lg:p-7 transition-all cursor-default hover:-translate-y-0.5"
              style={{ border: '1px solid #e5e7eb' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#0096f0';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,150,240,.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <span className="inline-block bg-[#0096f0] text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-[0.1em] mb-2">{prog.code}</span>
              <div className="text-[15px] font-extrabold text-[#004682] leading-snug mb-1.5">{prog.title}</div>
              <div className="text-[13px] text-gray-500 leading-relaxed">{prog.op}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#004682] mb-20 px-10 py-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black mb-2" style={{ fontSize: '1.6rem' }}>{pp.ctaH3}</h3>
            <p className="text-white/70 text-[15px] m-0">{pp.ctaP}</p>
          </div>
          <a href="https://vstupmaup.com.ua" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0096f0] hover:bg-white hover:text-[#004682] text-white px-9 py-4 text-[15px] font-extrabold no-underline transition-all whitespace-nowrap">
            {pp.ctaBtn}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export function LandingPage() {
  const [lang, setLang] = useState<Lang>('uk');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bachelor' | 'master'>('bachelor');
  const tr = t[lang];

  const openPrograms = () => { setActiveTab('bachelor'); setProgramsOpen(true); };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setProgramsOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>

      {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
        <div className={`bg-white border-b transition-all duration-300 ${scrolled ? 'border-gray-200' : 'border-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3.5 flex-shrink-0 group">
              <div className="w-12 h-12 bg-[#004682] flex items-center justify-center transition-colors group-hover:bg-[#0064b4]">
                <GraduationCap size={24} className="text-white" strokeWidth={1.6} />
              </div>
              <div className="flex flex-col">
                <span className="text-[1.35rem] font-black text-[#004682] leading-none tracking-tight">МАУП</span>
                <span className="text-[10px] text-[#0096f0] font-semibold uppercase tracking-[0.14em] mt-0.5">
                  {tr.subtitle}
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {[
                { label: tr.nav.home,      href: '#',                               active: true,  onClick: undefined as (() => void) | undefined },
                { label: tr.nav.about,     href: 'https://maup.com.ua/ua/pro-akademiyu/pro-maup.html', active: false, onClick: undefined },
                { label: tr.nav.programs,  href: '#',   active: false, onClick: openPrograms },
                { label: tr.nav.admission, href: 'https://vstupmaup.com.ua',    active: false, onClick: undefined },
                { label: tr.nav.contacts,  href: 'https://maup.com.ua/ua/kontakti/kontaktna-informaciya.html', active: false, onClick: undefined },
              ].map(link => (
                <a key={link.label} href={link.href}
                  onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick!(); } : undefined}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-sm group cursor-pointer ${
                    link.active ? 'text-[#0096f0]' : 'text-gray-600 hover:text-[#004682]'
                  }`}>
                  {link.label}
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#0096f0] transition-all duration-200 rounded-full ${
                    link.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                  }`} />
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <a href="tel:+380444944749"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#004682] transition-colors font-medium">
                <div className="w-8 h-8 rounded-full bg-[#f1f1e9] flex items-center justify-center">
                  <Phone size={14} className="text-[#0096f0]" />
                </div>
                {tr.phone}
              </a>

              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-[#0096f0] text-sm font-bold text-gray-600 hover:text-[#0096f0] transition-all rounded-sm">
                {lang === 'uk' ? 'EN' : 'УК'}
              </button>

              <a href="/login/index.php"
                className="bg-[#0096f0] hover:bg-[#004682] text-white px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-[#0096f0]/25 hover:-translate-y-px">
                {tr.login}
              </a>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 text-[#004682] hover:bg-[#f1f1e9] transition-colors rounded"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="lg:hidden bg-white border-b border-gray-100 shadow-2xl">
              <div className="px-6 py-5 flex flex-col gap-1">
                {[
                  { label: tr.nav.home,      href: '#',                          onClick: undefined as (() => void) | undefined },
                  { label: tr.nav.programs,  href: '#',                          onClick: openPrograms },
                  { label: tr.nav.admission, href: 'https://vstupmaup.com.ua',   onClick: undefined },
                  { label: tr.nav.contacts,  href: 'https://maup.com.ua/ua/kontakti/kontaktna-informaciya.html', onClick: undefined },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    onClick={l.onClick ? (e) => { e.preventDefault(); l.onClick!(); setMenuOpen(false); } : undefined}
                    className="py-3 px-4 text-[15px] font-semibold text-gray-700 hover:text-[#004682] hover:bg-[#f1f1e9] border-l-2 border-transparent hover:border-[#0096f0] transition-all rounded-r">
                    {l.label}
                  </a>
                ))}
                <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <a href="tel:+380444944749" className="flex items-center gap-2 py-2 px-4 text-sm text-gray-500 font-medium">
                    <Phone size={15} className="text-[#0096f0]" /> {tr.phone}
                  </a>
                  <button
                    onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
                    className="mx-4 py-2 border border-gray-200 text-sm font-bold text-gray-600 hover:border-[#0096f0] hover:text-[#0096f0] transition-all">
                    {lang === 'uk' ? 'English' : 'Українська'}
                  </button>
                  <a href="/login/index.php"
                    className="bg-[#0096f0] text-white text-center py-3 text-[15px] font-bold hover:bg-[#004682] transition-colors">
                    {tr.login}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>

        {/* ═══ TICKER ══════════════════════════════════════════════════════ */}
        <div className="bg-[#0064b4] overflow-hidden py-4 border-b-2 border-[#0096f0]/40">
          <motion.div className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}>
            {[...tr.ticker, ...tr.ticker].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 text-white text-sm font-bold tracking-[0.12em] px-10 uppercase">
                <Trophy size={14} className="text-[#99d5f9] flex-shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ═══ HERO ════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#004682] overflow-hidden" style={{ minHeight: 'calc(100vh - 128px)' }}>
          <div className="absolute inset-0 flex">
            <div className="hidden lg:block w-[52%] bg-[#004682] flex-shrink-0" />
            <div className="relative flex-1">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=85"
                alt="" aria-hidden className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#004682] via-[#004682]/30 to-transparent" />
            </div>
          </div>
          <div className="absolute inset-0 bg-[#004682]/85 lg:hidden" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-14 lg:py-0 lg:h-[calc(100vh-128px)] flex items-start lg:items-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div translate="no" className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 border border-[#0096f0]/40 bg-[#0096f0]/20">
                  <span className="w-2 h-2 rounded-full bg-[#0096f0] animate-pulse" />
                  <span className="text-white text-xs font-bold uppercase tracking-[0.22em]">
                    {tr.hero.badge}
                  </span>
                </div>

                <h1 className="text-5xl lg:text-[3.8rem] font-black text-white leading-[1.05] tracking-tight mb-6">
                  {tr.hero.h1a}<br />
                  <span className="text-[#0096f0]">{tr.hero.h1b}</span><br />
                  {tr.hero.h1c}<br />
                  {tr.hero.h1d}
                </h1>

                <p className="text-[#80b1d9] text-lg leading-relaxed mb-8 max-w-lg">{tr.hero.desc}</p>

                <ul className="space-y-3 mb-10">
                  {tr.hero.bullets.map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/80 text-[15px]">
                      <CheckCircle2 size={18} className="text-[#0096f0] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div translate="no" className="flex flex-wrap gap-3">
                  <a href="https://vstupmaup.com.ua" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#0096f0] hover:bg-white hover:text-[#004682] text-white font-bold px-8 py-4 text-sm transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5">
                    {tr.hero.cta} <ArrowRight size={16} />
                  </a>
                  <button type="button" onClick={openPrograms}
                    className="inline-flex items-center gap-2.5 bg-[#0096f0] hover:bg-white hover:text-[#004682] text-white font-bold px-8 py-4 text-sm transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer border-none">
                    {tr.hero.ctaSecondary}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:grid grid-cols-2 gap-4">
                {tr.hero.cards.map((card, i) => {
                  const icons = [Trophy, GraduationCap, Users, Globe];
                  const Icon = icons[i];
                  return (
                    <motion.div key={card.label}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-[#004682]/70 backdrop-blur-md border border-white/20 p-6 hover:bg-[#004682]/80 transition-all duration-200">
                      <div className="w-9 h-9 bg-[#0096f0]/30 flex items-center justify-center mb-4">
                        <Icon size={17} className="text-white" strokeWidth={1.8} />
                      </div>
                      <div className="text-3xl font-black text-white mb-0.5" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                        {card.value}
                      </div>
                      <div className="text-white font-bold text-sm">{card.label}</div>
                      <div className="text-[#80b1d9] text-xs mt-0.5">{card.sub}</div>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </div>

        </section>

        {/* ═══ STATS ════════════════════════════════════════════════════════ */}
        <div className="bg-white pt-2 pb-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-3 border border-gray-100 divide-x divide-gray-100 shadow-sm">
              <div className="py-7 px-6 text-center hover:bg-[#f1f1e9] transition-colors cursor-default">
                <div className="text-3xl lg:text-4xl font-black text-[#004682] leading-none">№1</div>
                <div className="text-[13px] font-bold text-gray-700 mt-2">{tr.stats[0].label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{tr.stats[0].sub}</div>
              </div>
              {[
                { to: 90, suffix: '+', idx: 1 },
                { to: 30, suffix: '+', idx: 2 },
              ].map(s => (
                <div key={s.idx} className="py-7 px-6 text-center hover:bg-[#f1f1e9] transition-colors cursor-default">
                  <div className="text-3xl lg:text-4xl font-black text-[#004682] leading-none">
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-[13px] font-bold text-gray-700 mt-2">{tr.stats[s.idx].label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{tr.stats[s.idx].sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ WHY US ══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[#f1f1e9]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <p className="text-[#0096f0] text-xs font-bold uppercase tracking-[0.22em] mb-4">{tr.why.tag}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-[#004682] leading-tight">
                {tr.why.h2a}{tr.why.h2b && <><br />{tr.why.h2b}</>}
              </h2>
              <div className="w-14 h-1 bg-[#0096f0] mt-5" />
            </div>

            <div className="grid lg:grid-cols-3 gap-px bg-gray-200">
              {tr.why.items.map((f, i) => {
                const Icon = whyIcons[i];
                return (
                  <motion.div key={f.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="bg-white p-8 lg:p-10 group hover:bg-[#004682] transition-all duration-400 cursor-default">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-[#f1f1e9] group-hover:bg-[#0096f0]/20 flex items-center justify-center transition-colors">
                        <Icon size={22} className="text-[#0096f0]" strokeWidth={1.8} />
                      </div>
                      <span className="text-5xl font-black text-gray-100 group-hover:text-white/10 transition-colors leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-[#004682] group-hover:text-white mb-3 transition-colors">{f.title}</h3>
                    <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ PROGRAMS ════════════════════════════════════════════════════ */}
        <section id="programs" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
              <div>
                <p className="text-[#0096f0] text-xs font-bold uppercase tracking-[0.22em] mb-4">{tr.programs.tag}</p>
                <h2 className="text-4xl lg:text-5xl font-black text-[#004682] leading-tight">
                  {tr.programs.h2a}<br />{tr.programs.h2b}
                </h2>
                <div className="w-14 h-1 bg-[#0096f0] mt-5" />
              </div>
              <button type="button" onClick={openPrograms}
                className="hidden md:inline-flex items-center gap-2 border-2 border-[#004682] text-[#004682] hover:bg-[#004682] hover:text-white px-6 py-3 text-sm font-bold transition-all flex-shrink-0 cursor-pointer bg-transparent">
                {tr.programs.allBtn} <ArrowRight size={15} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tr.programs.items.map((item, i) => (
                <motion.div key={i}
                  onClick={openPrograms}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group block overflow-hidden border border-gray-100 hover:border-[#0096f0]/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="h-52 overflow-hidden relative">
                    <img src={programImgs[i]} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#004682]/80 via-transparent to-transparent" />
                    {item.tag && (
                      <span className="absolute top-4 left-4 bg-[#0096f0] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1">
                        {item.tag}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 flex items-center gap-1">
                        {tr.programs.more} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-black text-[#004682] text-lg mb-2 group-hover:text-[#0096f0] transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <button type="button" onClick={openPrograms}
                className="inline-flex items-center gap-2 bg-[#004682] text-white px-8 py-3.5 text-sm font-bold hover:bg-[#0064b4] transition-colors cursor-pointer border-none">
                {tr.programs.allBtn} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ ADMISSION BAND ══════════════════════════════════════════════ */}
        <section id="contacts" className="relative overflow-hidden bg-[#004682] py-20">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#0096f0]/10 hidden lg:block" />
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#0096f0]/6 hidden lg:block" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-lg">
                <p className="text-[#80b1d9] text-xs font-bold uppercase tracking-[0.22em] mb-5">{tr.admission.tag}</p>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                  {tr.admission.h2a}
                  <span className="block text-[#0096f0]">{tr.admission.h2b}</span>
                </h2>
                <p className="text-[#80b1d9] text-base leading-relaxed">{tr.admission.desc}</p>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[280px]">
                <a href="https://vstupmaup.com.ua" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#0096f0] hover:bg-white hover:text-[#004682] text-white font-black py-4 px-8 text-[15px] transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5">
                  {tr.admission.cta} <ArrowRight size={16} />
                </a>
                <a href="https://maup.com.ua/ua/kontakti/kontaktna-informaciya.html" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-semibold py-4 px-8 text-[15px] transition-all duration-200">
                  <Phone size={16} /> {tr.admission.call}
                </a>
                <p className="text-center text-[#80b1d9] text-xs">{tr.admission.hours}</p>
              </div>
            </div>

            {/*<div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">*/}
            {/*  {tr.admission.facts.map(s => (*/}
            {/*    <div key={s.label} className="text-center">*/}
            {/*      <div className="text-xl lg:text-2xl font-black text-[#0096f0] mb-1.5">{s.val}</div>*/}
            {/*      <div className="text-[#80b1d9] text-xs lg:text-sm">{s.label}</div>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
        </section>

        {/* ═══ TRUST / RANKINGS ════════════════════════════════════════════ */}
        <section className="py-20 bg-[#f1f1e9]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-10">
              {tr.rankings.tag}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tr.rankings.items.map((r, i) => {
                const Icon = rankingIcons[i];
                return (
                  <motion.div key={r.title}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white border border-gray-100 p-7 text-center hover:border-[#0096f0]/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-14 h-14 mx-auto flex items-center justify-center mb-4"
                      style={{ background: rankingColors[i] + '12' }}>
                      <Icon size={26} style={{ color: rankingColors[i] }} strokeWidth={1.6} />
                    </div>
                    <p className="font-black text-[#004682] text-base mb-1">{r.title}</p>
                    <p className="text-gray-400 text-xs leading-snug">{r.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ CONTACTS ════════════════════════════════════════════════════ */}
        <section id="contacts" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-0 shadow-2xl">

              {/* Left — info */}
              <div className="bg-[#004682] p-10 lg:p-14 text-white">
                <p className="text-[#80b1d9] text-xs font-bold uppercase tracking-[0.22em] mb-5">{tr.contacts.tag}</p>
                <h2 className="text-3xl lg:text-4xl font-black mb-5 leading-tight">{tr.contacts.h2}</h2>
                <p className="text-[#80b1d9] text-sm leading-relaxed mb-10">{tr.contacts.desc}</p>

                <div className="space-y-5 mb-10">
                  {[
                    { icon: Phone, text: '044 494-47-49',    href: 'tel:+380444944749',        label: tr.contacts.phone   },
                    { icon: Mail,  text: 'dist1@iapm.edu.ua',  href: 'mailto:dist1@iapm.edu.ua', label: tr.contacts.email   },
                    { icon: MapPin,text: tr.contacts.addressVal, href: '#',                       label: tr.contacts.address },
                  ].map(({ icon: Icon, text, href, label }) => (
                    <div key={label}>
                      <p className="text-[#80b1d9] text-[10px] font-bold uppercase tracking-widest mb-1.5">{label}</p>
                      <a href={href} className="flex items-center gap-3 text-white hover:text-[#80b1d9] transition-colors text-[15px] font-semibold">
                        <Icon size={16} className="text-[#0096f0] flex-shrink-0" />
                        {text}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-6 border-t border-white/10">
                  {[
                    { Icon: Facebook, href: 'https://www.facebook.com/share/1GtVzdoy77/?mibextid=wwXIfr' },
                    { Icon: Instagram, href: 'https://www.instagram.com/maup_official' },
                  ].map(({ Icon, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 border border-white/15 flex items-center justify-center text-[#80b1d9] hover:bg-[#0096f0] hover:border-[#0096f0] hover:text-white transition-all">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right — CTA */}
              <div className="bg-[#f1f1e9] border border-gray-100 p-10 lg:p-14 flex flex-col justify-center">
                <h3 className="text-2xl font-black text-[#004682] mb-4">{tr.admission.tag}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{tr.admission.desc}</p>
                <div className="flex flex-col gap-3">
                  <a href="https://vstupmaup.com.ua" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-[#0096f0] hover:bg-[#004682] text-white font-black py-4 px-8 text-[15px] transition-all duration-200">
                    {tr.contacts.cta} <ArrowRight size={16} />
                  </a>
                  <a href="https://maup.com.ua/ua/kontakti/kontaktna-informaciya.html"
                    className="flex items-center justify-center gap-2.5 border-2 border-[#004682] text-[#004682] hover:bg-[#004682] hover:text-white font-semibold py-4 px-8 text-[15px] transition-all duration-200">
                    <Phone size={16} /> {tr.admission.call}
                  </a>
                </div>
                <p className="text-gray-400 text-xs mt-4 text-center">{tr.admission.hours}</p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer className="bg-[#004682]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10 grid md:grid-cols-4 gap-10">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#0064b4] flex items-center justify-center">
                <GraduationCap size={20} className="text-white" strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-white font-black text-lg leading-none">МАУП</div>
                <div className="text-[#80b1d9] text-[10px] uppercase tracking-wider mt-0.5">{tr.subtitle}</div>
              </div>
            </div>
            <p className="text-[#80b1d9] text-sm leading-relaxed mb-5">{tr.footer.desc}</p>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/share/1GtVzdoy77/?mibextid=wwXIfr' },
                { Icon: Instagram, href: 'https://www.instagram.com/maup_official' },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-[#80b1d9] hover:bg-[#0096f0] hover:border-[#0096f0] hover:text-white transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.18em] mb-5">{tr.footer.contacts}</h4>
            <ul className="space-y-4 text-[#80b1d9] text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#0096f0] mt-0.5 shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{tr.footer.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#0096f0] shrink-0" />
                <a href="tel:+380444944749" className="hover:text-white transition-colors">044 494-47-49</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#0096f0] shrink-0" />
                <a href="mailto:dist1@iapm.edu.ua" className="hover:text-white transition-colors break-all">dist1@iapm.edu.ua</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.18em] mb-5">{tr.footer.nav}</h4>
            <ul className="space-y-2.5">
              {[
                { label: tr.nav.home,      href: '#',                               onClick: undefined as (() => void) | undefined },
                { label: tr.nav.about,     href: 'https://maup.com.ua/ua/pro-akademiyu/pro-maup.html', onClick: undefined },
                { label: tr.nav.programs,  href: '#',                               onClick: openPrograms },
                { label: tr.nav.admission, href: 'https://vstupmaup.com.ua',        onClick: undefined },
                { label: tr.nav.contacts,  href: 'https://maup.com.ua/ua/kontakti/kontaktna-informaciya.html', onClick: undefined },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href}
                    onClick={l.onClick ? (e) => { e.preventDefault(); l.onClick!(); } : undefined}
                    target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#80b1d9] hover:text-white text-sm transition-colors group cursor-pointer">
                    <ChevronRight size={12} className="text-[#0096f0] group-hover:translate-x-0.5 transition-transform" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.18em] mb-5">{tr.footer.useful}</h4>
            <ul className="space-y-2.5">
              {[
                { label: tr.login,                       href: '/login/index.php' },
                { label: lang === 'uk' ? 'Офіційний сайт МАУП' : 'Official IAPM website', href: 'https://maup.com.ua' },
                { label: lang === 'uk' ? 'Бібліотека МАУП' : 'IAPM Library',              href: 'https://maup.com.ua/ua/pro-akademiyu/biblioteka.html' },
                { label: lang === 'uk' ? 'Наукові дослідження' : 'Research',               href: 'https://research.maup.com.ua' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#80b1d9] hover:text-white text-sm transition-colors group">
                    <ChevronRight size={12} className="text-[#0096f0] group-hover:translate-x-0.5 transition-transform" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-[#80b1d9] text-xs">
            <span>{tr.footer.copyright}</span>
            <a href="https://maup.com.ua" className="hover:text-white transition-colors">maup.com.ua</a>
          </div>
        </div>
      </footer>

      {/* ═══ PROGRAMS PAGE OVERLAY ════════════════════════════════════════ */}
      <AnimatePresence>
        {programsOpen && (
          <ProgramsPage
            pp={tr.programsPage as PPData}
            subtitle={tr.subtitle}
            lang={lang}
            onToggleLang={() => setLang(lang === 'uk' ? 'en' : 'uk')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={() => setProgramsOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
