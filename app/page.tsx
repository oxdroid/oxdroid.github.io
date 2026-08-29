'use client'

import { useState } from 'react'

const services = [
  { number: '01', title: 'Static analysis', text: 'We inspect binaries, source, dependencies, and configurations for weaknesses before they reach production.' },
  { number: '02', title: 'Reverse engineering', text: 'Our researchers trace sensitive flows and decode the decisions your app makes under the hood.' },
  { number: '03', title: 'Dynamic testing', text: 'Real devices. Real traffic. Real abuse cases. We test what your users and attackers can actually reach.' },
]

const plans = [
  { name: 'Signal', price: '$4.9k', note: 'For focused validation', items: ['One iOS or Android app', '5-day assessment', 'Executive readout', 'Prioritized findings'], featured: false },
  { name: 'Deep dive', price: '$9.8k', note: 'For production releases', items: ['iOS + Android scope', '10-day assessment', 'Full technical report', 'Retest included'], featured: true },
  { name: 'Continuum', price: 'Custom', note: 'For teams shipping often', items: ['Quarterly assessments', 'Release gate support', 'Dedicated researcher', 'Live remediation room'], featured: false },
]

// ─── Rate-limit helpers (client-side, localStorage) ─────────────────────────
const RATE_LIMIT_KEY = 'oxd_form_submissions'
const RATE_LIMIT_MAX = 3          // max submissions
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in ms

function getRateEntries(): number[] {
  try {
    return JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) ?? '[]')
  } catch {
    return []
  }
}

function isRateLimited(): boolean {
  const now = Date.now()
  const entries = getRateEntries().filter((t) => now - t < RATE_LIMIT_WINDOW)
  return entries.length >= RATE_LIMIT_MAX
}

