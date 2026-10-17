// Single source of truth for contact details, links and bilingual copy.

export const CONTACT = {
  email: 'mahmoudalassiouty1@gmail.com',
  phoneDisplay: '01094210986',
  tel: '+201094210986',
};

// CV lives in /public/cv/ (file name kept exactly as in the project).
export const CV = { path: 'cv/cv_full_stack (1).pdf', downloadName: 'Mahmoud-Hassan-CV.pdf' };

export const SOCIAL = [
  { name: 'LinkedIn', file: 'linkedin', href: 'https://linkedin.com/in/mahmoud-hassan17', external: true },
  { name: 'GitHub', file: 'github', href: 'https://github.com/Mahmoud-Elassuty', external: true, invert: true },
  { name: 'Phone', file: 'phone', href: `tel:${CONTACT.tel}` },
  { name: 'Email', file: 'email', href: `mailto:${CONTACT.email}` },
];

export const SKILLS = [
  { name: 'React', file: 'react' }, { name: 'Node.js', file: 'node-js' },
  { name: 'JavaScript', file: 'javascript' }, { name: 'HTML5', file: 'html5' },
  { name: 'CSS3', file: 'css3' }, { name: 'Tailwind CSS', file: 'tailwind-css' },
  { name: 'Express', file: 'express', invert: true }, { name: 'Bootstrap', file: 'bootstrap' },
  { name: 'FastAPI', file: 'fastapi' }, { name: 'Python', file: 'python' },
  { name: 'Docker', file: 'docker' }, { name: 'Git', file: 'git' },
  { name: 'GitHub', file: 'github', invert: true }, { name: 'Postman', file: 'postman' },
  { name: 'Elasticsearch', file: 'elasticsearch' }, { name: 'SQL', file: 'sql' },
];

// `id` is matched against file names in src/assets/logos/ (e.g. nafezly.svg).
// `remote` is a logo URL taken from the platform's own page markup; used only if no local file exists.
export const FREELANCE = [
  { id: 'nafezly', ar: 'نفذلي', en: 'Nafezly', href: 'https://nafezly.com/u/Mahmood_Hassan', profile: true, color: '#ff7a1a', letter: 'ن' },
  { id: 'kafiil', ar: 'كفيل', en: 'Kafiil', href: 'https://kafiil.com/u/mahmoud_alassiouty', profile: true, color: '#1dbf73', letter: 'ك', remote: 'https://kafiil.com/assets/images/logos/small2.svg' },
  { id: 'khamsat', ar: 'خمسات', en: 'Khamsat', href: 'https://khamsat.com', color: '#2bb673', letter: 'خ' },
  { id: 'mostaql', ar: 'مستقل', en: 'Mostaql', href: 'https://mostaql.com', color: '#2f7de1', letter: 'م' },
];

export const ORGS = {
  menoufia: { id: 'menoufia', href: 'https://www.menofia.edu.eg/en', abbr: 'MU', icon: 'bi-mortarboard-fill', bg: 'linear-gradient(135deg,#8c1f3a,#ff5c7a)' },
  iti: { id: 'iti', href: 'https://iti.gov.eg/home', abbr: 'ITI', bg: '#d2232a' },
  depi: { id: 'depi', href: 'https://www.depi.gov.eg', abbr: 'DEPI', bg: 'linear-gradient(135deg,#0b5c8a,#12a4a0)' },
};

// Client feedback received on Nafezly (all seven rating categories = 5/5).
export const REVIEW = {
  client: 'زيد', initial: 'ز',
  quote: 'الخدمه ممتازه اشكرك جدا انصح بالتعامل معاه',
  scores: [5, 5, 5, 5, 5, 5, 5],
};

// ---------- Projects (non-language data). Screenshots are the owner's files in /public. ----------
const shots = (folder, files) => files.map((f, i) => ({ src: `${folder}/${f}`, key: i }));

export const PROJECTS = [
  {
    id: 'deploy', art: 'deploy', client: true, review: true,
    live: { href: 'https://awtadalkhima.cbox.uk/', label: 'awtadalkhima.cbox.uk' },
    tags: ['React', 'Vite', 'TanStack', 'Node.js', 'Nitro', 'PostgreSQL', 'Supabase', 'Docker', 'Ubuntu', 'Nginx', 'Cloudflare', 'Git', 'GitHub'],
  },
  {
    id: 'wasla', art: 'wasla', folder: 'Wasla-Project',
    images: shots('Wasla-Project', [
      'localhost_5173_.png', 'localhost_5173_products_123.png', 'localhost_5173_products_sort=price-desc (1).png',
      'localhost_5173_cart.png', 'localhost_5173_checkout.png', 'localhost_5173_payment.png',
      'localhost_5173_admin.png', 'localhost_5173_seller.png',
    ]),
    tags: ['React', 'JavaScript', 'Redux Toolkit', 'React Router', 'Bootstrap 5', 'Vite', 'JSON Server', 'Hugging Face API'],
  },
  {
    id: 'pharmacy', art: 'pharmacy', folder: 'Pharmacy-Project',
    live: { href: 'https://dr-moamen.vercel.app', label: 'dr-moamen.vercel.app' },
    images: shots('Pharmacy-Project', [
      'Screenshot 2026-09-24 185936.png', 'Screenshot 2026-09-24 190013.png', 'Screenshot 2026-09-24 190049.png',
      'Screenshot 2026-09-24 190112.png', 'Screenshot 2026-09-24 190349.png', 'Screenshot 2026-09-24 190419.png',
      'Screenshot 2026-09-24 190436.png', 'Screenshot 2026-09-24 190647.png', 'Screenshot 2026-09-24 190727.png',
      'Screenshot 2026-09-24 190805.png',
    ]),
    tags: ['HTML', 'CSS', 'RTL', 'Responsive UI', 'Vercel'],
  },
  {
    id: 'telegram', art: 'telegram',
    tags: ['Python', 'Telethon', 'Telegram API', 'Asyncio', 'Pydroid 3'],
  },
  {
    id: 'folio', art: 'folio', shotsGlob: true,
    tags: ['React', 'Vite', 'Bootstrap 5', 'CSS3', 'Supabase', 'EN / AR · RTL'],
  },
];

