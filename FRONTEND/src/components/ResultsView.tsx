import { useEffect, useState } from 'react'
import type { RequirementJSON, ScoredConfig, Tradeoff } from '../types'
import { RequirementBar } from './RequirementBar'
import { ConfigCard } from './ConfigCard'
import { WhatIfPanel } from './WhatIfPanel'
import { TradeoffCard } from './TradeoffCard'

interface Props {
  requirement: RequirementJSON
  ranked: ScoredConfig[]
  onStartOver: () => void
}

export function ResultsView({
  requirement,
  ranked: initialRanked,
  onStartOver,
}: Props) {
  const [ranked, setRanked] = useState<ScoredConfig[]>(initialRanked)
  const [showWhatIf, setShowWhatIf] = useState(false)
  const [tradeoff, setTradeoff] = useState<Tradeoff | null>(null)

  /*
   * Keep the results in sync if a new backend response
   * is passed from App.tsx.
   */
  useEffect(() => {
    setRanked(initialRanked)
  }, [initialRanked])

  /*
   * What-if will be connected to the backend separately.
   *
   * For now we don't run the old frontend optimizer here,
   * because recommendations must come from our backend.
   */
  function handleRerun(_nextRequirement: RequirementJSON) {
    setTradeoff(null)
  }

  if (ranked.length === 0) {
    return (
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: 'var(--ink-soft)',
          }}
        >
          Nothing cleared your hard constraints. Try a higher budget or
          change your requirements.
        </p>

        <button
          onClick={onStartOver}
          style={{
            marginTop: 16,
            background: 'none',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 18px',
          }}
        >
          Start over
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: 1040,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span className="eyebrow">Top matches</span>

          <h2
            style={{
              fontSize: 26,
              marginTop: 6,
            }}
          >
            Ranked configurations
          </h2>
        </div>

        <button
          onClick={onStartOver}
          className="mono"
          style={{
            fontSize: 12,
            background: 'none',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: '8px 16px',
            color: 'var(--ink-soft)',
          }}
        >
          ↺ New search
        </button>
      </div>

      {/* REQUIREMENT SUMMARY */}

      <RequirementBar
        requirement={requirement}
        candidateCount={ranked.length}
      />

      {/* REAL BACKEND RESULTS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {ranked.map((config) => (
          <ConfigCard
            key={config.id}
            config={config}
            featured={config.rank === 1}
          />
        ))}
      </div>

      {/* WHAT-IF */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => setShowWhatIf((v) => !v)}
          style={{
            background: showWhatIf
              ? 'var(--primary)'
              : 'var(--surface)',
            color: showWhatIf
              ? '#fff'
              : 'var(--ink)',
            border: '1px solid var(--line-strong)',
            borderRadius: 999,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {showWhatIf
            ? 'Close what-if'
            : 'Explore what-if'}
        </button>
      </div>

      {showWhatIf && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: tradeoff
              ? '1fr 1fr'
              : '1fr',
            gap: 20,
          }}
        >
          <WhatIfPanel
            requirement={requirement}
            onRerun={handleRerun}
          />

          {tradeoff && (
            <TradeoffCard tradeoff={tradeoff} />
          )}
        </div>
      )}
    </div>
  )
}