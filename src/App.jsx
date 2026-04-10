import { useEffect, useState, useRef, useCallback } from 'react'
import avatar from './assets/avatars/avatar.png'
import audreyAvatar from './assets/avatars/audrey-avatar.png'
import lavenderPreview from './assets/project_previews/lavender-preview.png'
import deusPreview from './assets/project_previews/deus-preview.png'
import drobePreview from './assets/project_previews/drobe-preview.png'
import flavorFlickPreview from './assets/project_previews/flavorflick-preview.png'
import cshellPreview from './assets/project_previews/cshell-preview.png'
import skivisPreview from './assets/project_previews/skivis-preview.png'
import resume from './assets/AudreyEkstrom_Resume.pdf'
import chi20 from './assets/publications/chi20.pdf'
import icse20 from './assets/publications/icse20.pdf'
import pets22 from './assets/publications/pets22.pdf'
import ponyo from './assets/fun_photos/photo.png'
import singapore from './assets/fun_photos/boba.png'
import boba from './assets/fun_photos/singapore.png'


import './App.css'

const ROLES = ['Software Engineer', 'Web Developer', 'Mobile Developer', 'UX Designer', 'Site Reliability Engineer']

const PROJECTS = [
  { num: '01', name: 'Deus', desc: 'Learn to read sheet music with real-time keyboard input and AI-powered feedback.', tags: ['React', 'Google Gemini API', 'Python'], color: '#e6b400', gitHub: 'https://github.com/bobtheblb/BeaverHacks2025.git', demo: 'https://devpost.com/software/deus', preview: deusPreview },
  { num: '02', name: 'Lavender', desc: 'Personalized sleep scheduling for shift workers, informed by sleep psychology.', tags: ['React/Vite', 'Firebase', 'Python'], color: '#9a7abf', gitHub: 'https://lavender-app.github.io/lavender/', demo: 'https://youtu.be/MoNmyTLVFZQ?si', preview: lavenderPreview },
  { num: '03', name: 'Drobe', desc: 'A virtual wardrobe app for documenting clothes and planning outfits.', tags: ['Swift', 'iOS'], color: '#6b9e6b', gitHub: 'https://github.com/audreyau/drobe.git', demo: 'https://youtu.be/6Ku9Wr-2rjE', preview: drobePreview },
  { num: '04', name: 'Flavor Flick', desc: 'Discover, save, and reflect on recipes you love.', tags: ['Kotlin', 'Android'], color: '#c47a5a', gitHub: 'https://github.com/audreyau/flavor-flick', demo: 'https://youtu.be/qi3vKYFcO2Q', preview: flavorFlickPreview },
  { num: '05', name: 'C Shell', desc: 'A Unix shell with background processes, I/O redirection, and signal handling.', tags: ['C', 'Linux'], color: '#5a8fa8', gitHub: 'https://github.com/audreyau/c-shell', demo: 'https://youtu.be/T_QET5XHWoo', preview: cshellPreview },
  { num: '06', name: 'SkiVis', desc: 'Visualize and compare ski routes by altitude and steepness', tags: ['C++', 'OpenGL', 'Python'], color: '#d4a500', gitHub: 'https://github.com/audreyau/ski-vis', demo: 'https://youtu.be/9SPgaPU7nbM', preview: skivisPreview }
]

const SKILLS = [
  {
    category: 'Languages',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    items: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'Kotlin', 'Swift', 'Haskell', 'MASM', 'SQL']
  },
  {
    category: 'Frontend',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    items: ['React', 'Vue', 'Angular', 'Svelte', 'HTML', 'CSS', 'JavaScript']
  },
  {
    category: 'Backend & Cloud',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
    items: ['AWS', 'Firebase', 'Apache Airflow', 'Linux']
  },
  {
    category: 'Tools & Observability',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    items: ['Splunk/SignalFX', 'New Relic', 'Git', ' Figma']
  }
]