export const ITI_CERT = 'Iti-Training/IMG-20261007-WA0011.jpg';

const UI_EN = {
  viewDetails: 'View details', close: 'Close', prev: 'Previous image', next: 'Next image',
  keyFeatures: 'Key features', details: 'Project details', technologies: 'Technologies',
  visitLive: 'Open live site', visitLiveAria: (d) => `Open ${d} (opens in a new tab)`,
  openImage: 'Open image in a new tab', imageOf: (a, b) => `Image ${a} of ${b}`, scrollHint: 'Scroll inside the image to see the full page',
  clientProject: 'Client project · Nafezly', more: (n) => `+${n}`,
};
const UI_AR = {
  viewDetails: 'عرض التفاصيل', close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية',
  keyFeatures: 'أبرز المميزات', details: 'تفاصيل المشروع', technologies: 'التقنيات',
  visitLive: 'فتح الموقع', visitLiveAria: (d) => `فتح ${d} (يفتح في تبويب جديد)`,
  openImage: 'فتح الصورة في تبويب جديد', imageOf: (a, b) => `صورة ${a} من ${b}`, scrollHint: 'مرّر داخل الصورة لرؤية الصفحة كاملة',
  clientProject: 'مشروع لعميل · نفذلي', more: (n) => `+${n}`,
};

const WASLA_CAPS_EN = ['Home page', 'Product page', 'Products sorted by price', 'Shopping cart', 'Checkout', 'Payment', 'Admin dashboard', 'Seller dashboard'];
const WASLA_CAPS_AR = ['الصفحة الرئيسية', 'صفحة المنتج', 'المنتجات مرتبة بالسعر', 'سلة الشراء', 'إتمام الطلب', 'الدفع', 'لوحة تحكم الأدمن', 'لوحة تحكم البائع'];

