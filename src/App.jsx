import { useEffect, useState } from 'react';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const profile = {
  name: 'Aye Nyein San',
  role: 'Web Developer',
  intro:
    'A Computer Engineering student at Batangas State University and a scholarship recipient supported by USAID and the Institute of International Education (IIE), with hands-on experience as a Software Developer across both front-end and back-end development. I specialize in creating user-friendly, visually engaging, and responsive websites using HTML, CSS, JavaScript, and frameworks like React and Laravel. My university projects have strengthened my collaboration, adaptability, and problem-solving skills, and I’m passionate about embracing new challenges and delivering high-quality solutions.',
  summary:
    'My work is shaped by community, volunteer experience, and a long-term goal of creating learning platforms that allow students to access education from anywhere.',
  tech: [
    { name: 'JavaScript', level: 80 },
    { name: 'React JS', level: 80 },
    { name: 'Java', level: 80 },
    { name: 'Node.js', level: 50 },
    { name: 'PHP', level: 50 },
    { name: 'Laravel', level: 50 },
    { name: 'MongoDB', level: 50 },
    { name: 'MySQL', level: 50 },
  ],
};

const organizations = [
  {
    title: 'Intern Plus Myanmar',
    period: '2021 March - 2022',
    role: 'Web Developer',
    image: asset('organizations/intern-plus.png'),
    link: 'https://web.facebook.com/myanmarinternplus',
  },
  {
    title: 'Women AI in Myanmar',
    period: '2022 March - 2023',
    role: 'Tech Article Editor',
    image: asset('organizations/women-ai.png'),
    link: 'https://web.facebook.com/womeninaimyanmar',
  },
  {
    title: 'VarCamp',
    period: '2023 March - Present',
    role: 'Organizer, Developer',
    image: asset('organizations/varcamp.png'),
    link: 'https://web.facebook.com/VarCamp',
  },
  {
    title: 'Cursor/Circuit',
    period: 'Student Organization',
    role: 'Java Student Mentor',
    image: asset('organizations/circuit-java-horizontal.jpeg'),
    imageMode: 'contain',
    imageWrapper: 'bg-slate-100 dark:bg-slate-900/90',
    link: 'https://web.facebook.com/CURSORBatStateU',
  },
];

const projects = [
  {
    title: 'Social Media Application',
    stack: 'React JS, MongoDB, REST API, WebSocket, Docker',
    link: 'https://github.com/AyeNyeinSan22/Social-Media.git',
    description:
      'A social media platform where users can create accounts, post content, comment, like, unlike, and receive real-time notifications.',
    accent: 'violet',
    image: asset('projects/social-media.png'),
    highlights: ['Real-time notifications', 'Account and post flows', 'Docker-based media handling'],
  },
  {
    title: 'Movie Application',
    stack: 'Next.js',
    link: 'https://github.com/AyeNyeinSan22/next-movie.git',
    description:
      'A movie discovery experience that lets users browse categories, actors, film history, and titles in a cleaner way.',
    accent: 'cyan',
    image: asset('projects/movie-application.png'),
    highlights: ['Category-based browsing', 'Actor and title exploration', 'Clean search experience'],
  },
  {
    title: 'Save Our Planet',
    stack: 'Awareness Website',
    link: 'https://ayenyeinsan22.github.io/saveOurPlanet/',
    description:
      'An environmental awareness site focused on sustainability, eco-friendly products, and community learning around reduction, reuse, and recycling.',
    accent: 'pink',
    image: asset('projects/save-our-planet.png'),
    highlights: ['Advocacy-driven design', 'Environmental storytelling', 'Community awareness focus'],
  },
  {
    title: 'EduHub',
    stack: 'React JS, Flask',
    link: 'https://github.com/AyeNyeinSan22/EduHub',
    description:
      'A study and note-management platform with reminders, schedules, and organized learning resources designed to make coursework easier to manage.',
    accent: 'gold',
    image: asset('projects/eduhub.png'),
    highlights: ['Schedule and reminder flow', 'Learning resource organization', 'Student-focused interface'],
  },
];

