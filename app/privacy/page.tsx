import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | oxdroid',
  description: 'How oxdroid collects, uses, protects, and retains personal data — aligned with ISO/IEC 27001:2022 and ISO/IEC 27701 privacy information management principles.',
}

const updated = 'September 8, 2026'

const sections: { title: string; body: string[] }[] = [
  {
    title: '1. Who we are',
    body: [
      'oxdroid ("oxdroid", "we", "us") operates an autonomous mobile-application security platform and this public website at oxdroid.io. For the personal data described in this policy, oxdroid is the data controller. You can reach us at support@oxdroid.io for any privacy matter.',
    ],
  },
  {
    title: '2. Our privacy and security commitments',
    body: [
      'Our security management practices are aligned with ISO/IEC 27001:2022 (information security management) and we manage personal data in line with the privacy principles of ISO/IEC 27701 — purpose limitation, data minimisation, transparency, and accountability. Where we process personal data of individuals in the EU/UK, we do so in accordance with the UK/EU General Data Protection Regulation (GDPR).',
      'In plain terms: we collect as little as possible, we use it only for the purpose you gave it to us for, we say so plainly, and we protect it with the same controls we recommend to our customers.',
    ],
  },
  {
    title: '3. What we collect',
    body: [
      'Contact data you give us: when you request an audit, join the early-access list, or email us, we receive the name, work email, and message you provide. The website contact and waitlist forms are delivered by FormSubmit (formsubmit.co) as a processor; submissions are forwarded to our team mailbox at support@oxdroid.io.',
      'Customer platform data: the oxdroid platform is deployed on YOUR infrastructure (self-hosted engine). Application binaries you scan, decompiled source, scan findings, screenshots, and traffic captures remain inside your environment and under your control. They are not uploaded to oxdroid and never appear on this website.',
      'Credentials: large-language-model API keys used by the platform are supplied by you (BYOK), stored encrypted-at-rest in your deployment, and are never transmitted to us.',
      'Technical data: like most websites, our hosting provider (GitHub Pages) processes standard request logs (IP address, user agent, requested URL) for security and availability. We do not run advertising trackers or sell traffic data.',
    ],
  },
  {
    title: '4. Why we use it (lawful basis)',
    body: [
      'To respond to your audit request or early-access signup — performance of a contract or steps prior to it (GDPR Art. 6(1)(b)).',
      'To operate and secure our website and services — our legitimate interests (Art. 6(1)(f)); request logs are kept by our hosting provider for abuse detection and availability.',
      'To send you the onboarding email you asked for — consent (Art. 6(1)(a)). You can withdraw it at any time by emailing support@oxdroid.io; the only email the waitlist generates is the onboarding contact.',
    ],
  },
  {
    title: '5. What we do NOT do',
    body: [
      'We do not sell, rent, or trade personal data.',
      'We do not use your contact data for unrelated marketing profiles or enrichment services.',
      'We do not view, export, or analyze the contents of your scan environments; customer scan data never leaves your infrastructure.',
    ],
  },
  {
    title: '6. Sharing and processors',
    body: [
      'We share personal data only with: (a) FormSubmit, which relays website form submissions to our mailbox; (b) GitHub, which hosts this website and its request logs; (c) our email provider, which stores our team mailbox. Each processes data on our instructions. A current, maintained list of processors with their roles is available on request.',
      'We may disclose data where required by law, and only after verifying the request.',
    ],
  },
  {
    title: '7. International transfers',
    body: [
      'Our website hosting and form relay may process data outside your country. Where personal data of EU/UK individuals is transferred internationally, we rely on the applicable transfer safeguards (such as the EU Standard Contractual Clauses offered by the processor) and we keep the transfer minimal.',
    ],
  },
  {
    title: '8. Retention',
    body: [
      'Contact submissions are kept in our team mailbox for up to 24 months, then deleted, unless an ongoing engagement requires us to keep them longer (in which case they move into that engagement contract). Waitlist emails are deleted when the early-access program closes or on your request. Hosting request logs are retained by GitHub Pages under their standard retention.',
    ],
  },
  {
    title: '9. Security controls',
    body: [
      'We apply controls consistent with ISO/IEC 27001 Annex A practices to the systems we operate: least-privilege access with multi-factor authentication on code, mail, and infrastructure accounts; encrypted transport (TLS) for this website and all APIs; container isolation and capability dropping in the product; secrets separation (customer keys never leave customer deployments); and audit logging of administrative actions.',
      'No system is perfectly secure. If you believe you have found a vulnerability in anything we operate, email support@oxdroid.io with details — we will acknowledge within 5 business days and will not pursue legal action for good-faith research.',
    ],
  },
  {
    title: '10. Your rights',
    body: [
      'You may ask us for access to, correction of, deletion of, or a copy of your personal data; object to or restrict certain processing; and withdraw consent at any time. Email support@oxdroid.io and we will respond within 30 days. If you are in the EU/UK, you may also complain to your local data-protection authority.',
    ],
  },
  {
    title: '11. Children',
    body: [
      'Our services are directed at professionals. We do not knowingly collect data from anyone under 16.',
    ],
  },
  {
    title: '12. Changes to this policy',
    body: [
      `This policy was last updated ${updated}. If we make material changes we will note the update date here, and for significant changes we will announce them on this page before they take effect.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="oxdroid home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <img src="/apple-icon.png" alt="oxdroid mascot" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span><span className="brand-mark">ox</span>droid<span className="brand-dot">.</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/#approach">Approach</a>
          <a href="/#scope">What we test</a>
          <a href="/#early-access">Early access</a>
          <a href="/blogs">Notes from the lab</a>
        </nav>
        <a className="nav-cta" href="/#early-access">Request early access <span>↗</span></a>
      </header>

      <section className="statement section-pad" style={{ padding: '48px 10vw 10px' }}>
        <p className="section-kicker">Legal</p>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.1, margin: '0 0 10px' }}>
          Privacy <span>policy.</span>
        </h1>
        <p className="heading-note">Last updated {updated}. Written to be read, not to hide behind.</p>
      </section>

      <section className="legal section-pad" style={{ paddingTop: '0' }}>
        {sections.map((s) => (
          <article key={s.title} className="legal-item">
            <h2>{s.title}</h2>
            {s.body.map((p, i) => <p key={i}>{p}</p>)}
          </article>
        ))}
        <p className="legal-contact">Questions about anything above? <a href="mailto:support@oxdroid.io">support@oxdroid.io</a></p>
      </section>

      <footer className="footer"><div className="footer-brand"><a className="brand" href="/"><span className="brand-mark">ox</span>droid<span className="brand-dot">.</span></a><p>Mobile security for<br />what&apos;s next.</p></div><div className="footer-links"><div><span>Explore</span><a href="/#approach">Approach</a><a href="/#scope">Scope</a><a href="/#early-access">Early access</a><a href="/privacy">Privacy policy</a><a href="/blogs">Journal</a></div><div><span>Say hello</span><a href="mailto:support@oxdroid.io">support@oxdroid.io</a><a href="https://github.com/oxdroid" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/company/oxdroid" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://twitter.com/oxdroid" target="_blank" rel="noreferrer">Twitter ↗</a></div></div><div className="footer-bottom"><span>© 2026 oxdroid security lab</span><span>Built for the brave.</span></div></footer>
    </main>
  )
}
