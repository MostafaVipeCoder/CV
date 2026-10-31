import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang, Text, TextList } from './data/types';

const ui = {
  en: {
    nav: { about: 'About', experience: 'Experience', work: 'Work', services: 'Services', contact: 'Contact', talk: 'Let’s talk' },
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    home: 'Home',
    tagline: 'Learn · Build · Clarify',
    hero: {
      hello: 'Hi, I’m',
      cta: 'See how I can help',
      cv: 'Download CV',
      teacher: 'Teacher at heart',
      pillars: [
        { title: 'Learn it', text: 'Understand the people, the process and the numbers first.' },
        { title: 'Build it', text: 'Small, working tools that remove repetitive work.' },
        { title: 'Make it clear', text: 'Train and document until everyone can own it.' },
      ],
    },
    about: { eyebrow: 'About me', title: 'Why clarity is my craft', learning: 'Currently learning', skills: 'What I’m good at' },
    resume: {
      eyebrow: 'CV',
      title: 'My learning journey',
      intro: 'Every step taught me something — here’s what I did and what changed.',
      education: 'Education & certificates',
      kinds: { degree: 'Degree', course: 'Course', certificate: 'Certificate' },
      credential: 'View credential',
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'Selected work',
      intro: 'Each project in three lines: the problem, what I built, and what changed.',
      problem: 'Problem',
      solution: 'Solution',
      result: 'Result',
      view: 'View project',
    },
    services: {
      eyebrow: 'Services',
      title: 'How I can help',
      intro: 'Clear scope, clear deliverables, and a team that understands what was built.',
      request: 'Request this service',
      testimonials: 'What people say',
    },
    request: {
      title: 'Request a service',
      hint: 'Tell me briefly what you need. Three fields, one minute.',
      name: 'Full name',
      email: 'Email',
      service: 'Service',
      other: 'Something else',
      message: 'What’s the challenge?',
      send: 'Send request',
      sending: 'Sending…',
      notConfigured: 'Requests are not configured yet. Please use the contact details below.',
      failed: 'Could not send the request. Please try again.',
      doneTitle: 'Request received',
      doneText: 'I’ll reply by email within two working days.',
      reference: 'Your reference',
      done: 'Done',
      close: 'Close',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Have a question? Let’s make it clear together.',
      intro: 'Send a short message about what you’re working on. I reply to every message.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Thanks — your message is on its way.',
      error: 'Couldn’t send right now. Please email me directly at',
    },
    switchTo: 'العربية',
  },
  ar: {
    nav: { about: 'نبذة', experience: 'الخبرات', work: 'الأعمال', services: 'الخدمات', contact: 'تواصل', talk: 'لنتحدث' },
    menuOpen: 'فتح القائمة',
    menuClose: 'إغلاق القائمة',
    home: 'الرئيسية',
    tagline: 'تعلّم · ابنِ · وضّح',
    hero: {
      hello: 'أهلًا، أنا',
      cta: 'كيف أستطيع مساعدتك',
      cv: 'تحميل السيرة الذاتية',
      teacher: 'معلّم بالفطرة',
      pillars: [
        { title: 'افهمها', text: 'أبدأ بفهم الناس والعملية والأرقام.' },
        { title: 'ابنِها', text: 'أدوات صغيرة تعمل فعلًا وتزيل العمل المتكرر.' },
        { title: 'وضّحها', text: 'أدرّب وأوثّق حتى يستطيع الجميع إدارتها.' },
      ],
    },
    about: { eyebrow: 'نبذة عني', title: 'لماذا الوضوح هو حِرفتي', learning: 'أتعلّم حاليًا', skills: 'ما أُجيده' },
    resume: {
      eyebrow: 'السيرة الذاتية',
      title: 'رحلتي في التعلّم والعمل',
      intro: 'كل خطوة علّمتني شيئًا — هذا ما فعلته وما الذي تغيّر.',
      education: 'التعليم والشهادات',
      kinds: { degree: 'مؤهل دراسي', course: 'دورة', certificate: 'شهادة' },
      credential: 'عرض الشهادة',
    },
    work: {
      eyebrow: 'معرض الأعمال',
      title: 'أعمال مختارة',
      intro: 'كل مشروع في ثلاثة أسطر: المشكلة، وما بنيته، وما الذي تغيّر.',
      problem: 'المشكلة',
      solution: 'الحل',
      result: 'النتيجة',
      view: 'عرض المشروع',
    },
    services: {
      eyebrow: 'الخدمات',
      title: 'كيف أستطيع مساعدتك',
      intro: 'نطاق واضح، ومخرجات واضحة، وفريق يفهم ما تم بناؤه.',
      request: 'اطلب هذه الخدمة',
      testimonials: 'ماذا يقول من عملت معهم',
    },
    request: {
      title: 'طلب خدمة',
      hint: 'اكتب باختصار ما تحتاجه. ثلاثة حقول، ودقيقة واحدة.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      service: 'الخدمة',
      other: 'شيء آخر',
      message: 'ما التحدي الذي تواجهه؟',
      send: 'إرسال الطلب',
      sending: 'جارٍ الإرسال…',
      notConfigured: 'استقبال الطلبات غير مفعّل بعد. يُرجى استخدام بيانات التواصل بالأسفل.',
      failed: 'تعذّر إرسال الطلب. حاول مرة أخرى.',
      doneTitle: 'تم استلام طلبك',
      doneText: 'سأرد عليك عبر البريد الإلكتروني خلال يومي عمل.',
      reference: 'رقم الطلب',
      done: 'تم',
      close: 'إغلاق',
    },
    contact: {
      eyebrow: 'تواصل',
      title: 'لديك سؤال؟ لنجعله واضحًا معًا.',
      intro: 'أرسل رسالة قصيرة عمّا تعمل عليه. أرد على كل رسالة.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال…',
      sent: 'شكرًا، رسالتك في الطريق.',
      error: 'تعذّر الإرسال الآن. راسلني مباشرة على',
    },
    switchTo: 'English',
  },
};

export type UI = (typeof ui)['en'];

const STORAGE_KEY = 'site-lang';

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    // storage blocked
  }
  return navigator.language?.startsWith('ar') ? 'ar' : 'en';
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  ui: UI;
  /** Pick the current language, falling back to the other one if empty */
  t: (text: Text | undefined) => string;
  tl: (list: TextList | undefined) => string[];
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const other: Lang = lang === 'ar' ? 'en' : 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    // A ?lang= link should only decide the first visit, not override the visitor's switch
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.delete('lang');
      window.history.replaceState(null, '', url);
    }
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // storage blocked
    }
  };

  const value: LangContextValue = {
    lang,
    setLang,
    ui: ui[lang],
    t: (text) => (text ? text[lang]?.trim() || text[other] || '' : ''),
    tl: (list) => (list ? (list[lang]?.length ? list[lang] : list[other] ?? []) : []),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
