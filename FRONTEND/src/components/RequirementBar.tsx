import type { RequirementJSON } from '../types'

interface Props {
  requirement: RequirementJSON
  candidateCount: number
}

export function RequirementBar({ requirement, candidateCount }: Props) {
  // Remove duplicate labels while preserving their original order.
  const uniqueLabels = [...new Set(requirement.labels)]

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <span
          className="eyebrow"
          style={{
            marginRight: 4,
            whiteSpace: 'nowrap',
          }}
        >
          Your requirement
        </span>

        {uniqueLabels.map((label) => (
          <span
            key={label}
            style={{
              background: 'var(--primary-tint)',
              border: '1px solid var(--line-strong)',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 12,
              color: 'var(--ink-soft)',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <span
        className="mono"
        style={{
          fontSize: 12,
          color: 'var(--ink-faint)',
          whiteSpace: 'nowrap',
        }}
      >
        {candidateCount} configs evaluated
      </span>
    </div>
  )
}