function recordSubmission() {
  const now = Date.now()
  const entries = getRateEntries()
    .filter((t) => now - t < RATE_LIMIT_WINDOW)
    .concat(now)
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(entries))
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  // Timestamp set when modal opens — used to detect instant (bot) submissions
  const [formOpenedAt, setFormOpenedAt] = useState<number>(0)

  function openModal() {
    setFormOpenedAt(Date.now())
    setFormError('')
    setModalOpen(true)
  }

  async function submitAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    // ── 1. Honeypot check — bots fill hidden fields, humans don't ────────────
    const honeypot = formData.get('_honey') as string
    if (honeypot && honeypot.trim() !== '') {
      // Silently pretend success to fool bots
      setSubmitted(true)
      return
    }

    // ── 2. Timing gate — reject if form submitted in < 3 seconds ─────────────
    const elapsed = Date.now() - formOpenedAt
    if (elapsed < 3000) {
      setFormError('Please take a moment to review your message before sending.')
      return
    }

    // ── 3. Client-side rate limit — max 3 per hour ───────────────────────────
    if (isRateLimited()) {
      setFormError('Too many requests. Please try again in an hour, or email us directly at support@oxdroid.io.')
      return
    }

    setLoading(true)

    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    try {
      const res = await fetch('https://formsubmit.co/ajax/support@oxdroid.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Security Audit Request from ${name}`,
          _template: 'table',
          _captcha: 'false',     // disable FormSubmit's own captcha page
          _honey: '',            // FormSubmit's server-side honeypot
        }),
      })

      if (res.ok) {
        recordSubmission()
        setSubmitted(true)
      } else {
        recordSubmission()
        window.location.href = `mailto:support@oxdroid.io?subject=Security Audit Request from ${encodeURIComponent(String(name))}&body=Name: ${encodeURIComponent(String(name))}%0D%0AEmail: ${encodeURIComponent(String(email))}%0D%0AMessage: ${encodeURIComponent(String(message))}`
        setSubmitted(true)
      }
    } catch {
      window.location.href = `mailto:support@oxdroid.io?subject=Security Audit Request from ${encodeURIComponent(String(name))}&body=Name: ${encodeURIComponent(String(name))}%0D%0AEmail: ${encodeURIComponent(String(email))}%0D%0AMessage: ${encodeURIComponent(String(message))}`
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="oxdroid home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <img src="/apple-icon.png" alt="oxdroid mascot" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span><span className="brand-mark">ox</span>droid<span className="brand-dot">.</span></span>
        </a>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#scope" onClick={() => setMenuOpen(false)}>What we test</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="/blogs" onClick={() => setMenuOpen(false)}>Notes from the lab</a>
        </nav>
        <button className="nav-cta" onClick={openModal}>Request an audit <span>↗</span></button>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
      </header>

      <section className="hero grid-bg" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Mobile security for what&apos;s next.</p>
          <h1>Find what your mobile app<br /><em>is missing.</em></h1>
          <p className="hero-lede">oxdroid is the independent security lab for mobile teams. We turn complex iOS and Android apps into clear, fixable decisions.</p>
          <div className="hero-actions"><button className="button button-lime" onClick={openModal}>Start a conversation <span>↗</span></button><a className="text-link" href="#approach">Explore our approach <span>↓</span></a></div>
        </div>
        <div className="hero-diagram ascii-mascot" aria-label="Animated ASCII art of the oxdroid mascot" role="img">
          <div className="diagram-label">OX / 2026 // FIELD_NOTE_01</div>
          <pre className="mascot-art" aria-hidden="true">{`@@@@@%@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@%@@@@@@@@@@@@@@@@@@@%@@%#***#%%@@@@@@@@@@@%@@@@@@@@@@@@@@@
%@@@@@@@@@@@@@@@@@@@%@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#-      .-%@@@@@@@@@@@@@@@@@@@@@@@@@@
%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@%@@%@@@@@#: .:::::.  %@@@@@@@@@%@@@@@@@@@@@@@@%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@%- .:::::.  *@@@@@@@@@@@@@@@@@%@@@%@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@%@@@@@@@@@@@@@@@@@@@%=     .   +%@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%@@@@%@@@%%+-:................................. ..     ..:::...::-=#%%@@@%@@@@@@@@@@
@@@%@@@@@@@@@@@@@@@@%#=.  ...:::::::::::::::::::..            ..  .:::::::::::::..   :*%@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@%*.  -+#################*=-:.      .......      ..-=+*##########**=. .=%@@%@@@@@%
@@@@@@@@@@@@@@@@@%-  -################*-.    :=##%%%%%%%%%%%%%%%%#+-.    :+###########*. :#%@@@@@@@
@@@@@@@@@@@%@@@@%-  *####*****####*+:  .:+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*-.  .-*########*- .#@@@@@@@
@@@@@@@@@@@@@@@%+  +#####*****##*:  .=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*-  .=*######*: -%@@@@@@
@@@@@@@@@@%@@@@%- .*##########+.  -#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*.  -*#####=  %@@@@@@
@@@@@@@@@@@@@@%%- .*########*:  =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#:  -*###=  %@@@@@@
@@@@@@@@@@@@@@@%- .*#######-  -#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*:  =##=  %@@@@@@
@@@@@@@@@@@@@@@%- .****##*. .*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=  :*=  %@@@@@@
@@@@@@@@@@%%##*+: .-====-.  =++++++**#%%%%%%%%%%%%%%%%%%%####%%%%%%%%%%%%%%%%%%%%%%%%#. :-  %@@@@@%
@@@@@@@%%+:                            .=#%%%%%%%%%%#+:  .::=%%%%%%%%%%%%%%%%%%%%%%%%%%:    %@@@@@@
@@@@@@@+   .::......:::::::::::::::::::   =%%%%%%%+.  =#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#:   %@@@@@%
@@@@@%=  .::......      :::::::::::::::::  =%%%%%%=-%%#*=--=#%%@@%%%%%%%%%%%%%%%%%%%%%%%*.  %@@@@@@
@@@@%*  .::............   :::::::::::::::.  *%%%%%%%+.        :*%@%%%%%%%%%%%%%%%%%%%%%%%=  %@@@@@@
@@@@%-  ::...:....::::::   :::::::::::::::  *%%%%%%-  %%%-...   *%@%%%%%%%%%%%%%%%%%%%%%%*. +@@@@@@
@@%@@:  ::...:....::::::.  :::::::::.:::::  +%%%%%*. :=*=::...  :%@%%%%%%%%%%%%%%%%%%%%%%%- .%@@%@@
@@@@%-  ::...:....::::::   ::::::::::::::.  *%%%%%#: .:::::...  -%@%%%%%%%%%%%%%%%%%%%%%%%=  #@@@@@
@@@@%*  .:....:.....:::.  :::::::::::::::.  *%%%%%%=  .......  .#%%%%%%%%%%%%%%%%%%%%%%%%%+. *@@@@@
@@@@@@=  .:..........    :::::::::::::::.  +%%%%%%%%%:       .=%@@%%%%%%%%%%%%%%%%%%%%%%%%#. =%@@@@
@@@@@@@+.  ............:::::::::::::::..  =#*+++*%%%%%%%*++*%%@%%%%%%%%%%%%%%%%%%%%%%%%%%%#. =@@@@@
@@@@@@@%%*:                             =#%#=---*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: -@@@@@
@@@%@@@@@@%@%#+-.  .  .:::::.   ::--=*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: -%@@@@
@@@@@@@@@@@@@@@%-    :%%%%%%%*: -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: -%@@@@
@@@@@@@@@@%@@%@%-   .%%%%%%%%%- .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: :%@@@@
@@@@@@@@@@@@@@@%-   :%%%%%%%%*-.=%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: -%@@@@
@@@@@@@@@@@@@@@%-   .%%%%%%%*+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: -%@@@@
@@@@@@@@@@@@@@@%-   .%%%%%%%%%- .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%: :%@@@@
@@@@@@@%@@@@@@@%-    *%%%%%*=*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#. =@@@@@
@@@@@@@@@@@@@%@%- .. .*%%%%=+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*. +%@@@%
@@@@@@@@@@@@@@%%- .+: .=%%*=+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=  #@@@@@
@@@@@@@@@@@@@@@%- .++=.  :-=*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-  %@@@@@
@@@@@@@@%@@@@@@%- .+++++:   =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*. =@@@@@@
@@@@@@@@@@@@@@@%- .+++++++  -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-  %@@@@@@
@@@@@@@@@@@@@@@%- .+++++++. :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#=.   ..:-==+++=-::.  =%%%%%%%%%%%*.  %@@@@@@
@@@@@@@@@@@@@@@%- .+++++++=  =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+.  #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#:    %@%@@@@
@@@@@@@@@@@@@@@%- .+++++*##- .*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#:    %@@@@@@
@@@@@@@@@@@@@@@%=  +++++*##*: .*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*. .. .%@@@@@@
@@@@@@@@@@@@@@@%*. :+++++*##*-  -#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#-  :=. +@@@@@@@
@@@@@@@@@@@@@@@@%+. -+++++++++=.  -*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*-  .==. -%@@@@@@@
@@@@%@@@@@@@@@@@@%*  .=+++++++++=:  .-*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#=.  :=+:  -%%@@@@@@@
@@@@@@@@@@@@@@@@%%@%=   -++++++++++=   ::-+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+.   -+=.  .#%@@@@%@@@@
@@@@@@@@@@@@@@@@@@@@%%*:.   ........  .*+--:::::-==+*+********######%%%%%%%#:  .    .=%@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@%%#*+========.  *%%%##**++=:          -*####%%%%%%*: .==+*#%%@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@%@@%=  .=#%%%%#=.  =%@@@@@%.  =#%%%%%%#:  -%@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@%+:.      .:+%@@@@@%@@%#-.        .-#%@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@%@%@@@@@%%%####%%@%@@@@@@@@@@@%%%#****#%%@@@@@@@@@@@@@@@@%@@@@@@@@@@
@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@%@@%@@%@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@`}</pre>
          <span className="ascii-callout callout-left">AUDIT / ACTIVE</span>
          <span className="ascii-callout callout-right">ANDROID + IOS</span>
          <div className="ascii-baseline"><span>REAL DEVICES / REAL TRAFFIC</span><span>01 / 04</span></div>
        </div>
        <div className="hero-meta"><span>Trusted by teams building<br />the next essential app.</span><span>Scroll to inspect <b>↓</b></span></div>
      </section>

      <section className="statement section-pad"><p className="section-kicker">Mobile security for what&apos;s next</p><h2>Your app is a <span>front door.</span><br />We check the locks.</h2><div className="statement-bottom"><p>Security isn&apos;t a checklist you complete once. We help you find what your mobile app is missing before attackers do.</p><span className="big-index">01—</span></div></section>

      <section className="approach section-pad dark-section" id="approach"><div className="section-heading"><p className="section-kicker lime-text">How we work</p><h2>Evidence over<br /><span>assumptions.</span></h2><p className="heading-note">Every finding comes with a proof, a path, and a practical next step. No theater. No mystery.</p></div><div className="service-list">{services.map((service) => <article className="service-item" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><span className="arrow">↗</span></article>)}</div></section>

      <section className="scope section-pad" id="scope"><div className="scope-intro"><p className="section-kicker">Built for mobile reality</p><h2>One audit.<br /><span>Clear signal.</span></h2><p>We map your app against OWASP MASVS and the Mobile Top 10, then go further where your product is unique.</p></div><div className="scope-grid"><div className="scope-card featured-scope"><span className="card-label">01 / COVERAGE</span><strong>iOS<br /><span>&</span> Android</strong><span className="card-line">Native, hybrid, and cross-platform</span></div><div className="scope-card"><span className="card-label">02 / OUTPUT</span><strong>Findings<br />that land.</strong><span className="card-line">Severity, evidence, reproduction, fix.</span></div><div className="scope-card scope-note"><span className="card-label">03 / STANDARD</span><strong>MASVS<br />ALIGNED</strong><span className="card-line">A rigorous baseline. Not a ceiling.</span></div></div></section>

      <section className="pricing section-pad dark-section" id="pricing"><div className="pricing-top"><div><p className="section-kicker lime-text">Choose your depth</p><h2>Security that<br /><span>fits the sprint.</span></h2></div><p>Start small, go deep, or keep us in the room. Every engagement is tailored to your release and risk profile.</p></div><div className="plans">{plans.map((plan) => <article className={plan.featured ? 'plan plan-featured' : 'plan'} key={plan.name}><div className="plan-head"><span>{plan.name}</span>{plan.featured && <b>Most requested</b>}</div><strong>{plan.price}</strong><small>{plan.note}</small><ul>{plan.items.map((item) => <li key={item}>+ {item}</li>)}</ul><button className="plan-link" onClick={openModal}>Discuss scope <span>↗</span></button></article>)}</div></section>

      <footer className="footer"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">ox</span>droid<span className="brand-dot">.</span></a><p>Mobile security for<br />what&apos;s next.</p></div><div className="footer-links"><div><span>Explore</span><a href="#approach">Approach</a><a href="#scope">Scope</a><a href="#pricing">Pricing</a><a href="/blogs">Journal</a></div><div><span>Say hello</span><a href="mailto:support@oxdroid.io">support@oxdroid.io</a><a href="https://github.com/oxdroid" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/company/oxdroid" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://twitter.com/oxdroid" target="_blank" rel="noreferrer">Twitter ↗</a></div></div><div className="footer-bottom"><span>© 2026 oxdroid security lab</span><span>Built for the brave.</span></div></footer>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setModalOpen(false); setFormError('') } }}><div className="audit-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" aria-label="Close request form" onClick={() => { setModalOpen(false); setFormError('') }}>×</button>{submitted ? <div className="success-state"><span className="success-mark">✓</span><p className="section-kicker lime-text">Message received</p><h2>Let&apos;s make<br />it <span>harder.</span></h2><p>We&apos;ll be in touch shortly to understand your app, your release, and where you need signal most.</p><button className="button button-lime" onClick={() => { setModalOpen(false); setSubmitted(false); setFormError('') }}>Back to site</button></div> : <><p className="section-kicker lime-text">Start a conversation</p><h2 id="modal-title">Request an<br /><span>audit.</span></h2><form onSubmit={submitAudit}>{/* Honeypot — hidden from humans, bots fill it automatically */}<input type="text" name="_honey" defaultValue="" aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} /><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Tell us about the app<textarea required name="message" placeholder="What are you building?" rows={3} /></label>{formError && <p role="alert" style={{ color: '#c0392b', fontFamily: 'var(--font-mono)', fontSize: '11px', margin: '0', lineHeight: '1.5' }}>{formError}</p>}<button className="button button-lime" type="submit" disabled={loading}>{loading ? 'Sending request...' : <>Send request <span>↗</span></>}</button></form></>}</div></div>}
    </main>
  )
}
