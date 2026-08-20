import type { Tradeoff } from '../types'

export function TradeoffCard({ tradeoff }: { tradeoff: Tradeoff }) {
  const { previousPick, newPick, changed, deltas } = tradeoff

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
      }}
    >
      <span className="eyebrow">Trade-off</span>
      <h3 style={{ fontSize: 18, marginTop: 6, marginBottom: 16 }}>
        {changed
          ? `Top pick shifted from ${previousPick.name} to ${newPick.name}`
          : `${previousPick.name} still leads after the re-run`}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {deltas.map((d) => (
          <div
            key={d.field}
            style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr auto 1fr',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              padding: '8px 0',
              borderTop: '1px solid var(--line)',
            }}
          >
            <span style={{ color: 'var(--ink-soft)' }}>{d.field}</span>
            <span className="mono" style={{ color: d.before === d.after ? 'var(--ink-faint)' : 'var(--ink)' }}>
              {d.before}
            </span>
            <span
              style={{
                color: d.direction === 'down' ? 'var(--mint)' : d.direction === 'up' ? 'var(--coral)' : 'var(--ink-faint)',
              }}
            >
              →
            </span>
            <span
              className="mono"
              style={{
                fontWeight: 600,
                color: d.direction === 'down' ? 'var(--mint)' : d.direction === 'up' ? 'var(--coral)' : 'var(--ink)',
              }}
            >
              {d.after}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24, marginTop: 18 }}>
        <ScoreStamp label="Previous score" value={previousPick.score} />
        <ScoreStamp label="New score" value={newPick.score} highlight />
      </div>
    </div>
  )
}

function ScoreStamp({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        background: highlight ? 'var(--primary-tint)' : 'var(--surface-sunken)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 16px',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{label}</p>
      <p className="mono" style={{ fontSize: 22, fontWeight: 600, color: highlight ? 'var(--primary-ink)' : 'var(--ink)' }}>
        {value}%
      </p>
    </div>
  )
}