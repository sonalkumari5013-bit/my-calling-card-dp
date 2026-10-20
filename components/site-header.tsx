export function SiteHeader() {
  return (
    <header className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        <span className="text-primary">#</span> conftest.py
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
        Sonal Kumari
      </h1>
      <p className="text-base leading-relaxed text-foreground text-pretty sm:text-lg">
        I build backend systems, and the tests that grade AI coding agents.
      </p>
      <p className="text-sm">
        <a
          href="https://github.com/sonalkumari5013-bit/my-calling-card-dp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View this site&apos;s code on GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
      <ul className="flex flex-col gap-1 text-sm leading-relaxed sm:text-base">
        <li>
          <span className="text-muted-foreground">role[0] =</span> Software Engineer II at American
          Express
        </li>
        <li>
          <span className="text-muted-foreground">role[1] =</span> AI Trainer (Software Engineering
          Expert) in the Handshake AI Fellowship
        </li>
      </ul>
      <nav aria-label="Contact" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a
          href="mailto:sonalkumari5013@gmail.com"
          className="break-all text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          sonalkumari5013@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/sonalkri/"
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          linkedin.com/in/sonalkri
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
    </header>
  )
}
