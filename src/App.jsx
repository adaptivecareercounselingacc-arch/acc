import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './animation/ScrollReveal.jsx'
import HeroReveal from './animation/HeroReveal.jsx'
import MagneticButton from './animation/MagneticButton.jsx'
import HoverCard from './animation/HoverCard.jsx'

/* ---------------- Data ---------------- */

/* Contact details — single source of truth */
const PHONE_PRIMARY = { display: '+92 305 4904302', tel: '+923054904302' }
const PHONE_SECONDARY = { display: '+92 308 7170007', tel: '+923087170007' }
/* WhatsApp is handled on the +92 308 number */
const WHATSAPP_PHONE = PHONE_SECONDARY
const WHATSAPP = `https://wa.me/${WHATSAPP_PHONE.tel.replace('+', '')}`
const ADDRESS = 'Mumtaz Market, Opposite Chase Up, Gujranwala'
const EMAIL = 'adaptivecareercounselingacc@gmail.com'
const SOCIALS = [
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f', href: 'https://facebook.com/accconsultant7' },
  {
    label: 'Instagram',
    icon: 'fa-brands fa-instagram',
    href: 'https://www.instagram.com/acc_consultant7',
  },
  {
    label: 'LinkedIn',
    icon: 'fa-brands fa-linkedin-in',
    href: 'https://www.linkedin.com/in/abu-akashaa',
  },
]

const SLIDES = [
  {
    bg: '/hero-graduation.jpg',
    tag: 'ACC Consultants',
    h1: 'Your Gateway to World-Class Education',
    p: 'Study at top universities across the UK, Europe, and beyond. Expert guidance, real results.',
    primary: { text: 'Explore Study Destinations', href: '#destinations' },
    secondary: { text: 'Book Free Consultation', href: '#book' },
  },
  {
    bg: '/hero-campus.jpg',
    tag: 'Trusted by 10,000+ Students',
    h1: 'Find the Right University for You',
    p: "From Bachelor's to PhD — we match you with the best programme and help you get there.",
    primary: { text: 'Start Your Application', href: '#book' },
    secondary: { text: 'Why ACC Consultants?', href: '#about' },
  },
  {
    bg: '/hero-europe-city.jpg',
    tag: '10+ Years of Study Abroad Expertise',
    h1: 'Study in Europe — Affordable, Accessible, Life-Changing',
    p: 'Romania, Finland, France, Cyprus and more. Degrees from €170/year with work rights included.',
    primary: { text: 'View All Destinations', href: '#destinations' },
    secondary: { text: 'Chat on WhatsApp', href: WHATSAPP, external: true },
  },
  {
    bg: '/hero-students.jpg',
    tag: 'Free Profile Assessment',
    h1: 'Know Where You Stand Before You Apply',
    p: 'Send us your grades and budget. We tell you honestly which universities and countries are within reach.',
    primary: { text: 'Get My Free Assessment', href: '#book' },
    secondary: { text: 'How It Works', href: '#process' },
  },
  {
    bg: '/hero-uk-campus.jpg',
    tag: 'United Kingdom',
    h1: 'World-Ranked UK Universities, Within Reach',
    p: 'CAS letters, financial documents and Embassy filing — handled end to end by advisors who do this every day.',
    primary: { text: 'Explore UK Admissions', href: '#destinations' },
    secondary: { text: 'Talk to an Advisor', href: '#book' },
  },
  {
    bg: '/hero-london.jpg',
    tag: '95% Visa Success Rate',
    h1: 'From Gujranwala to London, Paris and Helsinki',
    p: 'Five study destinations, one team. We match you with the programme that fits your profile — not the other way around.',
    primary: { text: 'Compare Destinations', href: '#destinations' },
    secondary: { text: 'Read Student Stories', href: '#testimonials' },
  },
  {
    bg: '/hero-departure.jpg',
    tag: 'End-to-End Support',
    h1: "Visa Filed. Bags Packed. We're With You.",
    p: 'Pre-departure briefing, accommodation guidance and university enrolment — the support does not stop at the visa.',
    primary: { text: 'Start Your Application', href: '#book' },
    secondary: { text: 'Chat on WhatsApp', href: WHATSAPP, external: true },
  },
]

