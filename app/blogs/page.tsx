export interface BlogPost {
  type: string
  date: string
  title: string
  excerpt: string
  image: string
  alt: string
  source: string
  href: string
}

/**
 * Format template for future blog posts:
 * 
 * {
 *   type: 'ANDROID / CASE STUDY',
 *   date: 'OXDROID / 2026',
 *   title: 'When any app could log you out: an exported Activity in Basecamp',
 *   excerpt: 'An unprotected StartActivity let any installed Android app force a Basecamp session to terminate.',
 *   image: '/images/placeholder.svg',
 *   alt: 'Security research preview',
 *   source: 'oxdroid research note',
 *   href: '#',
 * }
 */
export const posts: BlogPost[] = []

export default function BlogsPage() {
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
          <a href="/#pricing">Pricing</a>
          <a href="/blogs" aria-current="page">Notes from the lab</a>
        </nav>
        <a className="nav-cta" href="/#top">Request an audit <span>↗</span></a>
      </header>

      <section className="blog-hero grid-bg">
        <div>
          <p className="eyebrow"><span className="status-dot" /> Mobile security for what&apos;s next</p>
          <h1>Notes from<br /><em>the lab.</em></h1>
          <p className="hero-lede">Public mobile security writeups, practical research, and the small implementation details that decide whether an app holds up under pressure.</p>
        </div>
        <div className="blog-hero-meta">
          <span>COMING SOON<br />iOS + Android</span>
          <span>Status<br />In Preparation</span>
        </div>
      </section>

      <section className="blogs-page section-pad" aria-labelledby="all-notes-title">
        <div className="journal-top">
          <div>
            <p className="section-kicker">Research archive</p>
            <h2 id="all-notes-title">Read the<br /><span>writeups.</span></h2>
          </div>
          <a className="text-link" href="/#approach">Explore approach <span>↗</span></a>
        </div>

        {posts.length > 0 ? (
          <div className="posts">
            {posts.map((post) => (
              <article className="post-card" key={post.title}>
                <img src={post.image} alt={post.alt} />
                <div className="post-copy">
                  <div className="post-meta">
                    <span className="post-type">{post.type}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href={post.href} target={post.href.startsWith('http') ? '_blank' : undefined} rel={post.href.startsWith('http') ? 'noreferrer' : undefined}>
                    Read writeup ↗
                  </a>
                  <small>Source: {post.source}</small>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: '55px', background: '#e3e2dc', padding: '50px 40px', borderLeft: '4px solid #8bad18' }}>
            <span className="section-kicker" style={{ color: '#8bad18', display: 'block', marginBottom: '14px' }}>
              ● COMING SOON // IN PREPARATION
            </span>
            <h3 style={{ fontSize: 'clamp(26px, 4vw, 40px)', letterSpacing: '-0.05em', lineHeight: 1.1, margin: '0 0 16px', color: 'var(--ink)' }}>
              Research writeups and field notes are on the way.
            </h3>
            <p style={{ color: '#6e706a', fontSize: '15px', maxWidth: '640px', margin: '0 0 28px', lineHeight: 1.6 }}>
              Our security researchers are preparing practical writeups, reverse engineering case studies, and mobile threat analysis. Check back soon or reach out directly to audit your app.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="button button-lime" href="/#approach">
                Explore our approach <span>→</span>
              </a>
              <a className="text-link" href="/">
                Return to homepage <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <a className="brand" href="/"><span className="brand-mark">ox</span>droid<span className="brand-dot">.</span></a>
          <p>Mobile security for<br />what&apos;s next.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <a href="/#approach">Approach</a>
            <a href="/#scope">Scope</a>
            <a href="/#pricing">Pricing</a>
          </div>
          <div>
            <span>Say hello</span>
            <a href="mailto:hello@oxdroid.security">hello@oxdroid.security</a>
            <a href="https://github.com/oxdroid" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/company/oxdroid" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://twitter.com/oxdroid" target="_blank" rel="noreferrer">Twitter ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 oxdroid security lab</span>
          <span>Built for the brave.</span>
        </div>
      </footer>
    </main>
  )
}
