import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import './index.css'

// Lazy load the heavy 3D component
const CosmicCanvas = lazy(() => import('./components/CosmicCanvas'))

// Navigation Component
function Navigation() {
  return (
    <nav className="nav">
      <a href="#hero" className="nav__logo">SK</a>
      <ul className="nav__links">
        <li><a href="#about" className="nav__link">About</a></li>
        <li><a href="#experience" className="nav__link">Experience</a></li>
        <li><a href="#skills" className="nav__link">Skills</a></li>
        <li><a href="#education" className="nav__link">Education</a></li>
        <li><a href="#contact" className="nav__link">Contact</a></li>
      </ul>
    </nav>
  )
}

// Progress Indicator
function ProgressIndicator({ activeSection }: { activeSection: number }) {
  const sections = ['hero', 'about', 'experience', 'skills', 'education', 'contact']
  
  return (
    <div className="progress">
      {sections.map((section, index) => (
        <a
          key={section}
          href={`#${section}`}
          className={`progress__dot ${index === activeSection ? 'active' : ''}`}
          aria-label={`Go to ${section} section`}
        />
      ))}
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="section hero">
      <span className="hero__greeting">Hello, I'm</span>
      <h1 className="hero__name">Sarang Kulkarni</h1>
      <p className="hero__title">Software Developer</p>
      <div className="hero__cta">
        <a href="#experience" className="btn btn--primary">
          View My Experience
          <span>→</span>
        </a>
        <a href="#contact" className="btn btn--secondary">
          Get In Touch
        </a>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll to explore</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="section about">
      <span className="section__label">// About Me</span>
      <h2 className="section__title">Crafting Digital Experiences</h2>
      <p className="about__text">
        I'm a passionate <strong>Software Developer</strong> who loves building
        elegant solutions to complex problems. With a keen eye for detail and
        a love for clean code, I create applications that are both functional
        and delightful to use.
        <br /><br />
        When I'm not coding, you'll find me exploring new technologies,
        or diving deep into system design patterns.
        I believe in continuous learning and pushing the boundaries of what's
        possible with code.
      </p>
    </section>
  )
}