const STATS = [
  { target: 5, suffix: '+', title: 'Study Destinations', desc: 'Carefully selected countries' },
  { target: 10000, suffix: '+', title: 'Students Placed', desc: 'Successfully enrolled' },
  { target: 10, suffix: ' Years', title: 'Experience', desc: 'Of trusted consulting' },
  { target: 95, suffix: '%', title: 'Visa Success Rate', desc: 'For student applications' },
]

const FEATURES = [
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Honest Assessment',
    text: 'No hidden fees or false promises. We evaluate your academic profile honestly and guide you to the right universities.',
  },
  {
    icon: 'fa-solid fa-user-tie',
    title: 'Admissions Experts',
    text: 'Our advisors are specialists in international student admissions and up-to-date on every intake cycle and requirement.',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'Fast-Track Applications',
    text: 'We prepare your documents, SOPs, and applications efficiently — so you never miss an intake deadline.',
  },
  {
    icon: 'fa-solid fa-handshake-angle',
    title: 'End-to-End Support',
    text: 'From university selection to pre-departure briefing, we are with you every step of your study abroad journey.',
  },
]

const DESTINATIONS = [
  {
    flag: 'https://flagcdn.com/w320/gb.png',
    name: 'United Kingdom',
    why: 'Why study in the UK?',
    text: ' World-ranked universities, globally recognised degrees, and a rich campus life. Ideal for ambitious students seeking top-tier education.',
  },
  {
    flag: 'https://flagcdn.com/w320/ro.png',
    name: 'Romania',
    why: 'Why study in Romania?',
    text: ' EU/Schengen country offering affordable high-quality university degrees with excellent student visa options across skilled disciplines.',
  },
  {
    flag: 'https://flagcdn.com/w320/fi.png',
    name: 'Finland',
    why: 'Why study in Finland?',
    text: ' World-leading education system, tuition from €6,000/year, 25 hours/week work rights, and outstanding post-study pathways.',
  },
  {
    flag: 'https://flagcdn.com/w320/fr.png',
    name: 'France',
    why: 'Why study in France?',
    text: ' Top-tier public universities from €170/year, CAF housing assistance, and legal part-time work rights in the Schengen Zone.',
  },
  {
    flag: 'https://flagcdn.com/w320/cy.png',
    name: 'Cyprus',
    why: 'Why study in Cyprus?',
    text: ' English-taught degrees from €3,500/year, low cost of living, straightforward student visa, and dependent permit options for families.',
  },
]

const PROCESS = [
  {
    icon: 'fa-solid fa-magnifying-glass',
    title: 'Free Profile Assessment',
    text: 'Share your grades, budget, and goals. We evaluate your eligibility and recommend the best-fit country and programme.',
  },
  {
    icon: 'fa-solid fa-building-columns',
    title: 'University Selection',
    text: 'We shortlist universities from our partner network that match your academic background, field of interest, and budget.',
  },
  {
    icon: 'fa-solid fa-file-pen',
    title: 'Application & Offer Letter',
    text: 'We prepare your complete application — SOP, CV, recommendation letters — and submit it to secure your offer letter.',
  },
  {
    icon: 'fa-solid fa-passport',
    title: 'Visa Documentation',
    text: 'We guide you through document attestation, bank statement preparation, and full Embassy visa filing — start to finish.',
  },
  {
    icon: 'fa-solid fa-plane-departure',
    title: 'Depart & Enrol',
    text: 'Pre-departure briefing, flight guidance, accommodation support, and university enrolment — we are with you until you land.',
  },
]

