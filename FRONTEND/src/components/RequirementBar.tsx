import type { RequirementJSON } from '../types'

interface Props {
  requirement: RequirementJSON
  candidateCount: number
}

export function RequirementBar({ requirement, candidateCount }: Props) {
  const { constraints, labels } = requirement
  const tags = [
    constraints.category === 'mobile' ? 'Mobile' : 'Laptop',
    `Under ₹${constraints.maxBudget.toLocaleString('en-IN')}`,
    ...labels,
    ...constraints.mustHave,
  ]

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        padding: '14px 20px',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span className="eyebrow">Your requirement</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="mono"
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'var(--primary-tint)',
                color: 'var(--primary-ink)',
                border: '1px solid var(--line-strong)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <span className="mono" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
        {candidateCount} configs evaluated
      </span>
    </div>
  )
}