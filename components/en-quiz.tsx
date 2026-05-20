'use client'

import { useState, useCallback } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface Compound {
  latex: string
  bond: string
  deltaEN: number
}

const compounds: Compound[] = [
  { latex: '\\text{NaCl}',    bond: '\\text{Na}\\text{–}\\text{Cl}', deltaEN: 2.23 },
  { latex: '\\text{KBr}',     bond: '\\text{K}\\text{–}\\text{Br}',  deltaEN: 2.14 },
  { latex: '\\text{KCl}',     bond: '\\text{K}\\text{–}\\text{Cl}',  deltaEN: 2.34 },
  { latex: '\\text{NaF}',     bond: '\\text{Na}\\text{–}\\text{F}',  deltaEN: 3.05 },
  { latex: '\\text{LiF}',     bond: '\\text{Li}\\text{–}\\text{F}',  deltaEN: 3.00 },
  { latex: '\\text{MgO}',     bond: '\\text{Mg}\\text{–}\\text{O}',  deltaEN: 2.13 },
  { latex: '\\text{CaF}_2',   bond: '\\text{Ca}\\text{–}\\text{F}',  deltaEN: 2.98 },
  { latex: '\\text{MgCl}_2',  bond: '\\text{Mg}\\text{–}\\text{Cl}', deltaEN: 1.85 },
  { latex: '\\text{HCl}',     bond: '\\text{H}\\text{–}\\text{Cl}',  deltaEN: 0.96 },
  { latex: '\\text{HF}',      bond: '\\text{H}\\text{–}\\text{F}',   deltaEN: 1.78 },
  { latex: '\\text{HBr}',     bond: '\\text{H}\\text{–}\\text{Br}',  deltaEN: 0.76 },
  { latex: '\\text{H}_2\\text{O}', bond: '\\text{O}\\text{–}\\text{H}', deltaEN: 1.24 },
  { latex: '\\text{NH}_3',    bond: '\\text{N}\\text{–}\\text{H}',   deltaEN: 0.84 },
  { latex: '\\text{AlCl}_3',  bond: '\\text{Al}\\text{–}\\text{Cl}', deltaEN: 1.55 },
]

function K({ tex, display = false }: { tex: string; display?: boolean }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, { throwOnError: false, displayMode: display }),
      }}
    />
  )
}

function random(exclude?: number): number {
  let i: number
  do { i = Math.floor(Math.random() * compounds.length) } while (i === exclude)
  return i
}

type State = 'idle' | 'correct' | 'wrong'

export function Quiz() {
  const [index, setIndex] = useState(() => random())
  const [input, setInput] = useState('')
  const [state, setState] = useState<State>('idle')

  const compound = compounds[index]

  const check = useCallback(() => {
    const value = parseFloat(input.replace(',', '.'))
    if (isNaN(value)) return
    setState(Math.abs(value - compound.deltaEN) <= 0.3 ? 'correct' : 'wrong')
  }, [input, compound.deltaEN])

  const next = useCallback(() => {
    setIndex(prev => random(prev))
    setInput('')
    setState('idle')
  }, [])

  const deltaEN = compound.deltaEN.toFixed(2).replace('.', ',')

  return (
    <div className="my-6 rounded-xl border border-fd-border bg-fd-card p-5 shadow-sm">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
        Quiz
      </p>

      <p className="mb-4 text-lg font-semibold">
        Wie groß ist <K tex="\Delta EN" /> bei <K tex={compound.latex} />?
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          inputMode="decimal"
          value={input}
          onChange={e => { setInput(e.target.value); setState('idle') }}
          onKeyDown={e => e.key === 'Enter' && state === 'idle' && check()}
          placeholder="z. B. 2,23"
          className="w-36 rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fd-primary"
        />
        {state === 'idle' && (
          <button
            onClick={check}
            disabled={input.trim() === ''}
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Prüfen
          </button>
        )}
        {state !== 'idle' && (
          <button
            onClick={next}
            className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent transition-colors"
          >
            Nächste →
          </button>
        )}
      </div>

      {state === 'correct' && (
        <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
          ✓ Richtig! <K tex={`\\Delta EN(${compound.bond}) \\approx ${deltaEN}`} />
        </p>
      )}
      {state === 'wrong' && (
        <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
          ✗ Falsch. <K tex={`\\Delta EN(${compound.bond}) = ${deltaEN}`} />
        </p>
      )}
    </div>
  )
}