const TESTIMONIALS = [
  {
    text: 'I came in with a 2.4 CGPA and very low expectations. Instead of promising me the world, they showed me three universities that realistically fit and explained why the rest would waste my money. I got into the second one.',
    name: 'Zeeshan Haider',
    course: 'MSc Logistics, University of Huddersfield, UK',
    badge: 'UK Student Visa — Granted',
  },
  {
    text: 'Being a girl travelling alone, my parents had a hundred questions. The team sat with my mother for almost an hour, explained the hostel arrangement and the city, and answered every single one. That trust is why we signed.',
    name: 'Iqra Nadeem',
    course: 'BSc Biotechnology, Cluj-Napoca, Romania',
    badge: 'Romania Type D Visa — Granted',
  },
  {
    text: 'My first application was rejected because of a weak financial statement. They rebuilt the whole sponsor file, explained the six-month rule properly, and the reapplication cleared without a single query.',
    name: 'Faizan Ashraf',
    course: 'MSc Information Systems, Tampere, Finland',
    badge: 'Finland Study Visa — Granted',
  },
  {
    text: 'I was already working and could only meet after Maghrib. They stayed open late twice for me and handled the embassy appointment booking themselves. Genuinely felt like they wanted this to work.',
    name: 'Kashif Mahmood',
    course: 'MBA, University of Nicosia, Cyprus',
    badge: 'Cyprus Student Visa — Granted',
  },
  {
    text: 'They talked me out of a university I had my heart set on because the course content did not match my degree, and the visa officer would have caught it. Annoying at the time, correct in hindsight.',
    name: 'Rabia Sattar',
    course: 'MSc Data Analytics, Université de Nantes, France',
    badge: 'France Student Visa — Granted',
  },
  {
    text: 'Everything was written down — what they would do, what I had to bring, what each step cost. No surprises, no extra demands at the last minute. My cousin is starting his file with them next month.',
    name: 'Umar Farooq Cheema',
    course: 'BSc Civil Engineering, Bucharest, Romania',
    badge: 'Romania Type D Visa — Granted',
  },
]

const FAQS = [
  {
    q: 'Which countries can I study in through ACC Consultants?',
    a: "We currently offer complete study visa services for the United Kingdom, Romania, Finland, France, and Cyprus. Each destination has dedicated advisors with specialist knowledge of that country's admission process, visa requirements, and university partner network. More destinations are being added — contact us if you have a specific country in mind.",
  },
  {
    q: 'Do I need IELTS to apply for a student visa?',
    a: 'It depends on the country and university. For the UK, IELTS (typically 5.5–6.5) is usually required by the university to issue a CAS letter, though some universities offer pre-sessional English courses. For Romania and Cyprus, most universities accept a Medium of Instruction (MOI) letter in place of IELTS. For Finland and France, requirements vary by programme. During your free profile assessment, we will tell you exactly what is needed for your chosen destination.',
  },
  {
    q: 'How much does it cost to use ACC Consultants?',
    a: 'Your initial profile assessment and consultation are completely free of charge. Our service fee is only charged once you decide to proceed with an application, and all fees are disclosed upfront — no hidden charges. The fee varies by destination and service package. Contact us via WhatsApp or the booking form for a detailed breakdown.',
  },
  {
    q: 'What is the minimum academic requirement to study abroad?',
    a: "Requirements vary by country, university, and programme level. Generally, for undergraduate admission you need at least Intermediate / A-Level qualifications (or equivalent), and for postgraduate you need a completed Bachelor's degree. Some European destinations like Romania and Cyprus are more flexible with grade requirements compared to the UK. We assess your individual profile honestly and only recommend routes where you have a genuine chance of success.",
  },
  {
    q: 'How long does the entire process take — from consultation to visa?',
    a: 'Timelines vary by destination. As a general guide: Cyprus and Romania typically take 3–5 months from initial consultation to visa grant. France (Campus France) takes around 3–4 months. Finland takes 4–6 months depending on the Migri (immigration authority) queue. The UK can take 2–4 months depending on CAS issuance and appointment availability. We always advise starting as early as possible to avoid missing intake deadlines.',
  },
  {
    q: 'Can I work while studying abroad?',
    a: 'Yes, most of our study destinations allow part-time work during studies. UK students can work up to 20 hours/week during term time. Romania allows up to 4 hours/day during semester. Finland permits 25 hours/week. France allows up to 964 hours per year (approximately 20 hours/week). Cyprus typically allows part-time work with a work permit linked to the student permit. Full details are provided during your country-specific consultation.',
  },
  {
    q: 'What documents do I need to start my application?',
    a: "To begin, you typically need: a valid passport (at least 18 months validity), your academic certificates and transcripts (Matric, Intermediate, or Bachelor's), English language proof (IELTS, MOI letter, or equivalent), and a recent bank statement from your sponsor. Additional documents like HEC attestation, police clearance, and a Statement of Purpose (SOP) are prepared with our guidance as the process progresses. We provide a full personalised checklist at the start of your application.",
  },
  {
    q: 'What happens if my visa is refused?',
    a: 'We maintain a 95%+ visa success rate by only submitting applications when the profile and documents are strong. In the rare event of a refusal, we review the refusal letter, identify the grounds, and advise on whether to appeal, reapply, or consider an alternative destination. Our team does not abandon students after a refusal — we work with you to find the best path forward.',
  },
]

