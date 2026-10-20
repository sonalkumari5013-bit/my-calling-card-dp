'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, RotateCcw } from 'lucide-react'
import { TESTS, TEST_FILE } from '@/lib/tests-data'

const STEP_MS = 450
const START_DELAY_MS = 600

function percent(index: number) {
  const value = Math.floor(((index + 1) / TESTS.length) * 100)
  return `[${String(value).padStart(3, ' ')}%]`
}

export function TestSession() {
  const [runId, setRunId] = useState(0)
  const [printed, setPrinted] = useState(0)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrinted(TESTS.length)
      return
    }
    setPrinted(0)
    const timers = TESTS.map((_, i) =>
      window.setTimeout(() => setPrinted(i + 1), START_DELAY_MS + i * STEP_MS),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [runId])

  const done = printed === TESTS.length

  function toggle(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function replay() {
    setExpanded(new Set())
    setPrinted(0)
    setRunId((id) => id + 1)
  }

  return (
    <section
      aria-labelledby="session-title"
      className="overflow-hidden rounded-md border border-border bg-card"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
        <h2 id="session-title" className="text-xs text-muted-foreground">
          ~/sonal — pytest
        </h2>
        <span className="text-xs text-muted-foreground" aria-hidden="true">
          {done ? 'exit 0' : 'running…'}
        </span>
      </div>

      <div className="flex flex-col gap-1 p-4 text-sm leading-relaxed [overflow-wrap:anywhere] sm:p-6">
        <p>
          <span className="text-primary">$</span> pytest {TEST_FILE} -v
        </p>
        <p className="text-muted-foreground">
          <span aria-hidden="true">=====</span> test session starts{' '}
          <span aria-hidden="true">=====</span>
        </p>
        <p className="mb-3 text-muted-foreground">collected {TESTS.length} items</p>

        <ol className="flex flex-col gap-1" aria-label="Test results">
          {TESTS.slice(0, printed).map((test, i) => {
            const isOpen = expanded.has(test.name)
            const evidenceId = `evidence-${test.name}`
            return (
              <li key={`${runId}-${test.name}`} className="animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={() => toggle(test.name)}
                  aria-expanded={isOpen}
                  aria-controls={evidenceId}
                  className="group flex w-full items-start gap-2 rounded-sm px-1 py-0.5 text-left hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <ChevronRight
                    aria-hidden="true"
                    className={`mt-[0.2rem] size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-90 text-primary' : ''}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="hidden text-muted-foreground sm:inline">{TEST_FILE}::</span>
                    <span className="group-hover:text-primary">{test.name}</span>
                  </span>
                  <span className="shrink-0 font-bold text-primary">PASSED</span>
                  <span className="hidden shrink-0 whitespace-pre text-muted-foreground sm:inline">
                    {percent(i)}
                  </span>
                </button>
                <div
                  id={evidenceId}
                  hidden={!isOpen}
                  className="mb-2 ml-6 mt-1 border-l-2 border-primary/50 pl-3 text-muted-foreground"
                >
                  <span className="text-primary">assert</span> {test.evidence}
                </div>
              </li>
            )
          })}
        </ol>

        {!done && (
          <p aria-hidden="true" className="px-1">
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary" />
          </p>
        )}

        <div aria-live="polite" className="mt-3">
          {done && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <p className="font-bold text-primary">
                <span aria-hidden="true">===== </span>8 passed
                <span aria-hidden="true"> =====</span>
              </p>
              <p className="text-xs text-muted-foreground">Tap any test to see its evidence.</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={replay}
            disabled={!done}
            className="inline-flex items-center gap-2 rounded-sm border border-primary px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            replay
          </button>
        </div>
      </div>
    </section>
  )
}
