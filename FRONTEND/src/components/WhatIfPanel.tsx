import { useState } from 'react'
import type { RequirementJSON, WeightKey } from '../types'

interface Props {
  requirement: RequirementJSON
  onRerun: (next: RequirementJSON) => void
}

const WEIGHT_LABELS: { key: WeightKey; label: string }[] = [
  { key: 'performance', label: 'Performance' },
  { key: 'camera', label: 'Camera' },
  { key: 'battery', label: 'Battery' },
  { key: 'display', label: 'Display' },
  { key: 'value', label: 'Value for money' },
]

export function WhatIfPanel({ requirement, onRerun }: Props) {
  const [budget, setBudget] = useState(requirement.constraints.maxBudget)
  const [weights, setWeights] = useState(requirement.weights)

  function updateWeight(key: WeightKey, value: number) {
    setWeights((w) => ({ ...w, [key]: value }))
  }

  function handleRerun() {
    onRerun({
      ...requirement,
      constraints: { ...requirement.constraints, maxBudget: budget },
      weights,
    })
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div>
        <span className="eyebrow">What if</span>
        <h3 style={{ fontSize: 18, marginTop: 6 }}>Change a constraint, re-run the optimizer</h3>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Budget cap</span>
          <span className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>
            ₹{budget.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={10000}
          max={requirement.constraints.category === 'mobile' ? 35000 : 95000}
          step={500}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {WEIGHT_LABELS.map(({ key, label }) => (
          <div key={key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{label}</span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
                {weights[key].toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={weights[key]}
              onChange={(e) => updateWeight(key, Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--coral)' }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleRerun}
        style={{
          background: 'var(--primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Re-run optimizer
      </button>
    </div>
  )
}