/* ---------------- Reveal-on-scroll hook ---------------- */

/* ---------------- Counter ---------------- */

function Counter({ target, suffix }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true
            const duration = 1200
            const increment = target / (duration / 16)
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setValue(Math.floor(current))
            }, 16)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span className="counter" ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/* ---------------- Header ---------------- */

function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)

  // Scroll-shrink effect
  useEffect(() => {
    const onScroll = () => {
      const h = document.getElementById('bbc-header')
      if (!h) return
      if (window.scrollY > 50) h.classList.add('scrolled')
      else h.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeNav = () => {
    setNavOpen(false)
    setDestOpen(false)
  }

  return (
    <header id="bbc-header">
      <a href="#home" className="bbc-logo" onClick={closeNav}>
        <img src="/acc-logo.png" alt="ACC Consultants — Adaptive Career Counseling" />
      </a>

      <ul className={`bbc-nav${navOpen ? ' open' : ''}`} id="bbc-nav">
        <li>
          <a href="#home" onClick={closeNav}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={closeNav}>
            About Us
          </a>
        </li>
        <li className={`bbc-has-dropdown${destOpen ? ' open' : ''}`} id="bbc-dest">
          <span
            className="bbc-dropbtn"
            onClick={() => {
              if (window.innerWidth <= 900) setDestOpen((o) => !o)
            }}
          >
            Destinations <span className="bbc-arrow">&#9660;</span>
          </span>
          <ul className="bbc-dropdown-menu">
            <li>
              <a href="#destinations" onClick={closeNav}>
                UK
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={closeNav}>
                Romania
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={closeNav}>
                Finland
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={closeNav}>
                France
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={closeNav}>
                Cyprus
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#book" onClick={closeNav}>
            Contact Us
          </a>
        </li>
        <li className="bbc-cta-mobile">
          <a href="#book" onClick={closeNav}>
            Free Assessment
          </a>
        </li>
      </ul>

      <div className="bbc-cta">
        <MagneticButton as="a" href="#book" strength={0.28}>
          Free Assessment
        </MagneticButton>
      </div>
      <button
        className="bbc-toggle"
        id="bbc-toggle"
        aria-label="Open menu"
        onClick={() => setNavOpen((o) => !o)}
      >
        &#9776;
      </button>
    </header>
  )
}

/* ---------------- Hero ---------------- */

function Hero() {
  // `furthest` is the highest slide reached so far: backgrounds are only fetched
  // up to one slide ahead, so the first paint pulls two images instead of seven.
  const [{ index, furthest }, setSlide] = useState({ index: 0, furthest: 0 })

  const goTo = (i) => setSlide((s) => ({ index: i, furthest: Math.max(s.furthest, i) }))

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => {
        const next = (s.index + 1) % SLIDES.length
        return { index: next, furthest: Math.max(s.furthest, next) }
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="hero-slider">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`slide${i === index ? ' active' : ''}`}
          style={i <= furthest + 1 ? { backgroundImage: `url(${slide.bg})` } : undefined}
        >
          {/* HeroReveal owns .slide-content: it splits the h1 into words and
              runs the 3D stagger, then the body and CTAs. `slideKey` makes it
              replay for each slide. */}
          {i === index && (
            <HeroReveal slideKey={i} tag={slide.tag} title={slide.h1}>
              <p data-hero="body">{slide.p}</p>
              <div className="hero-cta-row" data-hero="cta">
                <MagneticButton
                  as="a"
                  href={slide.primary.href}
                  className="btn-primary"
                  style={{ fontSize: '1.05rem', padding: '14px 32px' }}
                >
                  {slide.primary.text}
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={slide.secondary.href}
                  target={slide.secondary.external ? '_blank' : undefined}
                  rel={slide.secondary.external ? 'noreferrer' : undefined}
                  className="btn-hero-ghost"
                >
                  {slide.secondary.text}
                </MagneticButton>
              </div>
            </HeroReveal>
          )}
        </div>
      ))}
      <div className="slider-controls">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`dot${i === index ? ' active' : ''}`}
            onClick={() => goTo(i)}
          ></div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */

function Faq() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="faq-section" style={{ backgroundColor: 'var(--bg-light)' }}>
      <ScrollReveal as="div" className="section-title">Frequently Asked Questions</ScrollReveal>
      <ScrollReveal as="p" className="section-subtitle">
        Everything you need to know about studying abroad with ACC Consultants — answered by our
        admissions specialists.
      </ScrollReveal>
      <div className="faq-container">
        {FAQS.map((item, i) => (
          <div key={i} className={`faq-item reveal${open === i ? ' active' : ''}`}>
            <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              <h3>{item.q}</h3>
              <div className="faq-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <div className="faq-answer" style={{ maxHeight: open === i ? '600px' : '0' }}>
              <div className="faq-answer-content">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Scroll progress + floating actions ---------------- */

function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = bar.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.transform = `scaleX(${ratio})`
    }
    const onScroll = () => {
      // rAF-throttled: the handler runs at most once per frame
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}

function FloatingActions() {
  const topBtn = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = topBtn.current
      if (!el) return
      el.classList.toggle('fab-hidden', window.scrollY < 600)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="floating-actions">
      <a
        className="fab-whatsapp"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <button
        className="fab-top fab-hidden"
        ref={topBtn}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  )
}

/* ---------------- App ---------------- */

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />

        {/* Stats */}
        <div className="info-bar" id="stats">
          {STATS.map((s, i) => (
            <div className="info-item" key={i}>
              <div className="counter-box">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <section id="about">
          <ScrollReveal as="div" className="section-title">About ACC Consultants</ScrollReveal>
          <div className="about-container">
            <ScrollReveal as="div" className="about-text">
              <h3>Adaptive Career Counseling, Unlimited Potential.</h3>
              <p>
                At <strong>ACC Consultants</strong>, we specialize in providing tailored study
                abroad solutions for students determined to pursue higher education at world-class
                institutions. With over a decade of expertise, our team ensures a smooth,
                transparent, and stress-free admissions journey.
              </p>
              <p>
                Whether you're aiming for a prestigious UK university, an affordable European degree
                in Finland or France, or a quality English-taught programme in Cyprus or Romania —
                we are your trusted partners every step of the way.
              </p>
              <div className="about-actions">
                <a href="#destinations" className="btn-primary">
                  View Study Destinations
                </a>
                <a href="#about" className="btn-outline btn-outline-brand">
                  Our Story
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal as="div" className="about-image">
              <img src="/about-team.jpg" alt="ACC Consultants advisors in a student counselling session" width="1200" height="800" />
            </ScrollReveal>
          </div>

          <ScrollReveal as="div" className="section-title" style={{ marginTop: '100px' }}>
            Why Choose Us?
          </ScrollReveal>
          {/* stagger => the wrapper animates its direct children one after another */}
          <ScrollReveal as="div" className="features-grid" stagger={0.1}>
            {FEATURES.map((f, i) => (
              <HoverCard className="feature-item" key={i}>
                <i className={f.icon}></i>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </HoverCard>
            ))}
          </ScrollReveal>
        </section>

        {/* Destinations */}
        <section id="destinations" style={{ backgroundColor: 'white' }}>
          <ScrollReveal as="div" className="section-title">Study Destinations</ScrollReveal>
          <ScrollReveal as="div" className="destinations-grid" stagger={0.08}>
            {DESTINATIONS.map((d, i) => (
              <HoverCard className="dest-card" key={i}>
                <div className="dest-flag">
                  <img src={d.flag} alt={`${d.name} Flag`} />
                </div>
                <div className="dest-content">
                  <h3>{d.name}</h3>
                  <p>
                    <strong>{d.why}</strong>
                    {d.text}
                  </p>
                  <a
                    href="#book"
                    className="btn-primary"
                    style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                  >
                    Learn More
                  </a>
                </div>
              </HoverCard>
            ))}
          </ScrollReveal>
        </section>

        {/* Process */}
        <section id="process" className="process-section">
          <ScrollReveal as="div" className="section-title">How It Works</ScrollReveal>
          <ScrollReveal as="p" className="section-subtitle">
            From your first enquiry to your first day of class — we manage every step of your study
            abroad journey in 5 simple stages.
          </ScrollReveal>
          <ScrollReveal as="div" className="process-steps" stagger={0.1}>
            {PROCESS.map((step, i) => (
              <div className="process-step" key={i}>
                <div className="process-step-icon">
                  <span className="process-step-num">{i + 1}</span>
                  <i className={step.icon}></i>
                </div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </ScrollReveal>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="testimonials-section">
          <ScrollReveal as="div" className="section-title">Student Success Stories</ScrollReveal>
          <ScrollReveal as="p" className="section-subtitle">
            Real students, real visas, real results. Here's what our students say about their ACC
            Consultants experience.
          </ScrollReveal>
          <ScrollReveal as="div" className="testimonials-grid" stagger={0.07}>
            {TESTIMONIALS.map((t, i) => (
              <HoverCard className="testimonial-card" key={i}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, s) => (
                    <i className="fa-solid fa-star" key={s}></i>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-photo-placeholder">
                    {t.name.charAt(0)}
                  </div>
                  <div className="testimonial-info">
                    <h4>{t.name}</h4>
                    <p>{t.course}</p>
                    <span className="testimonial-visa-badge">
                      <i className="fa-solid fa-check-circle"></i> {t.badge}
                    </span>
                  </div>
                </div>
              </HoverCard>
            ))}
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <Faq />

        {/* Booking */}
        <section id="book" className="booking-section">
          <ScrollReveal as="div" className="section-title">Book Your Free Consultation</ScrollReveal>
          <ScrollReveal as="p" className="section-subtitle">
            Call us, message us on WhatsApp, or visit our Gujranwala office — your first consultation is free.
          </ScrollReveal>
          <ScrollReveal as="div" className="contact-strip" stagger={0.1}>
            <a className="contact-chip" href={`tel:${PHONE_PRIMARY.tel}`}>
              <i className="fa-solid fa-phone"></i>
              <span>
                <small>Call us</small>
                <strong>{PHONE_PRIMARY.display}</strong>
              </span>
            </a>
            <a className="contact-chip" href={`tel:${PHONE_SECONDARY.tel}`}>
              <i className="fa-solid fa-phone"></i>
              <span>
                <small>Call us</small>
                <strong>{PHONE_SECONDARY.display}</strong>
              </span>
            </a>
            <a className="contact-chip" href={WHATSAPP} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
              <span>
                <small>WhatsApp</small>
                <strong>{WHATSAPP_PHONE.display}</strong>
              </span>
            </a>
            <div className="contact-chip contact-chip-static">
              <i className="fa-solid fa-location-dot"></i>
              <span>
                <small>Visit us</small>
                <strong>{ADDRESS}</strong>
              </span>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <ScrollReveal as="h2">Your Study Abroad Journey Starts Here</ScrollReveal>
          <ScrollReveal as="p">
            Speak directly with our university admissions specialists and get a free, honest
            assessment of your profile — no obligations, no hidden fees.
          </ScrollReveal>
          <ScrollReveal as="div" className="cta-actions">
            <MagneticButton
              as="a"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.5rem' }}></i> Message us on
              WhatsApp
            </MagneticButton>
            <MagneticButton as="a" href={`tel:${PHONE_PRIMARY.tel}`} className="btn-primary">
              <i className="fa-solid fa-phone" style={{ fontSize: '1.25rem' }}></i>{' '}
              {PHONE_PRIMARY.display}
            </MagneticButton>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/acc-logo-light.png" alt="ACC Consultants — Adaptive Career Counseling" />
            </div>
            <p>
              Your trusted partner for global immigration, work, and study visas. We turn your
              international dreams into reality.
            </p>
            <div className="social-links">
              {SOCIALS.map((sn) => (
                <a
                  key={sn.label}
                  href={sn.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={sn.label}
                >
                  <i className={sn.icon}></i>
                </a>
              ))}
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#book">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Top Destinations</h4>
            <ul>
              <li>
                <a href="#destinations">United Kingdom</a>
              </li>
              <li>
                <a href="#destinations">Romania</a>
              </li>
              <li>
                <a href="#destinations">Finland</a>
              </li>
              <li>
                <a href="#destinations">France</a>
              </li>
              <li>
                <a href="#destinations">Cyprus</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i> {ADDRESS}
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>{' '}
                <a href={`tel:${PHONE_PRIMARY.tel}`}>{PHONE_PRIMARY.display}</a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>{' '}
                <a href={`tel:${PHONE_SECONDARY.tel}`}>{PHONE_SECONDARY.display}</a>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp"></i>{' '}
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  {WHATSAPP_PHONE.display}
                </a>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ACC Consultants. All Rights Reserved.</p>
        </div>
      </footer>

      <FloatingActions />
    </>
  )
}