function SquigglyUnderline() {
  return (
    <svg className="squiggly-underline" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 8 Q20 2, 40 8 T80 8 T120 8 T160 8 T198 8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function App() {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  const [funFacts, setFunFacts] = useState(false)
  const cursorRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Typed intro effect — cycles through ROLES
  useEffect(() => {
    let wordIdx = 0
    let charIdx = 0
    let deleting = false
    let timeout

    const tick = () => {
      const word = ROLES[wordIdx]
      if (!deleting) {
        charIdx++
        setTypedText(word.slice(0, charIdx))
        if (charIdx >= word.length) {
          deleting = true
          timeout = setTimeout(tick, 1800)
          return
        }
        timeout = setTimeout(tick, 70)
      } else {
        charIdx--
        setTypedText(word.slice(0, charIdx))
        if (charIdx <= 0) {
          deleting = false
          wordIdx = (wordIdx + 1) % ROLES.length
          timeout = setTimeout(tick, 400)
          return
        }
        timeout = setTimeout(tick, 40)
      }
    }

    timeout = setTimeout(tick, 70)
    return () => clearTimeout(timeout)
  }, [])

  // Blinking cursor for typed text
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Custom cursor
  useEffect(() => {
    const el = cursorRef.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Confetti easter egg
  const popConfetti = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.display = 'block'

    const ctx = canvas.getContext('2d')
    const colors = ['#e6b400', '#c47a5a', '#9a7abf', '#6b9e6b', '#5a8fa8', '#d4725a']
    const particles = Array.from({ length: 50 }, () => ({
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 4,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 15,
    }))

    let frame
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach((p) => {
        if (p.life <= 0) return
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.3
        p.life -= 0.018
        p.rotation += p.rotSpeed
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      })
      if (alive) {
        frame = requestAnimationFrame(draw)
      } else {
        canvas.style.display = 'none'
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14 9L21 9L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9L10 9Z" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" opacity="0.6" />
        </svg>
      </div>

      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />

      <section id="hero">
        <nav>
          <span className="logo">AE</span>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <button
              className="theme-toggle"
              onClick={() => setDarkMode((d) => !d)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        <div className="hero-stars" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <svg key={i} className={`hero-star star-${i}`} viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14 9L21 9L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9L10 9Z" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" />
            </svg>
          ))}
        </div>

        <div className="hero-center">
          <img
            src={avatar}
            alt="Audrey Ekstrom"
            className="hero-avatar"
            onClick={popConfetti}
          />
          <h1>Audrey Ekstrom</h1>
          <p className="hero-role">
            {typedText}
            <span className={`typed-cursor ${showCursor ? '' : 'hidden'}`}>|</span>
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">See my work</a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-avatar-col">
              <img src={audreyAvatar} alt="" className="about-avatar" />
            </div>
            <div className="about-text-col">
              <p className="label">About me</p>
              <div className="heading-with-underline">
                <h2>Nice to meet you.</h2>
                <SquigglyUnderline />
              </div>
              <p>
                I'm a software engineer with a focus on human-computer interaction. Now working as an Site Reliability Engineer at Nike, I focus on creating and maintaining dependable systems with thoughtful user experiences.
              </p>
              <p>
                I care about building technology that's intuitive, accessible, and fun to use.
              </p>
              <div className="about-buttons">
                <a href={resume} download className="btn btn-primary resume-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Resume
                </a>
                <button className="btn btn-ghost fun-facts-btn" onClick={() => setFunFacts((v) => !v)}>
                  {funFacts ? 'Back to work' : 'Beyond the code'}
                </button>
              </div>

              {funFacts && (
                <div className="fun-facts-card">
                  <div className="fun-facts-tape" aria-hidden="true" />
                  <ul>
                    <li>Former bobarista &mdash; I can still make a mean taro milk tea</li>
                    <li>I play guitar and sing</li>
                    <li>Recently picked up photography</li>
                    <li>Favorite place I've traveled: Singapore</li>
                  </ul>
                  <div className="fun-facts-photos">
                    <div className="polaroid" style={{ transform: 'rotate(-3deg)' }}>
                      <div className="polaroid-img placeholder-img">
                        <img src={ponyo} />
                      </div>
                      <span className="polaroid-caption">my dog, Ponyo</span>
                    </div>
                    <div className="polaroid" style={{ transform: 'rotate(2deg)' }}>
                      <div className="polaroid-img placeholder-img">
                        <img src={singapore} />
                      </div>
                      <span className="polaroid-caption">Singapore</span>
                    </div>
                    <div className="polaroid" style={{ transform: 'rotate(-1.5deg)' }}>
                      <div className="polaroid-img placeholder-img">
                        <img src={boba} />
                      </div>
                      <span className="polaroid-caption">boba</span>
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <p className="label">Projects</p>
          <div className="heading-with-underline">
            <h2 className="section-title">Things I've built.</h2>
            <SquigglyUnderline />
          </div>

          <div className="project-grid">
            {PROJECTS.map((p) => (
              <article className="project-card" key={p.num}>
                <div className="card-preview">
                  <img src={p.preview} alt="Project Preview" />
                </div>
                <div className="card-body">
                  <div className="card-number">{p.num}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="tag-row">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="card-links">
                    <a href={p.gitHub} target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">{p.demo ? <>Demo &rarr;</> : ''} </a>
                    {/* <a href={p.demo} target="_blank" rel="noopener noreferrer">Demo &rarr;</a> */}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="publications">
            <p className="label">Publications</p>
            <div className="heading-with-underline">
              <h2 className="section-title">Research I've contributed to.</h2>
              <SquigglyUnderline />
            </div>


            <div className="pub-list">
              <details className="pub-card">
                <summary>
                  <h3>If This Context Then That Concern: Exploring Users&rsquo; Concerns with IFTTT Applets</h3>
                  <p className="pub-venue">Privacy Enhancing Technologies Symposium (PoPETs), 2022</p>
                </summary>
                <div className="pub-details">
                  <hr className="pub-divider" />
                  <p className="pub-authors">Mahsa Saeidi, McKenzie Calvert, Audrey Au, Anita Sarma, and Rakesh Bobba</p>
                  <p>Explores how contextual factors shape users&rsquo; privacy concerns with smart-home IFTTT applets. Nudging users to consider usage context significantly raised their awareness of data-leakage risks.</p>
                  <div className="card-links">
                    <a href="https://doi.org/10.48550/arXiv.2012.12518" target="_blank" rel="noopener noreferrer">Read Paper &rarr;</a>
                    <a href={pets22} target="_blank" rel="noopener noreferrer" download>Download PDF &rarr;</a>
                    <button className="pub-collapse" onClick={(e) => e.target.closest('details').removeAttribute('open')}>&minus; Show less</button>
                  </div>
                </div>
              </details>

              <details className="pub-card">
                <summary>
                  <h3>What&rsquo;s Wrong with Computational Notebooks? Pain Points, Needs, and Design Opportunities</h3>
                  <p className="pub-venue">Conference on Human Factors in Computing Systems (CHI), ACM, 2020</p>
                  <span className="pub-award-corner" title="Honorable Mention">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2h10v2h3a1 1 0 011 1v3c0 2.21-1.79 4-4 4h-.5c-.73 1.74-2.15 3.1-3.5 3.73V20h3v2H8v-2h3v-2.27c-1.35-.63-2.77-1.99-3.5-3.73H7c-2.21 0-4-1.79-4-4V5a1 1 0 011-1h3zm0 2H5v2c0 1.1.9 2 2 2V6zm10 0v4c1.1 0 2-.9 2-2V6h-2z" /></svg>
                    Best Paper - Honorable Mention
                  </span>
                </summary>
                <div className="pub-details">
                  <hr className="pub-divider" />
                  <p className="pub-authors">Souti Chattopadhyay, Ishita Prasad, Austin Z. Henley, Anita Sarma, and Titus Barik &middot; <span className="pub-role">Acknowledged Contributor</span></p>
                  <p>Identifies nine pain points data scientists face with computational notebooks through interviews and surveys, informing better tool design for the notebook workflow.</p>
                  <div className="card-links">
                    <a href="https://doi.org/10.1145/3313831.3376729" target="_blank" rel="noopener noreferrer">Read Paper &rarr;</a>
                    <a href={chi20} target="_blank" rel="noopener noreferrer" download>Download PDF &rarr;</a>
                    <button className="pub-collapse" onClick={(e) => e.target.closest('details').removeAttribute('open')}>&minus; Show less</button>
                  </div>
                </div>
              </details>

              <details className="pub-card">
                <summary>
                  <h3>A Tale from the Trenches: Cognitive Biases and Software Development</h3>
                  <p className="pub-venue">International Conference on Software Engineering (ICSE), ACM, 2020</p>
                  <span className="pub-award-corner" title="Distinguished Paper Award">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2h10v2h3a1 1 0 011 1v3c0 2.21-1.79 4-4 4h-.5c-.73 1.74-2.15 3.1-3.5 3.73V20h3v2H8v-2h3v-2.27c-1.35-.63-2.77-1.99-3.5-3.73H7c-2.21 0-4-1.79-4-4V5a1 1 0 011-1h3zm0 2H5v2c0 1.1.9 2 2 2V6zm10 0v4c1.1 0 2-.9 2-2V6h-2z" /></svg>
                    Distinguished Paper
                  </span>
                </summary>
                <div className="pub-details">
                  <hr className="pub-divider" />
                  <p className="pub-authors">Souti Chattopadhyay, Nicholas Nelson, Audrey Au, Natalia Morales, Christopher Sanchez, Rahul Pandita, and Anita Sarma</p>
                  <p>A field study revealing that cognitive biases affect ~70% of reversed developer actions, yet existing tools offer little support for mitigating them.</p>
                  <div className="card-links">
                    <a href="https://doi.org/10.1145/3377811.3380330" target="_blank" rel="noopener noreferrer">Read Paper &rarr;</a>
                    <a href={icse20}target="_blank" rel="noopener noreferrer" download>Download PDF &rarr;</a>
                    <button className="pub-collapse" onClick={(e) => e.target.closest('details').removeAttribute('open')}>&minus; Show less</button>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <p className="label">Experience</p>
          <div className="heading-with-underline">
            <h2 className="section-title">Where I&rsquo;ve worked.</h2>
            <SquigglyUnderline />
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-date">Aug 2025 &mdash; Present</span>
                <h3>Site Reliability Engineer</h3>
                <p className="timeline-company">Nike</p>
                <p>Supported all frontend experiences on Nike.com and Nike App, maintaining reliability and observability tooling (dashboards, automation, alerting, and Slack bots), troubleshooting frontend bugs across platforms, and sustaining 99.99% service availability even during peak holiday traffic.</p>
                <div className="tag-row">
                  <span className="tag">AWS</span>
                  <span className="tag">Splunk/SignalFX</span>
                  <span className="tag">New Relic</span>
                  <span className="tag">Python</span>
                  <span className="tag">React</span>
                  <span className="tag">Kotlin</span>
                  <span className="tag">Swift</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-date">Jun 2024 &mdash; Aug 2024</span>
                <h3>Software Engineer Intern</h3>
                <p className="timeline-company">Nike</p>
                <p>Built and owned Storepedia, a React and AWS full-stack app for Nike retail, consolidating store knowledge and reducing tech-support ticket volume by 35% while improving operational efficiency.</p>
                <div className="tag-row">
                  <span className="tag">AWS</span>
                  <span className="tag">React</span>
                  <span className="tag">Python</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-date">Sep 2021 &mdash; Jun 2025</span>
                <h3>Undergraduate Student</h3>
                <p className="timeline-company">Oregon State University</p>
                <p>Acheived a Bachelor of Science in Computer Science. Focused on human-computer interaction and minored in psychology. Received a GPA of 4.0/4.0.</p>
                <div className="tag-row">
                  <span className="tag">C/C++</span>
                  <span className="tag">Python</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Kotlin</span>
                  <span className="tag">Haskell</span>
                  <span className="tag">MASM</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-date">Jun 2019 &mdash; Jun 2024</span>
                <h3>Software Engineer and Research Assistant</h3>
                <p className="timeline-company">Oregon State University</p>
                <p>Designed and implemented professional web applications for faculty and staff, pioneered workflow automations to reduce tech debt, and co-authored two peer-reviewed publications.</p>
                <div className="tag-row">
                  <span className="tag">JavaScript</span>
                  <span className="tag">Apache Airflow</span>
                  <span className="tag">Python</span>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-block"> 
            <p className="label">Tech Stack</p>
            <div className="heading-with-underline">
              <h2 className="section-title">Tools I work with.</h2>
              <SquigglyUnderline />
            </div>

            <div className="skills-grid">
              {SKILLS.map((group) => (
                <div className="skills-category" key={group.category}>
                  <div className="skills-category-header">
                    <span className="skills-icon">{group.icon}</span>
                    <h3>{group.category}</h3>
                  </div>
                  <div className="skills-items">
                    {group.items.map((skill) => (
                      <span className="skill-chip" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* <div style={{marginTop: '3rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <img src="./src/assets/avatars/school-avatar.png" style={{width: '200px', height: 'auto'}} /> 
            <img src="./src/assets/avatars/nike-audrey.png" style={{width: '200px', height: 'auto'}} /> 
            <img src="./src/assets/avatars/test.png" style={{width: '200px', height: 'auto'}} /> 
          </div> */}

        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="sticky-note">
            <div className="sticky-tape" aria-hidden="true" />
            <p className="label">Contact</p>
            <div className="heading-with-underline">
              <h2>Let&rsquo;s connect!</h2>
              <SquigglyUnderline />
            </div>
            <p className="contact-body">
              I&rsquo;m always open to new opportunities, collaborations, or just a friendly hello.
            </p>
            <a href="mailto:audrey.wingkei.ekstrom@gmail.com" className="btn btn-primary">Say hello</a>
            <div className="social-row">
              <a href="https://github.com/audreyau" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span className="dot" />
              <a href="https://linkedin.com/in/audreyekstrom" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Designed & built by Audrey Ekstrom &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}

export default App
