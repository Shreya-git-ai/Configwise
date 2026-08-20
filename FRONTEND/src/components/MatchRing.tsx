interface MatchRingProps {
  score: number
  rank: number
}

const RANK_COLORS: Record<number, { ring: string; text: string }> = {
  1: { ring: 'var(--gold)', text: 'var(--gold)' },
  2: { ring: 'var(--silver)', text: 'var(--silver)' },
  3: { ring: 'var(--bronze)', text: 'var(--bronze)' },
}

export function MatchRing({ score, rank }: MatchRingProps) {
  const color = RANK_COLORS[rank] ?? { ring: 'var(--primary)', text: 'var(--primary)' }
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / 100)

  return (
    <div style={{ position: 'relative', width: 72, height: 72 }}>
      <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--line)" strokeWidth="6" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={color.ring}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
          {score}%
        </span>
      </div>
    </div>
  )
}