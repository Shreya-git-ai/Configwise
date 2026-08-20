import { useState } from 'react'
import type { RequirementJSON, ScoredConfig } from './types'
import { RequirementInput } from './components/RequirementInput'
import { ResultsView } from './components/ResultsView'

type Stage = 'input' | 'results'

export default function App() {
  const [stage, setStage] = useState<Stage>('input')
  const [requirement, setRequirement] = useState<RequirementJSON | null>(null)
  const [ranked, setRanked] = useState<ScoredConfig[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(raw: string) {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('http://127.0.0.1:8001/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirements: raw,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      const backendRequirements = data.requirements
      const recommendations = data.recommendations

      const frontendRequirement: RequirementJSON = {
        raw,

        constraints: {
          category: 'mobile',
          maxBudget: backendRequirements.budget ?? 999999,
          mustHave: backendRequirements.priorities ?? [],
        },

        weights: {
          performance: backendRequirements.gaming_priority ? 3 : 1,
          camera: backendRequirements.camera_priority ? 3 : 1,
          battery: backendRequirements.battery_priority ? 3 : 1,
          display: backendRequirements.display_priority ? 3 : 1,
          value: 1,
        },

        labels: [
          'Mobile',

          ...(backendRequirements.budget
            ? [`Under ₹${backendRequirements.budget.toLocaleString('en-IN')}`]
            : []),

          ...(backendRequirements.gaming_priority ? ['Gaming'] : []),
          ...(backendRequirements.camera_priority ? ['Camera'] : []),
          ...(backendRequirements.battery_priority ? ['Battery'] : []),
          ...(backendRequirements.display_priority ? ['Display'] : []),
        ],
      }

      const frontendResults: ScoredConfig[] = recommendations.map(
        (phone: any, index: number) => ({
          id: phone.id,
          name: phone.name,
          category: 'mobile',
          price: phone.price,

          chip: phone.chip,
          ram: phone.ram,
          storage: phone.storage,
          battery: phone.battery,
          displaySpec: phone.displaySpec,
          cameraSpec: phone.cameraSpec,

          tags: [],

          scores: {
            performance: 0,
            camera: 0,
            battery: 0,
            display: 0,
          },

          score: phone.score,
          rank: phone.rank ?? index + 1,

          breakdown: phone.breakdown.map((item: any) => ({
            dimension: item.dimension,
            weight: item.weight,
            deviceScore: item.deviceScore,
            contribution: item.contribution,
          })),
        }),
      )

      setRequirement(frontendRequirement)
      setRanked(frontendResults)
      setStage('results')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleStartOver() {
    setStage('input')
    setRequirement(null)
    setRanked([])
    setError('')
  }

  return (
    <div style={{ minHeight: '100vh', padding: '64px 24px' }}>
      {stage === 'input' && (
        <>
          <RequirementInput onSubmit={handleSubmit} />

          {loading && (
            <p
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: 'var(--ink-soft)',
              }}
            >
              Finding the best matches...
            </p>
          )}

          {error && (
            <p
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: 'crimson',
              }}
            >
              {error}
            </p>
          )}
        </>
      )}

      {stage === 'results' && requirement && (
        <ResultsView
          requirement={requirement}
          ranked={ranked}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  )
}