// Skills Section
function SkillsSection() {
  const skillCategories = [
    {
      icon: '⚡',
      title: 'Frontend',
      items: ['TypeScript', 'HTML', 'CSS', 'HTMX']
    },
    {
      icon: '🔧',
      title: 'Backend',
      items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Javascript']
    },
    {
      icon: '☁️',
      title: 'DevOps',
      items: ['AWS', 'Linux']
    },
    {
      icon: '🎯',
      title: 'Other',
      items: ['Git', 'REST APIs', 'Agile', 'NATS', 'Socket.io']
    },
    {
      icon: '🏗️',
      title: 'Frameworks',
      items: ['Express.js', 'Django']
    }
  ]
  
  return (
    <section id="skills" className="section skills">
      <span className="section__label">// What I Do</span>
      <h2 className="section__title">Skills & Expertise</h2>
      <div className="skills__grid">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-card">
            <div className="skill-card__icon">{category.icon}</div>
            <h3 className="skill-card__title">{category.title}</h3>
            <div className="skill-card__items">
              {category.items.map((item) => (
                <span key={item} className="skill-card__item">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      company: 'Oleander Financial Technologies Pvt Ltd',
      role: 'Software Developer',
      period: 'June 2025 - Present',
      location: 'Pune, India',
      projects: [
        {
          name: 'Protradedesk',
          subtitle: 'Copy Trading Platform',
          points: [
            'Architected and developed a Copy Trading Platform enabling traders to execute trades across multiple brokerage accounts simultaneously using Python, Django, and WebSocket technologies',
            'Integrated third-party APIs from India\'s leading brokers (Zerodha, Angel One, Groww, Upstox, and many more) for real-time order execution, portfolio synchronization, and live market data streaming',
            'Built a unified portfolio dashboard allowing users to monitor positions, holdings, and P&L across multiple trading accounts in a single interface',
            'Implemented real-time order updates using WebSockets and asynchronous task processing with Huey queue for high-performance trade execution'
          ],
          tech: ['Python', 'Django', 'WebSocket', 'PostgreSQL', 'Huey', 'HTMX', 'REST APIs', 'AWS']
        },
        {
          name: 'Olgo',
          subtitle: 'Financial Goal Tracking Platform',
          points: [
            'Developed a financial goal tracking platform analyzing user spending patterns and investment history to create personalized financial roadmaps using Python, Django, and NATS messaging',
            'Integrated Finvuu Account Aggregator API to securely fetch comprehensive financial data from user\'s banks and investment platforms, enabling holistic financial planning',
            'Implemented 2Factor SMS service for OTP authentication and currently integrating Smallcase APIs to enable direct stock investments aligned with user goals',
            'Collaborated with Flutter mobile development team to build RESTful APIs powering Android and iOS applications'
          ],
          tech: ['Python', 'Django', 'NATS', 'PostgreSQL', 'REST APIs', 'Flutter', 'Account Aggregator', 'AWS']
        }
      ]
    },
    {
      company: 'Coditas LLP',
      role: 'Associate Software Engineer',
      period: 'July 2022 - December 2023',
      location: 'Pune, India',
      projects: [
        {
          name: 'Candidate Connect',
          subtitle: 'Recruitment Automation Platform',
          points: [
            'Developed a recruitment automation platform connecting candidates with HR teams via WhatsApp Business API, reducing hiring turnaround time by 40%',
            'Designed and implemented microservices architecture with RESTful APIs, WebSocket integration, and seamless third-party integrations with Zoho Recruit and Zoho People',
            'Collaborated with cross-functional teams in Agile environment to deliver production-ready features'
          ],
          tech: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'WebSocket', 'Microservices', 'REST APIs']
        },
        {
          name: 'Mitsu',
          subtitle: 'Mental Health Care Platform',
          points: [
            'Built a mental health care platform featuring secure authentication systems, payment gateway integration (Razorpay), and automated email notification services',
            'Engineered backend services using Node.js, Express.js, TypeScript, and PostgreSQL with focus on scalability, security, and performance optimization',
            'Maintained 80%+ code coverage through comprehensive unit and integration testing'
          ],
          tech: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Razorpay', 'AWS', 'Jest']
        }
      ]
    }
  ]
  
  return (
    <section id="experience" className="section experience">
      <span className="section__label">// Career Journey</span>
      <h2 className="section__title">Professional Experience</h2>
      <div className="experience__timeline">
        {experiences.map((exp) => (
          <article key={exp.company} className="experience__card">
            <div className="experience__header">
              <div>
                <h3 className="experience__role">{exp.role}</h3>
                <p className="experience__company">{exp.company}</p>
              </div>
              <div className="experience__meta">
                <span className="experience__period">{exp.period}</span>
                <span className="experience__location">{exp.location}</span>
              </div>
            </div>
            
            <div className="experience__projects">
              {exp.projects.map((project) => (
                <div key={project.name} className="experience__project">
                  <h4 className="experience__project-name">
                    {project.name}
                    <span className="experience__project-subtitle">{project.subtitle}</span>
                  </h4>
                  <ul className="experience__description">
                    {project.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  <div className="experience__tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="experience__tech-item">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Education Section
function EducationSection() {
  return (
    <section id="education" className="section education">
      <span className="section__label">// Academic Background</span>
      <h2 className="section__title">Education</h2>
      <div className="education__content">
        <article className="education__card">
          <div className="education__icon">🎓</div>
          <div className="education__details">
            <h3 className="education__degree">Bachelor of Engineering (B.E.)</h3>
            <p className="education__field">Electronics and Telecommunications</p>
            <p className="education__institution">AISSMS Institute of Information Technology (IOIT)</p>
            <p className="education__university">Savitribai Phule Pune University</p>
            <div className="education__meta">
              <span className="education__period">2017 - 2022</span>
              <span className="education__location">Pune, Maharashtra</span>
            </div>
            <div className="education__score">
              <span className="education__cgpa">CGPA: 8.01 / 10</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  // Professional mailto template
  const emailSubject = encodeURIComponent("Opportunity to Connect - From Your Portfolio")
  const emailBody = encodeURIComponent(`Hi Sarang,

I came across your portfolio and was impressed by your work. I'd love to discuss a potential opportunity with you.

[Please describe the opportunity or project briefly]

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Company/Organization]`)
  
  const links = [
    { icon: '📧', label: 'Email', href: `mailto:sarang.kulkarni99@gmail.com?subject=${emailSubject}&body=${emailBody}` },
    { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/sarangkulkarni99' },
    { icon: '🐙', label: 'GitHub', href: 'https://github.com/sarangkulkarni99' },
  ]
  
  return (
    <section id="contact" className="section contact">
      <span className="section__label">// Get In Touch</span>
      <h2 className="section__title">Let's Connect</h2>
      <p className="about__text" style={{ textAlign: 'center', maxWidth: '600px' }}>
        I'm always open to discussing new projects, creative ideas,
        or opportunities to be part of your vision.
      </p>
      
      {/* Resume Download Button */}
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <a 
          href="/Sarang Kulkarni.pdf" 
          download="Sarang Kulkarni.pdf"
          className="btn btn--primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>📄</span>
          Download Resume
          <span>↓</span>
        </a>
      </div>
      
      <div className="contact__links">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="contact__link" target="_blank" rel="noopener noreferrer">
            <span className="contact__link-icon">{link.icon}</span>
            <span className="contact__link-label">{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [onComplete])
  
  return (
    <div className="loading" style={{ opacity: progress >= 100 ? 0 : 1, transition: 'opacity 0.5s' }}>
      <div className="loading__spinner" />
      <div className="loading__text">Loading universe... {Math.min(100, Math.round(progress))}%</div>
    </div>
  )
}

// Main App
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
      
      // Determine active section
      const sections = ['hero', 'about', 'experience', 'skills', 'education', 'contact']
      const sectionElements = sections.map(id => document.getElementById(id))
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(i)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <Suspense fallback={<div className="canvas-container" style={{ background: '#030014' }} />}>
        <CosmicCanvas scrollProgress={scrollProgress} />
      </Suspense>
      
      <Navigation />
      <ProgressIndicator activeSection={activeSection} />
      
      <main className="content-overlay">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
