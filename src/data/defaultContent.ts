import type { SiteContent } from './types';

/**
 * Built-in content. The dashboard (/#/admin) overrides this with whatever
 * is saved in Supabase, or in this browser when Supabase is unavailable.
 */
export const defaultContent: SiteContent = {
  version: 2,
  profile: {
    name: { en: 'Abdullah Shaban', ar: 'عبدالله شعبان' },
    role: { en: 'Operations & AI Solutions Specialist', ar: 'أخصائي عمليات وحلول ذكاء اصطناعي' },
    headline: {
      en: 'I turn messy operations into [clear, simple systems] — and teach teams to own them.',
      ar: 'أحوّل العمليات المعقّدة إلى [أنظمة واضحة وبسيطة] — وأعلّم الفرق كيف تديرها بنفسها.',
    },
    intro: {
      en: 'I build AI-powered tools and data workflows for startups and growing companies, then make sure the people using them understand exactly how and why they work.',
      ar: 'أبني أدوات مدعومة بالذكاء الاصطناعي ومسارات بيانات للشركات الناشئة والنامية، وأتأكد أن كل من يستخدمها يفهم بالضبط كيف تعمل ولماذا.',
    },
    about: {
      en: [
        'I believe personal development is the foundation of business development. Every system I build starts with understanding — of the people, the process, and the numbers.',
        'My work bridges traditional operations and modern AI: I design tools that remove repetitive work, surface the right data, and make decisions easier to explain.',
        'Teaching is part of the delivery. A tool nobody understands is a tool nobody uses — so I document, train, and simplify until the answer is obvious.',
      ],
      ar: [
        'أؤمن أن التطوير الشخصي هو أساس تطوير الأعمال. كل نظام أبنيه يبدأ بالفهم: فهم الناس، والعملية، والأرقام.',
        'عملي يربط بين العمليات التقليدية والذكاء الاصطناعي الحديث: أصمم أدوات تزيل العمل المتكرر، وتُظهر البيانات الصحيحة، وتجعل القرارات أسهل في الشرح.',
        'التعليم جزء من التسليم. الأداة التي لا يفهمها أحد لا يستخدمها أحد، لذلك أوثّق وأدرّب وأبسّط حتى تصبح الإجابة واضحة.',
      ],
    },
    philosophy: {
      en: 'Continuous learning is the ultimate key to survival and evolution.',
      ar: 'التعلّم المستمر هو المفتاح الحقيقي للبقاء والتطوّر.',
    },
    location: { en: 'Minya, Egypt', ar: 'المنيا، مصر' },
    availability: {
      en: 'Open to consulting & training engagements',
      ar: 'متاح لمشاريع الاستشارات والتدريب',
    },
    photo: '/assets/abdullah.png',
    email: 'abdullah.shaban165@gmail.com',
    phone: '+20 112 049 2320',
    linkedin: 'https://www.linkedin.com/in/abdullah-shaban-fouad/',
    cvUrl: '/assets/Abdullah_Shaban_CV.pdf',
  },
  stats: [
    { id: 's1', value: { en: '5+ yrs', ar: '+5 سنوات' }, label: { en: 'in operations', ar: 'في إدارة العمليات' } },
    { id: 's2', value: { en: '40%', ar: '40%' }, label: { en: 'less manual work', ar: 'تقليل العمل اليدوي' } },
    { id: 's3', value: { en: '12.5×', ar: '12.5×' }, label: { en: 'revenue from loyalty system', ar: 'نمو إيرادات نظام الولاء' } },
    { id: 's4', value: { en: '5,000+', ar: '+5,000' }, label: { en: 'members served', ar: 'عضو تمت خدمتهم' } },
  ],
  experience: [
    {
      id: 'e1',
      role: { en: 'Operations & AI Solutions Specialist', ar: 'أخصائي عمليات وحلول ذكاء اصطناعي' },
      org: { en: 'Athar Accelerator', ar: 'مسرّعة أثر' },
      period: { en: 'Jan 2025 – Present', ar: 'يناير 2025 – حتى الآن' },
      points: {
        en: [
          'Built a unified data ecosystem for startups, used as a primary reference by investors and program providers.',
          'Developed a Service Provider Portal so the database grows sustainably from user contributions.',
          'Created a centralized project-management tool for cross-departmental work.',
          'Automated internal reporting, improving data accuracy for donor compliance.',
        ],
        ar: [
          'بنيت منظومة بيانات موحّدة للشركات الناشئة أصبحت مرجعًا أساسيًا للمستثمرين ومقدّمي البرامج.',
          'طوّرت بوابة لمقدّمي الخدمات تجعل قاعدة البيانات تنمو باستمرار من مساهمات المستخدمين.',
          'أنشأت أداة مركزية لإدارة المشاريع بين الأقسام المختلفة.',
          'أتمتة التقارير الداخلية ورفع دقة البيانات المقدّمة للجهات المانحة.',
        ],
      },
      tags: { en: ['Data ecosystems', 'Automation', 'Reporting'], ar: ['منظومات البيانات', 'الأتمتة', 'التقارير'] },
    },
    {
      id: 'e2',
      role: { en: 'Operations Manager (Consultant)', ar: 'مدير عمليات (استشاري)' },
      org: { en: 'Cloud Coworking', ar: 'كلاود كووركينج' },
      period: { en: 'Apr 2024 – Present', ar: 'أبريل 2024 – حتى الآن' },
      points: {
        en: [
          'Implemented an AI-driven loyalty system that grew the related revenue stream 12.5×.',
          'Automated client registration, cutting administrative overhead by 40%.',
          'Built retention models for a base of 5,000+ members.',
        ],
        ar: [
          'طبّقت نظام ولاء مدعومًا بالذكاء الاصطناعي ضاعف الإيرادات المرتبطة به 12.5 مرة.',
          'أتمتة تسجيل العملاء وتقليل العبء الإداري بنسبة 40%.',
          'بنيت نماذج للاحتفاظ بالعملاء لقاعدة تضم أكثر من 5,000 عضو.',
        ],
      },
      tags: { en: ['Loyalty', 'Retention', 'Process design'], ar: ['الولاء', 'الاحتفاظ بالعملاء', 'تصميم العمليات'] },
    },
    {
      id: 'e3',
      role: { en: 'Administrative Officer', ar: 'مسؤول إداري' },
      org: { en: 'Cloud Coworking', ar: 'كلاود كووركينج' },
      period: { en: '2018 – 2024', ar: '2018 – 2024' },
      points: {
        en: [
          'Standardized operational processes across service lines.',
          'Managed vendor relationships and procurement during 25% annual growth.',
          'Introduced systematic documentation to support audits and reporting.',
        ],
        ar: [
          'وحّدت إجراءات التشغيل عبر خطوط الخدمة المختلفة.',
          'أدرت العلاقات مع الموردين والمشتريات خلال نمو سنوي بنسبة 25%.',
          'أدخلت نظام توثيق منهجي يدعم المراجعة وإعداد التقارير.',
        ],
      },
      tags: { en: ['Operations', 'Documentation'], ar: ['العمليات', 'التوثيق'] },
    },
    {
      id: 'e4',
      role: { en: 'Customer Service Specialist', ar: 'أخصائي خدمة عملاء' },
      org: { en: 'Taslema Delivery', ar: 'تسليمة للتوصيل' },
      period: { en: '2020', ar: '2020' },
      points: {
        en: [
          'Wrote clear communication protocols for resolving complex delivery issues.',
          'Coordinated between delivery teams and clients to keep resolution rates high.',
        ],
        ar: [
          'كتبت بروتوكولات تواصل واضحة لحل مشكلات التوصيل المعقّدة.',
          'نسّقت بين فرق التوصيل والعملاء للحفاظ على معدلات حل مرتفعة.',
        ],
      },
      tags: { en: ['Customer experience'], ar: ['تجربة العملاء'] },
    },
  ],
  education: [
    {
      id: 'ed1',
      kind: 'degree',
      title: { en: 'Add your degree from the dashboard', ar: 'أضف مؤهلك الدراسي من لوحة التحكم' },
      org: { en: 'University name', ar: 'اسم الجامعة' },
      period: { en: '', ar: '' },
      note: { en: '', ar: '' },
      url: '',
    },
  ],
  skills: [
    {
      id: 'k1',
      title: { en: 'Operations', ar: 'العمليات' },
      skills: {
        en: ['Process design', 'Coworking strategy & ROI', 'Customer retention systems', 'Vendor management'],
        ar: ['تصميم العمليات', 'استراتيجية مساحات العمل المشتركة والعائد', 'أنظمة الاحتفاظ بالعملاء', 'إدارة الموردين'],
      },
    },
    {
      id: 'k2',
      title: { en: 'AI & Automation', ar: 'الذكاء الاصطناعي والأتمتة' },
      skills: {
        en: ['AI workflow automation', 'Google Apps Script', 'Custom web tools', 'Supabase'],
        ar: ['أتمتة سير العمل بالذكاء الاصطناعي', 'Google Apps Script', 'أدوات ويب مخصّصة', 'Supabase'],
      },
    },
    {
      id: 'k3',
      title: { en: 'Data & Clarity', ar: 'البيانات والوضوح' },
      skills: {
        en: ['KPI dashboards', 'Data ecosystems', 'Reporting automation', 'Documentation'],
        ar: ['لوحات مؤشرات الأداء', 'منظومات البيانات', 'أتمتة التقارير', 'التوثيق'],
      },
    },
    {
      id: 'k4',
      title: { en: 'Teaching & Mentoring', ar: 'التعليم والإرشاد' },
      skills: {
        en: ['Team training', 'Workshop design', 'Mentorship', 'Explaining complex ideas simply'],
        ar: ['تدريب الفرق', 'تصميم ورش العمل', 'الإرشاد المهني', 'تبسيط الأفكار المعقّدة'],
      },
    },
  ],
  projects: [
    {
      id: 'p1',
      title: { en: "Egypt's Startup Data Ecosystem", ar: 'منظومة بيانات الشركات الناشئة في مصر' },
      problem: {
        en: 'Investors and program providers had no single, trustworthy view of the Egyptian startup landscape.',
        ar: 'لم يكن لدى المستثمرين ومقدّمي البرامج مصدر واحد موثوق لفهم مشهد الشركات الناشئة في مصر.',
      },
      solution: {
        en: 'A unified platform with a contributor portal so data stays fresh and grows from the ecosystem itself.',
        ar: 'منصة موحّدة مع بوابة للمساهمين تُبقي البيانات محدّثة وتنمو من داخل المنظومة نفسها.',
      },
      result: {
        en: 'Now a primary reference for investors and accelerator programs.',
        ar: 'أصبحت مرجعًا أساسيًا للمستثمرين وبرامج التسريع.',
      },
      tags: { en: ['Data', 'Ecosystem', 'Platform'], ar: ['بيانات', 'منظومة', 'منصة'] },
      image: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?auto=format&fit=crop&w=1080&q=80',
      url: '',
    },
    {
      id: 'p2',
      title: { en: 'AI-Powered Loyalty Engine', ar: 'محرّك ولاء مدعوم بالذكاء الاصطناعي' },
      problem: {
        en: 'A coworking space had no structured way to reward and retain repeat members.',
        ar: 'لم تكن لدى مساحة العمل المشتركة طريقة منظّمة لمكافأة الأعضاء الدائمين والاحتفاظ بهم.',
      },
      solution: {
        en: 'An automated rewards and referral system with AI-assisted member insights.',
        ar: 'نظام مكافآت وإحالات مؤتمت مع رؤى عن الأعضاء بمساعدة الذكاء الاصطناعي.',
      },
      result: { en: '12.5× growth in the loyalty-driven revenue stream.', ar: 'نمو 12.5 ضعفًا في الإيرادات القادمة من برنامج الولاء.' },
      tags: { en: ['AI', 'Retention', 'Revenue'], ar: ['ذكاء اصطناعي', 'احتفاظ', 'إيرادات'] },
      image: 'https://images.unsplash.com/photo-1761195696590-3490ea770aa1?auto=format&fit=crop&w=1080&q=80',
      url: '',
    },
    {
      id: 'p3',
      title: { en: 'Internal Project Management Suite', ar: 'منظومة داخلية لإدارة المشاريع' },
      problem: {
        en: 'Project updates were scattered across chats, sheets and emails.',
        ar: 'كانت تحديثات المشاريع مبعثرة بين المحادثات والجداول والبريد الإلكتروني.',
      },
      solution: {
        en: 'One dashboard that unifies tasks, owners and status across departments.',
        ar: 'لوحة واحدة تجمع المهام والمسؤولين والحالة عبر كل الأقسام.',
      },
      result: { en: 'Faster status reporting and fewer follow-up meetings.', ar: 'تقارير حالة أسرع واجتماعات متابعة أقل.' },
      tags: { en: ['Custom tool', 'Productivity'], ar: ['أداة مخصّصة', 'إنتاجية'] },
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1080&q=80',
      url: '',
    },
  ],
  services: [
    {
      id: 'sv1',
      icon: 'compass',
      title: { en: 'Operations Clarity Audit', ar: 'تدقيق وضوح العمليات' },
      summary: {
        en: 'I map how work actually flows in your team and show — in plain language — where time and money leak.',
        ar: 'أرسم خريطة لسير العمل الفعلي في فريقك، وأوضّح بلغة بسيطة أين يضيع الوقت والمال.',
      },
      forWho: { en: 'Founders and managers of growing teams', ar: 'المؤسسون ومديرو الفرق النامية' },
      deliverables: {
        en: ['Process map', 'Prioritized fix list', '1-hour walkthrough session'],
        ar: ['خريطة العمليات', 'قائمة تحسينات مرتّبة حسب الأولوية', 'جلسة شرح لمدة ساعة'],
      },
      duration: { en: '1–2 weeks', ar: '1–2 أسبوع' },
    },
    {
      id: 'sv2',
      icon: 'workflow',
      title: { en: 'AI & Workflow Automation', ar: 'الأتمتة بالذكاء الاصطناعي' },
      summary: {
        en: 'Custom tools that remove repetitive work, built as small MVPs and improved with your team’s feedback.',
        ar: 'أدوات مخصّصة تزيل العمل المتكرر، تُبنى كنماذج أولية صغيرة وتتحسّن بملاحظات فريقك.',
      },
      forWho: { en: 'Teams drowning in manual data entry and reporting', ar: 'الفرق الغارقة في إدخال البيانات والتقارير اليدوية' },
      deliverables: {
        en: ['Working automation / web tool', 'Documentation', 'Handover training'],
        ar: ['أداة أتمتة / ويب جاهزة للعمل', 'توثيق كامل', 'تدريب عند التسليم'],
      },
      duration: { en: '2–6 weeks', ar: '2–6 أسابيع' },
    },
    {
      id: 'sv3',
      icon: 'bar-chart',
      title: { en: 'Dashboards & Reporting', ar: 'لوحات المتابعة والتقارير' },
      summary: {
        en: 'KPI dashboards that answer the questions you actually ask — no clutter, no guesswork.',
        ar: 'لوحات مؤشرات أداء تجيب عن الأسئلة التي تهمّك فعلًا، بلا زحام ولا تخمين.',
      },
      forWho: { en: 'Leaders who need decisions backed by clear data', ar: 'القادة الذين يحتاجون قرارات مبنية على بيانات واضحة' },
      deliverables: {
        en: ['KPI definition workshop', 'Live dashboard', 'Reporting automation'],
        ar: ['ورشة لتحديد مؤشرات الأداء', 'لوحة متابعة مباشرة', 'أتمتة التقارير'],
      },
      duration: { en: '1–3 weeks', ar: '1–3 أسابيع' },
    },
    {
      id: 'sv4',
      icon: 'graduation-cap',
      title: { en: 'Training & Mentorship', ar: 'التدريب والإرشاد' },
      summary: {
        en: 'Workshops and 1:1 mentoring on AI tools, operations and building internal systems.',
        ar: 'ورش عمل وإرشاد فردي في أدوات الذكاء الاصطناعي والعمليات وبناء الأنظمة الداخلية.',
      },
      forWho: { en: 'Teams, students and early-career operators', ar: 'الفرق والطلاب والمهنيون في بداية مسيرتهم' },
      deliverables: {
        en: ['Tailored curriculum', 'Hands-on sessions', 'Reference material'],
        ar: ['منهج مصمّم حسب احتياجك', 'جلسات تطبيقية', 'مواد مرجعية'],
      },
      duration: { en: 'Flexible', ar: 'مرن' },
    },
  ],
  testimonials: [
    {
      id: 't1',
      quote: {
        en: "Abdullah doesn't just manage data; he builds the infrastructure for investment decisions — and explains it so everyone can use it.",
        ar: 'عبدالله لا يدير البيانات فقط، بل يبني البنية التي تُتخذ عليها قرارات الاستثمار، ويشرحها بطريقة يستطيع الجميع استخدامها.',
      },
      name: { en: 'Board Member', ar: 'عضو مجلس إدارة' },
      role: { en: 'Regional Accelerator', ar: 'مسرّعة أعمال إقليمية' },
    },
    {
      id: 't2',
      quote: {
        en: 'The automation roadmap cut our manual workload by 40%, and the team actually understood it from day one.',
        ar: 'خطة الأتمتة خفّضت العمل اليدوي لدينا بنسبة 40%، والفريق فهمها من اليوم الأول.',
      },
      name: { en: 'CEO', ar: 'رئيس تنفيذي' },
      role: { en: 'Growth-stage SME', ar: 'شركة صغيرة في مرحلة النمو' },
    },
  ],
  learning: [
    {
      id: 'l1',
      topic: { en: 'AI agents for operations', ar: 'وكلاء الذكاء الاصطناعي للعمليات' },
      note: { en: 'Building small agents that handle routine requests.', ar: 'بناء وكلاء صغار يتولّون الطلبات الروتينية.' },
    },
    {
      id: 'l2',
      topic: { en: 'Instructional design', ar: 'التصميم التعليمي' },
      note: { en: 'Making training sessions shorter and stickier.', ar: 'جعل الجلسات التدريبية أقصر وأرسخ في الذهن.' },
    },
  ],
};
