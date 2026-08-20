import { useState } from 'react'

interface Props {
  onSubmit: (raw: string) => void
}

const SUGGESTIONS = [
  'I need a phone under ₹30k for gaming and camera',
  'Laptop under ₹70k for college, mostly office work',
  'Phone under ₹20k with great battery backup',
]

export function RequirementInput({ onSubmit }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit() {
    if (!value.trim()) return
    onSubmit(value.trim())
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
      <span className="eyebrow">Configuration suggestor</span>
      <h1 style={{ fontSize: 40, marginTop: 10, marginBottom: 14 }}>
        Tell us what you need.
        <br />
        We'll configure the rest.
      </h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
        Describe the device in your own words. We'll turn it into hard constraints and
        weighted priorities, then rank every config that fits.
      </p>

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: 20,
          textAlign: 'left',
        }}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="I need a phone under ₹30k for gaming and camera..."
          rows={3}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 15,
            color: 'var(--ink)',
            background: 'transparent',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <button
            onClick={handleSubmit}
            style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ✨ Recommend
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setValue(s)}
            className="mono"
            style={{
              fontSize: 12,
              padding: '8px 14px',
              borderRadius: 999,
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              color: 'var(--ink-soft)',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}