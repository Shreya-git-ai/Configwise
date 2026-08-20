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

  function handleSuggestion(suggestion: string) {
    setValue(suggestion)
  }

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 15,
        boxSizing: 'border-box',
      }}
    >
      {/* Main centered content */}
      <div
        style={{
          width: '100%',
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
          padding: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Project title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'var(--primary)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          ConfigWise
        </div>

        {/* Small eyebrow text */}
        <span
          className="eyebrow"
          style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '2px',
            color: 'var(--muted)',
            marginBottom: 18,
            textTransform: 'uppercase',
          }}
        >
          Configuration Suggestor
        </span>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 16px',
            color: 'var(--ink)',
            letterSpacing: '-1px',
          }}
        >
          Tell us what you need.
          <br />
          We'll configure the rest.
        </h1>

        {/* Description */}
        <p
          style={{
            color: 'var(--ink-soft)',
            fontSize: 15,
            margin: '0 auto 32px',
            lineHeight: 1.6,
            maxWidth: 680,
          }}
        >
          Describe the device in your own words. We'll turn it into hard
          constraints and weighted priorities, then rank every config that
          fits.
        </p>

        {/* Requirement input card */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px 24px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: 24,
            textAlign: 'left',
          }}
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleSubmit()
              }
            }}
            placeholder="I need a phone under ₹30k for gaming and camera..."
            style={{
              width: '100%',
              minHeight: 20,
              border: 'none',
              outline: 'none',
              resize: 'none',
              background: 'transparent',
              color: 'var(--ink)',
              fontSize: 16,
              lineHeight: 1.6,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              boxSizing: 'border-box',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 16 }}>✨</span>
              Recommend
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            alignItems: 'center',
          }}
        >
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                color: 'var(--ink-soft)',
                borderRadius: 999,
                padding: '9px 16px',
                fontSize: 13,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}