const contact = [
  {
    label: 'Phone',
    value: '+63 976 583 9338',
    href: 'tel:+639765839338',
  },
  {
    label: 'Email',
    value: 'ayenyeinsan101010@gmail.com',
    href: 'mailto:ayenyeinsan101010@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/AyeNyeinSan22',
    href: 'https://github.com/AyeNyeinSan22',
  },
];

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'organizations', label: 'Organizations' },
  { id: 'contact', label: 'Contact Me' },
];

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const storedTheme = window.localStorage.getItem('portfolio-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observedSections = document.querySelectorAll('section[id], header[id]');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.25, 0.45, 0.7], rootMargin: '-20% 0px -45% 0px' }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
    observedSections.forEach((section) => sectionObserver.observe(section));

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(196,181,253,0.34),_transparent_24%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.18),_transparent_20%),linear-gradient(180deg,_#faf7ff_0%,_#f3ecff_42%,_#eef6ff_100%)] text-slate-900 transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.24),_transparent_24%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.14),_transparent_20%),linear-gradient(180deg,_#150524_0%,_#0c0218_38%,_#080112_100%)] dark:text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl float-slow dark:bg-fuchsia-500/20" />
        <div className="pointer-events-none absolute right-0 top-96 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl float-delayed dark:bg-cyan-500/10" />

        <nav className="sticky top-4 z-30 mb-6">
          <div className="nav-shell">
            <div className="nav-brand">
              <span className="nav-brand-mark">A</span>
              <div className="nav-brand-copy">
                <strong>Aye Nyein San</strong>
                <span>Portfolio</span>
              </div>
            </div>

            <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`nav-link ${
                activeSection === item.id
                  ? 'nav-link-active'
                  : 'nav-link-idle'
              }`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
            </div>

            <div className="nav-actions">
          <button
            type="button"
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="nav-theme-toggle"
          >
            {theme === 'dark' ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M12 2.5v2.2" />
                <path d="M12 19.3v2.2" />
                <path d="M2.5 12h2.2" />
                <path d="M19.3 12h2.2" />
                <path d="m5.2 5.2 1.6 1.6" />
                <path d="m17.2 17.2 1.6 1.6" />
                <path d="m17.2 6.8 1.6-1.6" />
                <path d="m5.2 18.8 1.6-1.6" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-violet-700"
                fill="currentColor"
              >
                <path d="M20.4 14.6A8.5 8.5 0 0 1 9.4 3.6a.75.75 0 0 0-.9-.96A10 10 0 1 0 21.36 15.5a.75.75 0 0 0-.96-.9Z" />
              </svg>
            )}
          </button>
            </div>
          </div>
        </nav>

        <header
          id="home"
          data-reveal
          className="reveal-section relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_30px_80px_rgba(148,163,184,0.22)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(60,22,103,0.96),rgba(16,5,32,0.9))] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:p-12"
        >
          <div className="grid-overlay" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-200/40 to-transparent dark:from-black/40" />

          <div className="relative z-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-300">
              Hello 👋
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-[0.9] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              I&apos;m Aye Nyein
            </h1>
            <p className="mt-4 text-lg font-medium text-fuchsia-700 dark:text-fuchsia-200">
              {profile.role}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 [text-align:justify] dark:text-slate-300">
              {profile.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.28)] transition hover:-translate-y-1"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 px-6 text-sm font-semibold text-slate-800 transition hover:-translate-y-1 hover:border-fuchsia-300 hover:bg-fuchsia-50 dark:border-white/15 dark:bg-slate-900/60 dark:text-white dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-500/10"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex items-center justify-center lg:mt-0 lg:justify-end">
            <div className="portrait-orbit portrait-orbit-one" />
            <div className="portrait-orbit portrait-orbit-two" />
            <div className="absolute bottom-3 h-20 w-[72%] rounded-full bg-gradient-to-r from-fuchsia-500/30 via-violet-500/30 to-cyan-400/25 blur-2xl pulse-glow" />
            <div className="portrait-shell relative overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-b from-white/80 to-fuchsia-100/60 p-2 shadow-2xl dark:border-white/10 dark:bg-white/5">
              <img
                src={asset('portrait.jpeg')}
                alt="Aye Nyein San portrait"
                className="portrait-image h-[320px] w-[260px] rounded-[1.5rem] object-cover object-top transition duration-500 hover:scale-[1.03] sm:h-[360px] sm:w-[290px] lg:h-[420px] lg:w-[320px]"
              />
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-8">
          <section data-reveal className="reveal-section rounded-[2rem] border border-white/60 bg-white/70 px-6 py-10 text-center shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/35 sm:px-10" id="about">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
              About
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">
              Building thoughtful products around education and access
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 [text-align:justify] dark:text-slate-300">
              {profile.summary}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {profile.tech.map((item) => (
                <div
                  key={item.name}
                  className="rounded-[1.5rem] border border-fuchsia-200/80 bg-white/85 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-fuchsia-400 hover:shadow-lg dark:border-fuchsia-400/20 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item.name}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                      {item.level}%
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="organizations"
            data-reveal
            className="reveal-section relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 px-6 py-12 text-center shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/25 sm:px-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
              Organizations
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">
              Communities and groups that shaped my growth
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 [text-align:justify] dark:text-slate-300">
              My development journey has been strengthened by volunteer work,
              technical communities, and competition experience.
            </p>

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/15" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/25 dark:border-fuchsia-400/20" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 dark:border-cyan-400/10" />

            <div className="relative z-10 mt-10 grid gap-5 sm:grid-cols-2">
              {organizations.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/85 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-300"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900/80 ${
                      item.imageWrapper ?? ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`transition duration-500 group-hover:scale-[1.04] ${
                        item.imageClass ?? 'h-full w-full'
                      } ${
                        item.imageMode === 'contain'
                          ? 'object-contain bg-slate-50 p-2 dark:bg-slate-950'
                          : 'object-cover'
                      } ${item.imageRotation ?? ''}`}
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
                      {item.period}
                    </p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {item.role}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center rounded-full border border-cyan-300/70 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-100 dark:border-cyan-400/25 dark:bg-cyan-500/10 dark:text-cyan-200 dark:hover:bg-cyan-500/15"
                    >
                      Visit page
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section data-reveal className="reveal-section rounded-[2rem] border border-white/60 bg-white/70 px-6 py-10 text-center shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/35 sm:px-10" id="projects">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
              Recent Work
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">
              Selected projects and practical builds
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 [text-align:justify] dark:text-slate-300">
              A mix of full applications, advocacy websites, and concept
              prototypes, all shaped by curiosity, community work, and real
              product thinking.
            </p>
          </section>

          <section className="grid gap-6">
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-reveal
                className={`reveal-section group grid gap-5 rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(139,92,246,0.14)] dark:border-white/10 dark:bg-slate-950/45 lg:grid-cols-[1.02fr_0.98fr] ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div
                  className="flex items-center lg:justify-start"
                >
                  <div
                    className="w-full rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-6 text-left shadow-sm dark:border-white/10 dark:bg-white/5 lg:max-w-[30rem]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-cyan-300/60 bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                        Project {index + 1}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                        {project.stack}
                      </span>
                    </div>

                    <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-slate-950 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-slate-600 [text-align:justify] dark:text-slate-300">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit items-center rounded-full border border-fuchsia-300/60 bg-fuchsia-50 px-4 py-2 text-sm font-semibold text-fuchsia-700 transition hover:-translate-y-0.5 hover:border-fuchsia-400 hover:bg-fuchsia-100 dark:border-fuchsia-400/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200 dark:hover:bg-fuchsia-500/15"
                        >
                          Open project
                        </a>
                      ) : (
                        <span className="inline-flex w-fit items-center rounded-full border border-slate-300/70 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                          Private project preview
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative min-h-64 overflow-hidden rounded-[1.5rem] border border-white/40 bg-gradient-to-br from-slate-100 via-white to-fuchsia-100 p-4 shadow-inner transition duration-300 group-hover:scale-[1.01] dark:border-white/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                  <div
                    className={`absolute inset-0 opacity-80 blur-3xl transition duration-500 group-hover:opacity-100 ${
                      project.accent === 'violet'
                        ? 'bg-fuchsia-400/20 dark:bg-fuchsia-500/20'
                        : project.accent === 'cyan'
                          ? 'bg-cyan-400/20 dark:bg-cyan-500/20'
                          : project.accent === 'pink'
                            ? 'bg-pink-400/20 dark:bg-pink-500/20'
                            : 'bg-amber-300/25 dark:bg-amber-400/20'
                    }`}
                  />
                  <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-3 dark:border-white/10 dark:bg-slate-950/90">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full rounded-[1rem] object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section
            id="contact"
            data-reveal
            className="reveal-section grid gap-6 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_70px_rgba(148,163,184,0.18)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/45 lg:grid-cols-[0.9fr_1.1fr] lg:p-8"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">
                Drop me a message
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 [text-align:justify] dark:text-slate-300">
                I&apos;m interested in web development, education-centered
                products, and meaningful collaboration.
              </p>

              <div className="mt-6 grid gap-3">
                {contact.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'GitHub' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-300"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
                      {item.label}
                    </span>
                    <strong className="mt-2 block text-base font-semibold text-slate-800 dark:text-slate-100">
                      {item.value}
                    </strong>
                  </a>
                ))}
              </div>
            </div>

            <form
              className="grid gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-inner dark:border-white/10 dark:bg-slate-900/80"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-400/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Message
                </span>
                <textarea
                  rows="5"
                  placeholder="Tell me about your project..."
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.28)] transition hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
