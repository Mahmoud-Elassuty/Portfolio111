/* =========================================================
   Mahmoud Hassan — Portfolio
   Vanilla JavaScript — modular architecture
========================================================= */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================================
     Project data
     Add real projects here. Leave the array empty — do not add
     placeholder/sample projects — until a project is real.

     Shape:
     {
       id: "unique-slug",
       title: "Project Name",
       description: "One-line value proposition.",
       problem: "The problem this project solves.",
       solution: "How it was solved.",
       image: "assets/projects/your-image.jpg",
       technologies: ["HTML", "CSS", "JavaScript"],
       category: "Frontend" | "JavaScript" | "API" | "Full Stack",
       features: ["Feature one", "Feature two"],
       challenges: "A real technical challenge you ran into.",
       learned: "What you learned building it.",
       github: "https://github.com/username/repo", // omit or "#" if none yet
       live: "https://your-demo-url.com",           // omit or "#" if none yet
       featured: false
     }
  ========================================================= */
  const projects = [
    {
      id: "nova-travel-planner",
      title: "NOVA — Smart Travel Planner",
      description:
        "A smart travel-planning web app for exploring destinations, comparing costs, and building a trip itinerary that fits a real budget.",
      problem: "Travel planning tends to get fragmented across search sites, spreadsheets, and notes apps, with no single place to compare destinations against a real budget.",
      solution: "NOVA combines destination discovery, filtering and sorting, an itinerary builder, budget tracking, and favorites into one interface, so a trip can be planned start to finish in one place.",
      image: null, // no real screenshot supplied yet — see README; renders a browser-mockup placeholder instead
      technologies: ["HTML5", "CSS3", "JavaScript"],
      category: "JavaScript",
      features: [
        "Search, filter, and sort 12 destinations by category, price, and rating",
        "Itinerary builder with adjustable trip duration per stop",
        "Live estimated trip cost and budget tracking",
        "Favorites, saved locally in the browser",
        "Personalized destination picks based on favorites and trip selections",
        "Fully responsive layout",
      ],
      challenges: "Keeping the itinerary, budget totals, and favorites in sync in real time as destinations are added, removed, or adjusted — all from client-side state with no backend.",
      learned: "How to structure a non-trivial amount of client-side state and keep multiple interdependent UI sections (explore, itinerary, budget, favorites, picks) consistent with plain JavaScript.",
      github: "https://github.com/Mahmoud-Elassuty/Nova",
      live: "https://mahmoud-elassuty.github.io/Nova/",
      featured: true,
    },
  ];

  /* =========================================================
     GitHub repositories — smaller practice/exercise repos,
     linked out to GitHub rather than featured as case studies.
     Source: https://github.com/Mahmoud-Elassuty?tab=repositories
  ========================================================= */
  const githubRepos = [
    { name: "Test-repo", description: "Git learning repository.", language: "" },
    { name: "My-first-design", description: "First project built with HTML and CSS.", language: "HTML" },
    { name: "My-first-template", description: "HTML and CSS practice template.", language: "HTML" },
    { name: "Challenge1", description: "Frontend Mentor challenge, built with HTML & CSS.", language: "CSS" },
    { name: "Challenge2", description: "Frontend Mentor challenge, built with HTML & CSS.", language: "CSS" },
    { name: "Frontend-Mentor-Social-links-profile", description: "Frontend Mentor: Social links profile challenge.", language: "CSS" },
  ];

  /* =========================================================
     Navigation: mobile menu, backdrop, body scroll lock,
     focus management
  ========================================================= */
  function initNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navLinksList = document.getElementById("nav-links");
    const backdrop = document.getElementById("nav-backdrop");
    if (!hamburger || !navLinksList || !backdrop) return;

    let lastFocused = null;

    function openMenu() {
      lastFocused = document.activeElement;
      navLinksList.classList.add("open");
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add("visible"));
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";
      const firstLink = navLinksList.querySelector("a");
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      navLinksList.classList.remove("open");
      backdrop.classList.remove("visible");
      window.setTimeout(() => { backdrop.hidden = true; }, 300);
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    function isOpen() {
      return navLinksList.classList.contains("open");
    }

    hamburger.addEventListener("click", () => {
      isOpen() ? closeMenu() : openMenu();
    });

    backdrop.addEventListener("click", closeMenu);

    navLinksList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) closeMenu();
    });

    // Simple focus trap while the mobile menu is open
    navLinksList.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || !isOpen()) return;
      const focusable = navLinksList.querySelectorAll("a");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------------------------------------------------------
     Navbar background on scroll
  --------------------------------------------------------- */
  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    function onScroll() {
      navbar.classList.toggle("scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     Active nav link on scroll (IntersectionObserver)
  --------------------------------------------------------- */
  function initActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active-link",
                link.getAttribute("href") === `#${id}`
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ---------------------------------------------------------
     Scroll reveal animations
  --------------------------------------------------------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      ".info-card, .quick-facts, .skill-card, .learning-card, .project-card, .timeline-item, .contact-line, .contact-buttons, .contact-form, .about-text, .section-title, .section-lede"
    );
    targets.forEach((el) => el.classList.add("reveal"));

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     Hero typing effect
  --------------------------------------------------------- */
  function initHeroTyping() {
    const typedEl = document.getElementById("typed-subtitle");
    const fullTextEl = document.getElementById("typed-subtitle-full");
    if (!typedEl || !fullTextEl) return;

    const fullText = fullTextEl.textContent.trim();

    if (prefersReducedMotion) {
      typedEl.textContent = fullText;
      typedEl.classList.add("done");
      return;
    }

    let i = 0;
    const speed = 32;
    function typeChar() {
      if (i <= fullText.length) {
        typedEl.textContent = fullText.slice(0, i);
        i += 1;
        window.setTimeout(typeChar, speed);
      } else {
        typedEl.classList.add("done");
      }
    }
    window.setTimeout(typeChar, 500);
  }

  /* ---------------------------------------------------------
     Back to top button
  --------------------------------------------------------- */
  function initBackToTop() {
    const backToTop = document.getElementById("back-to-top");
    if (!backToTop) return;
    function onScroll() {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------
     CV download — only enable if the file actually exists
  --------------------------------------------------------- */
  function initCvDownload() {
    const cvLink = document.getElementById("cv-download");
    const status = document.getElementById("cv-status");
    if (!cvLink) return;

    cvLink.setAttribute("aria-disabled", "true");
    if (status) status.textContent = "Checking for an available CV file…";

    fetch(cvLink.getAttribute("href"), { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          cvLink.removeAttribute("aria-disabled");
          if (status) status.textContent = "";
        } else {
          throw new Error("CV not found");
        }
      })
      .catch(() => {
        cvLink.setAttribute("aria-disabled", "true");
        cvLink.addEventListener("click", (e) => e.preventDefault());
        cvLink.title = "CV coming soon";
        if (status) status.textContent = "CV coming soon.";
      });
  }

  /* ---------------------------------------------------------
     Projects: render, filter, modal
  --------------------------------------------------------- */
  function projectTechChips(technologies) {
    return technologies.map((t) => `<span>${t}</span>`).join("");
  }

  // Renders a real screenshot when available, otherwise a CSS-only
  // "browser mockup" placeholder — never a broken <img> or an invented image.
  function projectMedia(project, { tall } = { tall: false }) {
    if (project.image) {
      return `<img src="${project.image}" alt="Screenshot of ${project.title}" loading="lazy"${tall ? "" : ' class="project-thumb"'}>`;
    }
    return `
      <div class="browser-mockup" role="img" aria-label="${project.title} preview placeholder — screenshot not yet added">
        <div class="browser-mockup-bar"><span></span><span></span><span></span></div>
        <div class="browser-mockup-body">
          <span class="browser-mockup-title">${project.title}</span>
          <span class="browser-mockup-hint">Screenshot coming soon — view the live demo below</span>
        </div>
      </div>`;
  }

  function projectLinks(project, { withDetails } = { withDetails: true }) {
    const parts = [];
    if (project.live) {
      parts.push(`<a href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>`);
    }
    if (project.github) {
      parts.push(`<a href="${project.github}" target="_blank" rel="noopener noreferrer">View Code</a>`);
    }
    if (withDetails) {
      parts.push(`<button type="button" class="view-details-btn" data-project-id="${project.id}">View Details</button>`);
    }
    return parts.join("");
  }

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    const filterBar = document.getElementById("project-filters");
    const featuredHost = document.getElementById("featured-project");
    if (!grid) return;

    if (!projects.length) {
      grid.innerHTML = `
        <article class="project-card project-card--empty">
          <div class="project-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
          </div>
          <h3>Add your first project</h3>
          <p>Showcase a project that demonstrates your JavaScript, DOM, or responsive-design skills — with a screenshot, a short description, and links to the code.</p>
        </article>`;
      return;
    }

    const featured = projects.find((p) => p.featured);
    const rest = projects.filter((p) => p !== featured);

    // Featured project
    if (featured && featuredHost) {
      featuredHost.innerHTML = `
        <div class="featured-project">
          <div class="featured-media">
            ${projectMedia(featured, { tall: true })}
          </div>
          <div class="featured-body">
            <p class="featured-label">Featured Project</p>
            <h3>${featured.title}</h3>
            <p>${featured.description}</p>
            <div class="project-tech">${projectTechChips(featured.technologies)}</div>
            <div class="project-links">${projectLinks(featured)}</div>
          </div>
        </div>`;
    }

    // Category filters (only categories that exist in real data)
    const categories = ["All", ...new Set(rest.map((p) => p.category).filter(Boolean))];
    if (filterBar && categories.length > 2) {
      filterBar.hidden = false;
      filterBar.innerHTML = categories
        .map(
          (cat, i) =>
            `<button type="button" class="filter-btn${i === 0 ? " active" : ""}" data-filter="${cat}">${cat}</button>`
        )
        .join("");
    }

    function renderGrid(filter) {
      const list = filter && filter !== "All" ? rest.filter((p) => p.category === filter) : rest;
      grid.innerHTML = list
        .map(
          (p) => `
        <article class="project-card" data-category="${p.category || ""}">
          <div class="project-thumb-wrap">
            ${projectMedia(p)}
          </div>
          <div class="project-body">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="project-tech">${projectTechChips(p.technologies)}</div>
            <div class="project-links">${projectLinks(p)}</div>
          </div>
        </article>`
        )
        .join("");
    }

    renderGrid("All");

    if (filterBar) {
      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderGrid(btn.dataset.filter);
      });
    }
  }

  function initProjectModal() {
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.getElementById("modal-close");
    if (!modal || !modalBody || !closeBtn) return;

    let lastFocused = null;

    function openModal(project) {
      lastFocused = document.activeElement;
      modalBody.innerHTML = `
        <h3 id="modal-title">${project.title}</h3>
        <div class="project-tech">${projectTechChips(project.technologies)}</div>
        ${project.problem ? `<div class="modal-section"><h4>Problem</h4><p>${project.problem}</p></div>` : ""}
        ${project.solution ? `<div class="modal-section"><h4>Solution</h4><p>${project.solution}</p></div>` : ""}
        ${project.features && project.features.length ? `<div class="modal-section"><h4>Key Features</h4><ul>${project.features.map((f) => `<li>${f}</li>`).join("")}</ul></div>` : ""}
        ${project.challenges ? `<div class="modal-section"><h4>Challenges</h4><p>${project.challenges}</p></div>` : ""}
        ${project.learned ? `<div class="modal-section"><h4>What I Learned</h4><p>${project.learned}</p></div>` : ""}
        <div class="project-links">${projectLinks(project, { withDetails: false })}</div>
      `;
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add("visible"));
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("visible");
      document.body.style.overflow = "";
      window.setTimeout(() => { modal.hidden = true; }, 250);
      if (lastFocused) lastFocused.focus();
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".view-details-btn");
      if (!trigger) return;
      const project = projects.find((p) => p.id === trigger.dataset.projectId);
      if (project) openModal(project);
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
    modal.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || modal.hidden) return;
      const focusable = modal.querySelectorAll("button, a[href]");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------------------------------------------------------
     Contact form: real delivery via the minimal Express backend
     in server/ (POST /api/contact — see that folder's README
     section for how to run it).

     This never marks the form as "sent" unless the API actually
     returns a successful response. If the backend isn't running,
     submissions correctly show the error state and the visitor is
     pointed to the direct email link instead.

     Endpoint resolution (resolveApiBase, below):
       1. window.PORTFOLIO_API_BASE — an explicit override, set in
          index.html. Only needed if the frontend is deployed on a
          different origin than the backend (e.g. static hosting +
          a backend on another host). Empty by default.
       2. Local dev convenience — if this page is opened on
          localhost/127.0.0.1 on a port other than the backend's own
          (5000), fall back to the backend's default local port. This
          is gated on the hostname actually being localhost/127.0.0.1,
          so it can never fire in a real deployment.
       3. Default: same origin as this page. Correct for the
          recommended flow (Express serves the frontend itself) and
          for any production setup where a reverse proxy forwards
          /api/* to the backend.
  --------------------------------------------------------- */
  function resolveApiBase() {
    if (typeof window.PORTFOLIO_API_BASE === "string" && window.PORTFOLIO_API_BASE.trim()) {
      return window.PORTFOLIO_API_BASE.trim().replace(/\/$/, "");
    }

    const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    if (isLocalHost && window.location.port && window.location.port !== "5000") {
      return "http://localhost:5000";
    }

    return "";
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const formNote = document.getElementById("form-note");
    const submitBtn = document.getElementById("form-submit");
    if (!form) return;

    const CONTACT_API_ENDPOINT = `${resolveApiBase()}/api/contact`;

    const validators = {
      name: (v) => v.trim().length >= 2 || "Please enter your name.",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
        "Please enter a valid email address.",
      subject: (v) => v.trim().length >= 3 || "Please add a short subject.",
      message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
    };

    function validateField(field) {
      const input = form.elements[field];
      const errorEl = document.getElementById(`error-${field}`);
      const result = validators[field](input.value);
      if (result === true) {
        input.removeAttribute("aria-invalid");
        errorEl.textContent = "";
        return true;
      }
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = result;
      return false;
    }

    Object.keys(validators).forEach((field) => {
      form.elements[field].addEventListener("blur", () => validateField(field));
    });

    function setNote(text, state) {
      // state: "" | "sending" | "success" | "error"
      formNote.textContent = text;
      formNote.classList.remove("form-note--success", "form-note--error");
      if (state === "success") formNote.classList.add("form-note--success");
      if (state === "error") formNote.classList.add("form-note--error");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = Object.keys(validators).map(validateField);
      const isValid = results.every(Boolean);

      if (!isValid) {
        setNote("Please fix the highlighted fields.", "error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      setNote("Sending your message…", "sending");

      const payload = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        subject: form.elements.subject.value.trim(),
        message: form.elements.message.value.trim(),
        // Honeypot — hidden from real visitors. A filled value means
        // the submission may have been auto-filled by a bot/browser assistant.
        company_field: form.elements.company_field
          ? form.elements.company_field.value
          : "",
      };

      fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          let data = null;
          try {
            data = await res.json();
          } catch {
            // Non-JSON response (e.g. backend unreachable and a proxy
            // returned an HTML error page) — fall through to the
            // generic error state below.
          }

          if (res.ok && data && data.success) {
            setNote("Message sent successfully. I'll get back to you soon.", "success");
            form.reset();
          } else {
            setNote(
              "Something went wrong. Please try again or contact me directly by email.",
              "error"
            );
          }
        })
        .catch(() => {
          // Network failure / backend not running.
          setNote(
            "Couldn't reach the server. Please try again or contact me directly by email.",
            "error"
          );
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }

  /* ---------------------------------------------------------
     Hero background: mouse-follow glow + subtle particles
     - reduced particle count on small screens
     - devicePixelRatio-aware canvas
     - pauses when hero is off-screen or tab is hidden
  --------------------------------------------------------- */
  function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    const hero = document.querySelector(".hero");
    if (!canvas || !hero || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width, height, particles, dpr, rafId = null;
    let running = false;
    const mouse = { x: null, y: null };

    function particleCount() {
      return window.innerWidth < 640 ? 16 : 36;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.offsetWidth;
      height = hero.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles = Array.from({ length: particleCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.4 + 0.15,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            p.x -= dx * 0.0025;
            p.y -= dy * 0.0025;
          }
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    resize();
    createParticles();

    const heroVisibility = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && document.visibilityState === "visible") start();
          else stop();
        });
      },
      { threshold: 0 }
    );
    heroVisibility.observe(hero);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        stop();
        return;
      }
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) start();
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        createParticles();
      }, 150);
    });

    hero.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  /* ---------------------------------------------------------
     GitHub repos (Code & Open Source section)
  --------------------------------------------------------- */
  function renderGithubRepos() {
    const host = document.getElementById("github-repos");
    if (!host) return;
    host.innerHTML = githubRepos
      .map(
        (repo) => `
      <article class="repo-card">
        <div class="repo-card-top">
          <span class="repo-name">${repo.name}</span>
          ${repo.language ? `<span class="repo-lang">${repo.language}</span>` : ""}
        </div>
        <p>${repo.description}</p>
        <a href="https://github.com/Mahmoud-Elassuty/${repo.name}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </article>`
      )
      .join("");
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initNavbarScroll();
    initActiveNav();
    initHeroTyping();
    initBackToTop();
    initCvDownload();
    renderProjects();
    initProjectModal();
    renderGithubRepos();
    initContactForm();
    initParticles();
    initScrollReveal();
  });
})();