export const COPY = {
  en: {
    langBtn: 'العربية', langAria: 'Switch language to Arabic',
    cv: { short: 'CV', full: 'Download CV', aria: 'Download my CV as a PDF' },
    loader: { brand: 'WELCOME TO MY PORTFOLIO', status: 'Loading portfolio' },
    nav: { aria: 'Sections', home: 'Home', skills: 'Skills', work: 'Work', learn: 'Learn', contact: 'Contact' },
    hero: {
      imgAlt: 'Mahmoud Hassan standing in front of the Creativa building',
      role: 'Full-Stack Developer · Freelancer', first: 'Mahmoud', last: 'Hassan',
      pitch: 'Coffee, curiosity and console.logs, turned into products that ship with React and Node.js.',
      cta1: 'See my work', cta2: 'Say hi',
    },
    about: {
      h: 'About me',
      p: 'Computer Science student and full-stack developer who likes fast, comfortable interfaces backed by clean Node.js services and well-structured APIs. I learn daily and I ship.',
      facts: ['Menoufia, Egypt', 'Graduating 2027', 'Open to internships and junior roles'],
    },
    skills: { h: 'My toolkit', p: 'What I build with, from the browser to the server.' },
    ui: UI_EN,
    projects: {
      h: 'Selected projects', p: 'Built, shipped and containerized by me. Open any project for the full story.',
      items: {
        deploy: {
          title: 'Migration & Deployment of a Full-Stack Web Application',
          summary: 'Moved a React, TanStack and Nitro app from Supabase Cloud to a self-hosted Supabase on an Ubuntu VPS, with Docker, Nginx and Cloudflare.',
          desc: [
            'Migrated and deployed a web application built with React, TanStack and Nitro from Supabase Cloud to a standalone Ubuntu VPS, with a self-hosted Supabase running on Docker.',
            'The work covered moving the database, users and Storage files, configuring environment variables, building the production version, running the app with Node.js/Nitro, setting up Nginx as a reverse proxy, and connecting the domains through Cloudflare.',
            'After the move I verified that the site runs, the admin dashboard login works, and data and images display correctly.',
          ],
          facts: [['Type', 'Migration & deployment'], ['Client via', 'Nafezly'], ['Environment', 'Ubuntu VPS, Docker']],
        },
        wasla: {
          title: 'Wasla: Smart E-Commerce Platform',
          summary: 'A modern shopping app with product discovery, cart and wishlist, role-based dashboards, rule-based recommendations and an AI shopping assistant.',
          desc: [
            'Wasla is a modern e-commerce web application designed to provide a smooth and organized online shopping experience. It combines a responsive interface with product discovery, shopping cart management, personalized product suggestions and an AI-powered shopping assistant.',
            'The project focuses on usability, reusable components, state management and a structured shopping journey from browsing products to reviewing an order.',
          ],
          features: [
            'Product catalog with categories, search, filters and sorting, plus detailed product pages with prices, ratings and reviews.',
            'Shopping cart with quantity management, order totals and a wishlist, followed by a structured checkout flow.',
            'Login and registration with Customer, Seller and Admin roles, protected routes and session validation.',
            'Dedicated Admin and Seller dashboards with store information and product and order management views.',
            'Reviews and ratings, including reviewer details and helpfulness indicators.',
            'Rule-based personalized recommendations driven by user interests (application logic, not a machine-learning model).',
            'AI shopping assistant powered by the Hugging Face API for interactive questions.',
            'Responsive layouts for desktop, tablet and mobile, with Arabic and English support (RTL and LTR).',
          ],
          note: 'Project scope: Wasla is a development and demonstration project. It uses JSON Server for development data and a simulated checkout instead of a real payment system. A production version would need a real backend and database, server-side handling of AI credentials, and a payment provider.',
          facts: [['Role', 'Front-End Developer'], ['Type', 'E-commerce web application'], ['AI integration', 'Hugging Face API']],
          caps: WASLA_CAPS_EN,
        },
        pharmacy: {
          title: 'Dr. Moamen Pharmacy Website',
          summary: 'An Arabic-first, mobile-friendly pharmacy website where customers order medicines online or upload a prescription for delivery via WhatsApp.',
          desc: [
            'A responsive, Arabic-first website for Dr. Moamen Pharmacy in Menoufia, with proper RTL typography, product and service sections and a mobile-friendly layout.',
            'As described on the live site, customers can order their medicines online or upload their prescription, and delivery is arranged through WhatsApp. Open the live site to explore it yourself, or flip through the screenshots above.',
          ],
          facts: [['Language', 'Arabic (RTL)'], ['Focus', 'Responsive, mobile-first'], ['Hosting', 'Vercel']],
          caps: null,
        },
        telegram: {
          title: 'Telegram Signal Forwarding Automation Tool',
          summary: 'A Python tool built with Telethon that forwards new messages from a source Telegram chat to a target group in real time.',
          desc: [
            'Developed a Python-based Telegram message forwarding tool using Telethon to automate the transfer of new messages from a designated source chat to a target Telegram group.',
          ],
          features: [
            'Telegram authentication: connects securely through the user’s Telegram account.',
            'Source and destination selection: lets users pick the source and target chats from their available conversations.',
            'Automatic message forwarding: monitors the selected source and forwards new incoming messages to the destination in real time while the script is running.',
            'Private chat support: can access private groups or channels when the authenticated account has the required access and Telegram permits the operation.',
            'Error handling: reports forwarding failures and connection-related errors in the console.',
            'Mobile execution: configured to run on Android using Pydroid 3, without requiring a dedicated VPS for basic testing.',
          ],
          note: 'Current status: implemented and tested for message forwarding between Telegram test groups; it starts and processes new messages when running. Continuous operation on Android still needs more testing, because background restrictions, connectivity interruptions or app termination may stop the script. The tool forwards new messages only; historical messages are not copied automatically, and forwarding is subject to Telegram permissions and source-chat restrictions.',
          facts: [['Language', 'Python'], ['Library', 'Telethon'], ['Runs on', 'Android (Pydroid 3)']],
        },
        folio: {
          title: 'Personal Portfolio',
          summary: 'This very site: a cinematic, bilingual (English / Arabic) portfolio with scroll animations, project case studies and a private messages dashboard.',
          desc: [
            'The portfolio you are browsing: built with React, Vite and Bootstrap 5, with a full-screen photographic hero, a preloader, scroll-based entrance animations and a layout that adapts from small phones to wide desktops.',
            'It supports English and Arabic with a complete RTL layout. Project cards open detailed case studies with galleries, and the contact form stores messages in Supabase, where I read them in a private dashboard.',
          ],
          facts: [['Stack', 'React, Vite, Bootstrap 5'], ['Languages', 'English and Arabic (RTL)'], ['Backend', 'Supabase (messages)']],
          caps: ['Desktop hero', 'Skills and toolkit', 'Mobile hero', 'Arabic layout (RTL)'],
        },
      },
      review: {
        h: 'Client feedback', sub: 'Rated on Nafezly',
        labels: ['Would recommend to others', 'Professionalism', 'Communication speed', 'Quality of work', 'Expertise in the field', 'Meeting the deadline', 'Would work together again'],
        score: (n) => `${n} out of 5`, translationLabel: 'English translation',
        translation: 'Excellent service, thank you very much. I recommend working with him.', by: 'Client',
      },
    },
    learn: {
      h: 'Education and courses', p: 'University and training, running side by side. Tap any card for the details.',
      keyFacts: 'At a glance', certificate: 'Official certificate', certAlt: 'Official ITI training certificate',
      officialSite: 'Official website',
      items: [
        {
          org: 'menoufia', status: 'Graduating 2027', title: 'Menoufia University',
          desc: 'B.Sc. Computer Science, Faculty of Computers and Information: software engineering, databases and information retrieval.',
          modal: {
            title: 'Menoufia University', sub: 'Bachelor’s Degree in Computer Science · Faculty of Computers and Information, Fourth-Year Student',
            paras: [
              'Currently pursuing a Bachelor’s degree in Computer Science at Menoufia University, building a strong foundation in software development, algorithms, data structures, databases and computer systems.',
              'Alongside my academic studies, I’m developing my practical skills in web development, focusing on front-end technologies such as HTML, CSS, JavaScript, Bootstrap and React.js, while continuing to expand my knowledge of back-end development and modern software engineering practices.',
              'My goal is to combine strong computer science fundamentals with hands-on experience to build efficient, scalable and user-friendly web applications.',
            ],
            facts: [['University', 'Menoufia University'], ['Faculty', 'Computers and Information'], ['Department', 'Computer Science (CS)'], ['Academic level', 'Fourth Year, Undergraduate']],
          },
        },
        {
          org: 'iti', status: 'Completed ✓', ok: true, title: 'Web Development Using React JS',
          desc: 'Information Technology Institute (ITI): modern front-end engineering with React.',
          modal: {
            title: 'ITI Summer Code Camp 2026: Web Development using React JS', sub: 'Information Technology Institute (ITI) · 144 hours',
            paras: [
              'Completed a 144-hour intensive training program at the Information Technology Institute (ITI), focused on front-end web development and modern web technologies.',
              'The training covered HTML5, CSS3, JavaScript, ES6+, Bootstrap and React JS, with a strong emphasis on hands-on practice and practical implementation.',
              'Throughout the program, I completed 10+ practical labs, each containing multiple tasks, and built complete web page templates by combining the concepts learned during the sessions. The training also included an introduction to freelancing fundamentals, getting started as a freelancer, and exploring platforms such as Upwork.',
              'This experience strengthened my front-end development skills, reinforced my understanding of core web technologies, and provided valuable practice in applying technical concepts to real-world web development tasks.',
            ],
            keys: ['HTML5', 'CSS3', 'JavaScript', 'ES6+', 'Bootstrap', 'React JS', 'Responsive Web Design', 'Freelancing Fundamentals'],
            facts: [['Duration', '144 Hours'], ['Period', 'July – August 2026'], ['Institution', 'Information Technology Institute (ITI)'], ['Status', 'Successfully completed, certificate received']],
            cert: true,
          },
        },
        {
          org: 'depi', status: 'In progress', title: 'React Frontend Web Developer Track',
          desc: 'Digital Egypt Pioneers (DEPI), Rwad Misr: React, TypeScript, Git, backend and DevOps basics, AI-assisted development, and a capstone project.',
          modal: {
            title: 'DEPI: Software Development, React Frontend Web Developer', sub: 'Digital Egypt Pioneers Initiative (DEPI) · In progress',
            paras: [
              'Currently participating in the Digital Egypt Pioneers Initiative (DEPI), following a comprehensive training track focused on React Front-End Development and modern software engineering practices.',
              'The program covers HTML5, CSS, JavaScript, TypeScript, Bootstrap, React.js and UI/UX design principles, along with Git and GitHub for version control. It also introduces backend development using Node.js and Express.js, containerization with Docker, and software quality practices such as unit testing, functional documentation, code style and design patterns.',
              'The training combines technical learning with practical implementation, culminating in a capstone project that brings React and Node.js together to build a real-world web application.',
            ],
            keys: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Bootstrap', 'Node.js', 'Express.js', 'Git', 'GitHub', 'Docker'],
            extraLabel: 'Additional topics', extra: ['Prompt Engineering', 'UI/UX Design', 'Unit Testing', 'Code Quality', 'Software Design Patterns'],
            facts: [['Program', 'Digital Egypt Pioneers Initiative (DEPI)'], ['Track', 'Software Development: React Frontend Web Developer'], ['Status', 'In progress']],
          },
        },
      ],
      keyLabel: 'Key areas',
      orgNames: { menoufia: 'Menoufia University', iti: 'Information Technology Institute (ITI)', depi: 'Digital Egypt Pioneers Initiative (DEPI)' },
      logoAlt: (n) => `${n} logo`, visit: (n) => `Visit ${n} website (opens in a new tab)`,
    },
    freelance: { h: 'Available for freelance', p: 'I take web projects on the freelance platforms too. Find me here:', open: (n) => `${n} (opens in a new tab)`, profile: 'My profile', platform: 'Platform', logoAlt: (n) => `${n} logo` },
    contact: {
      h: 'Send me a message',
      p: 'Got an idea or an opportunity? Write it here and your email app opens with the message ready.',
      name: 'Your name', email: 'Your email', message: 'Message',
      phName: 'Your full name', phEmail: 'name@example.com', phMessage: 'Tell me about your idea or opportunity…',
      send: 'Send message', call: `Or call ${CONTACT.phoneDisplay}`,
      errName: 'Please enter your name.', errEmail: 'Please enter a valid email address.', errMessage: 'Please write a message.',
      opening: `Opening your email app… If nothing opens, write to ${CONTACT.email}`,
      note: 'This opens your own email app with the message prepared. Nothing is sent until you press send there.',
      noteLive: 'Your message goes straight to my inbox dashboard. I read every one.',
      sending: 'Sending…', sentOk: 'Message delivered. Thank you, I will get back to you soon.',
      savedButEmailFailed: 'Your message was saved, but the email notification failed. You do not need to resend it.',
      emailSentButSaveFailed: 'Your email was sent, but saving the message failed.',
      sentFail: 'Could not deliver the message right now. You can send it by email instead:', sentFailLink: 'Send by email',
    },
    footer: 'Designed and built by Mahmoud Hassan, Menoufia, Egypt',
  },

  ar: {
    langBtn: 'English', langAria: 'التبديل إلى الإنجليزية',
    cv: { short: 'السيرة', full: 'تحميل السيرة الذاتية', aria: 'تحميل السيرة الذاتية بصيغة PDF' },
    loader: { brand: 'WELCOME TO MY PORTFOLIO', status: 'جارٍ تحميل البورتفوليو' },
    nav: { aria: 'الأقسام', home: 'الرئيسية', skills: 'أدوات', work: 'مشاريع', learn: 'تعليم', contact: 'تواصل' },
    hero: {
      imgAlt: 'محمود حسن واقفًا أمام مبنى كرييتيفا',
      role: 'مطوّر فول ستاك · عمل حر', first: 'محمود', last: 'حسن',
      pitch: 'قهوة وفضول وconsole.log، بتتحوّل لمنتجات بتشتغل بجد بـ React و Node.js.',
      cta1: 'شوف شغلي', cta2: 'كلّمني',
    },
    about: {
      h: 'عنّي',
      p: 'طالب علوم حاسب وفول ستاك ديفلوبر بحب أبني واجهات سريعة ومريحة، وأربطها بـ Backend نضيف بـ Node.js وAPIs منظّمة. بتعلّم كل يوم وبسلّم شغل بجد.',
      facts: ['المنوفية، مصر', 'تخرّج 2027', 'مفتوح لتدريب أو وظيفة Junior'],
    },
    skills: { h: 'الأدوات', p: 'التقنيات اللي ببني بيها من الواجهة للسيرفر.' },
    ui: UI_AR,
    projects: {
      h: 'مشاريع', p: 'مشاريع حقيقية شغّلتها بإيدي. افتح أي مشروع وشوف القصة كاملة.',
      items: {
        deploy: {
          title: 'نقل ونشر تطبيق ويب Full-Stack (Migration & Deployment)',
          summary: 'نقلت تطبيق React وTanStack وNitro من Supabase Cloud إلى Supabase مستضاف ذاتيًا على VPS بنظام Ubuntu، باستخدام Docker وNginx وCloudflare.',
          desc: [
            'قمت بنقل ونشر تطبيق ويب مبني باستخدام React وTanStack وNitro من Supabase Cloud إلى بيئة VPS مستقلة تعمل بنظام Ubuntu، مع إعداد Supabase Self-Hosted باستخدام Docker.',
            'شمل العمل نقل قاعدة البيانات والمستخدمين وملفات Storage، وضبط متغيرات البيئة، وبناء نسخة Production، وتشغيل التطبيق باستخدام Node.js/Nitro، وإعداد Nginx كـ Reverse Proxy، وربط الدومينات عبر Cloudflare.',
            'تم التحقق من تشغيل الموقع، وتسجيل الدخول إلى لوحة الإدارة، وظهور البيانات والصور بعد عملية النقل.',
          ],
          facts: [['النوع', 'نقل ونشر'], ['العميل عبر', 'نفذلي'], ['البيئة', 'Ubuntu VPS وDocker']],
        },
        wasla: {
          title: 'وصلة: منصة تجارة إلكترونية ذكية',
          summary: 'تطبيق تسوّق حديث: اكتشاف المنتجات، سلة ومفضلة، لوحات تحكم حسب الدور، توصيات مبنية على قواعد، ومساعد تسوّق بالذكاء الاصطناعي.',
          desc: [
            'وصلة تطبيق ويب حديث للتجارة الإلكترونية، صُمّم ليقدّم تجربة تسوّق سلسة ومنظّمة. يجمع بين واجهة متجاوبة، واكتشاف المنتجات، وإدارة سلة الشراء، واقتراحات منتجات مخصّصة، ومساعد تسوّق مدعوم بالذكاء الاصطناعي.',
            'يركّز المشروع على سهولة الاستخدام، والمكوّنات القابلة لإعادة الاستخدام، وإدارة الحالة، وبناء رحلة تسوّق منظّمة من تصفّح المنتجات حتى مراجعة الطلب.',
          ],
          features: [
            'كتالوج منتجات بتصنيفات وبحث وفلاتر وترتيب، وصفحات تفاصيل للمنتج بالأسعار والتقييمات والمراجعات.',
            'سلة شراء بإدارة الكميات وإجمالي الطلب وقائمة مفضلة، وبعدها خطوات إتمام طلب منظّمة.',
            'تسجيل دخول وإنشاء حساب بأدوار عميل وبائع وأدمن، ومسارات محمية والتحقق من الجلسة.',
            'لوحات تحكم مخصّصة للأدمن والبائع بمعلومات المتجر وإدارة المنتجات والطلبات.',
            'تقييمات ومراجعات تشمل بيانات صاحب المراجعة ومؤشرات الفائدة.',
            'توصيات منتجات مخصّصة مبنية على قواعد واهتمامات المستخدم (منطق برمجي وليس نموذج تعلّم آلي).',
            'مساعد تسوّق بالذكاء الاصطناعي عبر Hugging Face API للإجابة عن الأسئلة بشكل تفاعلي.',
            'تصميم متجاوب لسطح المكتب والتابلت والموبايل، مع دعم العربية والإنجليزية (RTL وLTR).',
          ],
          note: 'نطاق المشروع: وصلة مشروع تطوير وعرض (Demo). يستخدم JSON Server كبيانات للتطوير، وإتمام الطلب فيه محاكاة وليس نظام دفع حقيقي. النسخة الإنتاجية تحتاج Backend وقاعدة بيانات حقيقية، وتأمين مفاتيح الذكاء الاصطناعي على السيرفر، وربط مزوّد دفع.',
          facts: [['الدور', 'Front-End Developer'], ['النوع', 'تطبيق تجارة إلكترونية'], ['الذكاء الاصطناعي', 'Hugging Face API']],
          caps: WASLA_CAPS_AR,
        },
        pharmacy: {
          title: 'موقع صيدلية د. مؤمن',
          summary: 'موقع صيدلية عربي متجاوب، تطلب منه الأدوية أونلاين أو ترفع الروشتة ويوصلك التوصيل عبر الواتساب.',
          desc: [
            'موقع متجاوب بالعربي أولًا لصيدلية د. مؤمن في المنوفية، بخطوط RTL مناسبة وأقسام للمنتجات والخدمات وتجربة مريحة على الموبايل.',
            'زي ما هو موضّح في الموقع نفسه، العميل يقدر يطلب أدويته أونلاين أو يرفع الروشتة، ويتم ترتيب التوصيل عبر الواتساب. افتح الموقع بنفسك أو اقلّب الصور فوق.',
          ],
          facts: [['اللغة', 'العربية (RTL)'], ['التركيز', 'متجاوب وموبايل أولًا'], ['الاستضافة', 'Vercel']],
          caps: null,
        },
        telegram: {
          title: 'أداة أتمتة تحويل إشارات تيليجرام',
          summary: 'أداة Python مبنية بـ Telethon بتحوّل الرسائل الجديدة من محادثة مصدر على تيليجرام إلى جروب هدف لحظيًا.',
          desc: [
            'طوّرت أداة Python لتحويل رسائل تيليجرام باستخدام Telethon، لأتمتة نقل الرسائل الجديدة من محادثة مصدر محددة إلى جروب تيليجرام هدف.',
          ],
          features: [
            'مصادقة تيليجرام: اتصال آمن من خلال حساب المستخدم على تيليجرام.',
            'اختيار المصدر والوجهة: يقدر المستخدم يحدد المحادثة المصدر والهدف من محادثاته المتاحة.',
            'تحويل تلقائي للرسائل: تراقب المصدر المختار وتحوّل الرسائل الجديدة للوجهة لحظيًا طول ما السكريبت شغّال.',
            'دعم المحادثات الخاصة: تقدر توصل لجروبات أو قنوات خاصة لو الحساب المصادَق عليه عنده الصلاحية وتيليجرام بيسمح بالعملية.',
            'معالجة الأخطاء: تعرض في الكونسول أخطاء التحويل ومشاكل الاتصال.',
            'التشغيل على الموبايل: مهيّأة للعمل على أندرويد باستخدام Pydroid 3 من غير الحاجة لـ VPS مخصص في الاختبار الأساسي.',
          ],
          note: 'الحالة الحالية: الأداة منفّذة ومجرّبة على جروبات اختبار في تيليجرام، وبتبدأ وتعالج الرسائل الجديدة وقت التشغيل. التشغيل المستمر على أندرويد لسه محتاج اختبار أكتر، لأن قيود الخلفية أو انقطاع الاتصال أو إغلاق التطبيق ممكن توقف السكريبت. الأداة بتحوّل الرسائل الجديدة فقط، ومبتنسخش الرسائل القديمة تلقائيًا، والتحويل خاضع لصلاحيات تيليجرام وقيود المحادثة المصدر.',
          facts: [['اللغة', 'Python'], ['المكتبة', 'Telethon'], ['بتشتغل على', 'أندرويد (Pydroid 3)']],
        },
        folio: {
          title: 'البورتفوليو الشخصي',
          summary: 'الموقع اللي بتتصفحه: بورتفوليو سينمائي بلغتين (عربي / English) بأنيميشن مع السكرول، وصفحات تفاصيل للمشاريع، ولوحة رسائل خاصة.',
          desc: [
            'البورتفوليو اللي بتتصفحه دلوقتي: مبني بـ React وVite وBootstrap 5، بصورة هيرو بملء الشاشة وشاشة تحميل وأنيميشن مع السكرول وتصميم بيتكيّف من الموبايلات الصغيرة لشاشات سطح المكتب العريضة.',
            'بيدعم العربية والإنجليزية بتصميم RTL كامل. كروت المشاريع بتفتح صفحات تفاصيل بمعارض صور، وفورم التواصل بيحفظ الرسائل في Supabase وبقراها من لوحة تحكم خاصة.',
          ],
          facts: [['التقنيات', 'React وVite وBootstrap 5'], ['اللغات', 'العربية والإنجليزية (RTL)'], ['الباك إند', 'Supabase (الرسائل)']],
          caps: ['الهيرو على الديسكتوب', 'الأدوات والمهارات', 'الهيرو على الموبايل', 'التصميم العربي (RTL)'],
        },
      },
      review: {
        h: 'تقييم العميل', sub: 'التقييم على نفذلي',
        labels: ['ترشح للآخرين', 'الاحترافية بالتعامل', 'سرعة التواصل', 'جودة العمل', 'الخبرة بمجال العمل', 'إحترام موعد التسليم', 'التعامل مرة اخرى'],
        score: (n) => `${n} من 5`, translationLabel: '', translation: '', by: 'العميل',
      },
    },
    learn: {
      h: 'التعليم والكورسات', p: 'الدراسة والتدريب بيمشوا مع بعض. اضغط على أي كارت لتشوف التفاصيل.',
      keyFacts: 'نظرة سريعة', certificate: 'الشهادة الرسمية', certAlt: 'شهادة التدريب الرسمية من ITI',
      officialSite: 'الموقع الرسمي',
      items: [
        {
          org: 'menoufia', status: 'التخرج المتوقع 2027', title: 'جامعة المنوفية',
          desc: 'بكالوريوس علوم الحاسب، كلية الحاسبات والمعلومات: هندسة البرمجيات وقواعد البيانات واسترجاع المعلومات.',
          modal: {
            title: 'جامعة المنوفية', sub: 'بكالوريوس علوم الحاسب · كلية الحاسبات والمعلومات، الفرقة الرابعة',
            paras: [
              'أدرس حاليًا بكالوريوس علوم الحاسب في جامعة المنوفية، وبأبني أساس قوي في تطوير البرمجيات والخوارزميات وهياكل البيانات وقواعد البيانات وأنظمة الحاسب.',
              'بجانب دراستي الأكاديمية، بطوّر مهاراتي العملية في تطوير الويب، وبركّز على تقنيات الواجهة الأمامية زي HTML وCSS وJavaScript وBootstrap وReact.js، وبوسّع معرفتي في تطوير الـ Back-end وممارسات هندسة البرمجيات الحديثة.',
              'هدفي إني أجمع بين أساسيات علوم الحاسب القوية والخبرة العملية عشان أبني تطبيقات ويب فعّالة وقابلة للتوسع وسهلة الاستخدام.',
            ],
            facts: [['الجامعة', 'جامعة المنوفية'], ['الكلية', 'الحاسبات والمعلومات'], ['القسم', 'علوم الحاسب (CS)'], ['المستوى الأكاديمي', 'الفرقة الرابعة، مرحلة البكالوريوس']],
          },
        },
        {
          org: 'iti', status: 'مكتمل ✓', ok: true, title: 'تطوير الويب بـ React JS',
          desc: 'معهد تكنولوجيا المعلومات (ITI): تطوير الواجهات الحديثة بـ React.',
          modal: {
            title: 'ITI Summer Code Camp 2026: تطوير الويب باستخدام React JS', sub: 'معهد تكنولوجيا المعلومات (ITI) · 144 ساعة',
            paras: [
              'أكملت برنامج تدريب مكثّف لمدة 144 ساعة في معهد تكنولوجيا المعلومات (ITI)، ركّز على تطوير واجهات الويب والتقنيات الحديثة.',
              'غطّى التدريب HTML5 وCSS3 وJavaScript وES6+ وBootstrap وReact JS، مع تركيز كبير على التطبيق العملي.',
              'خلال البرنامج أنجزت أكتر من 10 لابات عملية، كل لاب فيه عدة مهام، وبنيت قوالب صفحات ويب كاملة بدمج المفاهيم اللي اتعلمتها في المحاضرات. وشمل التدريب مقدمة عن أساسيات العمل الحر والبدء كفريلانسر واستكشاف منصات زي Upwork.',
              'التجربة دي قوّت مهاراتي في تطوير الواجهات، وثبّتت فهمي لتقنيات الويب الأساسية، وأعطتني ممارسة قيّمة في تطبيق المفاهيم التقنية على مهام ويب واقعية.',
            ],
            keys: ['HTML5', 'CSS3', 'JavaScript', 'ES6+', 'Bootstrap', 'React JS', 'Responsive Web Design', 'أساسيات العمل الحر'],
            facts: [['المدة', '144 ساعة'], ['الفترة', 'يوليو – أغسطس 2026'], ['الجهة', 'معهد تكنولوجيا المعلومات (ITI)'], ['الحالة', 'اكتمل بنجاح، تم استلام الشهادة']],
            cert: true,
          },
        },
        {
          org: 'depi', status: 'شغّال عليه حاليًا', title: 'مسار React Frontend',
          desc: 'مبادرة رواد مصر الرقمية (DEPI): React وTypeScript وGit والـ Backend والـ DevOps والتطوير بمساعدة الذكاء الاصطناعي، وتنتهي بمشروع تخرّج.',
          modal: {
            title: 'DEPI: تطوير البرمجيات، مطوّر React Frontend', sub: 'مبادرة رواد مصر الرقمية (DEPI) · جارٍ حاليًا',
            paras: [
              'أشارك حاليًا في مبادرة رواد مصر الرقمية (DEPI)، وبتابع مسار تدريبي شامل يركّز على تطوير الواجهات بـ React وممارسات هندسة البرمجيات الحديثة.',
              'يغطي البرنامج HTML5 وCSS وJavaScript وTypeScript وBootstrap وReact.js ومبادئ تصميم UI/UX، مع Git وGitHub للتحكم في الإصدارات. ويقدّم كمان مدخل لتطوير الـ Backend بـ Node.js وExpress.js، والحاويات بـ Docker، وممارسات جودة البرمجيات زي اختبارات الوحدة والتوثيق الوظيفي وأسلوب الكود وأنماط التصميم.',
              'يجمع التدريب بين التعلّم التقني والتطبيق العملي، وينتهي بمشروع تخرّج يجمع React وNode.js لبناء تطبيق ويب واقعي.',
            ],
            keys: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Bootstrap', 'Node.js', 'Express.js', 'Git', 'GitHub', 'Docker'],
            extraLabel: 'موضوعات إضافية', extra: ['Prompt Engineering', 'UI/UX Design', 'Unit Testing', 'Code Quality', 'Software Design Patterns'],
            facts: [['البرنامج', 'مبادرة رواد مصر الرقمية (DEPI)'], ['المسار', 'تطوير البرمجيات: React Frontend Web Developer'], ['الحالة', 'جارٍ حاليًا']],
          },
        },
      ],
      keyLabel: 'المجالات الأساسية',
      orgNames: { menoufia: 'جامعة المنوفية', iti: 'معهد تكنولوجيا المعلومات (ITI)', depi: 'مبادرة رواد مصر الرقمية (DEPI)' },
      logoAlt: (n) => `شعار ${n}`, visit: (n) => `زيارة موقع ${n} (يفتح في تبويب جديد)`,
    },
    freelance: { h: 'شغّال فريلانسر', p: 'بقبل مشاريع الويب على منصات العمل الحر. تقدر تلاقيني هنا:', open: (n) => `${n} (يفتح في تبويب جديد)`, profile: 'حسابي', platform: 'المنصة', logoAlt: (n) => `شعار ${n}` },
    contact: {
      h: 'ابعتلي رسالة',
      p: 'عندك فكرة أو فرصة؟ اكتب هنا وهتفتح معاك رسالة جاهزة في تطبيق الإيميل.',
      name: 'الاسم', email: 'إيميلك', message: 'رسالتك',
      phName: 'اسمك بالكامل', phEmail: 'name@example.com', phMessage: 'احكيلي عن فكرتك أو الفرصة…',
      send: 'ابعت الرسالة', call: 'أو اتصل بيا',
      errName: 'من فضلك اكتب اسمك.', errEmail: 'من فضلك اكتب إيميل صحيح.', errMessage: 'من فضلك اكتب رسالتك.',
      opening: `بفتحلك تطبيق الإيميل... لو مفتحش ابعت على ${CONTACT.email}`,
      note: 'ده بيفتح تطبيق الإيميل عندك والرسالة جاهزة. مفيش حاجة بتتبعت غير لما تضغط إرسال هناك.',
      noteLive: 'رسالتك بتوصلني مباشرة على لوحة الرسائل عندي، وبقرا كل رسالة.',
      sending: 'جاري الإرسال…', sentOk: 'الرسالة وصلت. شكرًا ليك، هرد عليك قريب.',
      savedButEmailFailed: 'تم حفظ الرسالة، لكن إرسال الإشعار بالبريد فشل. لا داعي لإعادة إرسالها.',
      emailSentButSaveFailed: 'تم إرسال رسالتك، لكن حفظها فشل.',
      sentFail: 'مقدرناش نوصّل الرسالة دلوقتي. تقدر تبعتها بالإيميل بدل كده:', sentFailLink: 'ابعت بالإيميل',
    },
    footer: 'صُنع بالحب في المنوفية، مصر',
  },
};
