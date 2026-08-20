import { useState } from 'react'
import type { ScoredConfig } from '../types'
import { MatchRing } from './MatchRing'

interface Props {
  config: ScoredConfig
  featured?: boolean
}

const RANK_LABEL: Record<number, string> = { 1: 'Best match', 2: 'Runner-up', 3: 'Also great' }
const RANK_TINT: Record<number, string> = { 1: 'var(--gold-tint)', 2: 'var(--silver-tint)', 3: 'var(--bronze-tint)' }
const RANK_TEXT: Record<number, string> = { 1: 'var(--gold)', 2: 'var(--silver)', 3: 'var(--bronze)' }

export function ConfigCard({ config, featured }: Props) {
  const [showWhy, setShowWhy] = useState(false)
  const tint = RANK_TINT[config.rank] ?? 'var(--primary-tint)'
  const textColor = RANK_TEXT[config.rank] ?? 'var(--primary)'

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: featured ? '2px solid var(--primary)' : '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '20px 22px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
              {String(config.rank).padStart(2, '0')}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: 999,
                background: tint,
                color: textColor,
              }}
            >
              {RANK_LABEL[config.rank] ?? 'Match'}
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>{config.name}</h3>
          <p className="mono" style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
            {config.chip}
          </p>
        </div>
        <MatchRing score={config.score} rank={config.rank} />
      </div>

      <div className="ticket-perforation">
        <span className="ticket-notch left" />
        <span className="ticket-notch right" />
      </div>

      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <SpecRow label="RAM / storage" value={`${config.ram} · ${config.storage}`} />
        <SpecRow label="Display" value={config.displaySpec} />
        <SpecRow label="Camera" value={config.cameraSpec} />
        <SpecRow label="Battery" value={config.battery} />
      </div>

      <div style={{ padding: '0 22px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => setShowWhy((v) => !v)}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {showWhy ? 'Hide why' : 'Why this pick?'}
          <span style={{ fontSize: 11, transform: showWhy ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>▾</span>
        </button>

        {showWhy && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            {config.breakdown
              .slice()
              .sort((a, b) => b.contribution - a.contribution)
              .map((b) => (
                <div key={b.dimension} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', width: 76, textTransform: 'capitalize' }}>
                    {b.dimension}
                  </span>
                  <div style={{ flex: 1, height: 6, background: 'var(--line)', borderRadius: 999, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${b.deviceScore}%`,
                        height: '100%',
                        background: 'var(--primary)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-faint)', width: 30, textAlign: 'right' }}>
                    {Math.round(b.deviceScore)}
                  </span>
                </div>
              ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <span className="mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>
            ₹{config.price.toLocaleString('en-IN')}
          </span>
          <button
            style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{label}</span>
      <span className="mono" style={{ fontSize: 13, color: 'var(--ink)', textAlign: 'right' }}>
        {value}
      </span>
    </div>
  )
}