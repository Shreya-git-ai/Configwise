import { useState } from 'react'
import { CATALOG } from './data/catalog'
import { parseRequirement, runOptimizer } from './lib/engine'
import type { RequirementJSON, ScoredConfig } from './types'
import { RequirementInput } from './components/RequirementInput'
import { ResultsView } from './components/ResultsView'

type Stage = 'input' | 'results'

export default function App() {
  const [stage, setStage] = useState<Stage>('input')
  const [requirement, setRequirement] = useState<RequirementJSON | null>(null)
  const [ranked, setRanked] = useState<ScoredConfig[]>([])

  function handleSubmit(raw: string) {
    const req = parseRequirement(raw)
    const result = runOptimizer(CATALOG, req)
    setRequirement(req)
    setRanked(result)
    setStage('results')
  }

  function handleStartOver() {
    setStage('input')
    setRequirement(null)
    setRanked([])
  }

  return (
    <div style={{ minHeight: '100vh', padding: '64px 24px' }}>
      {stage === 'input' && <RequirementInput onSubmit={handleSubmit} />}
      {stage === 'results' && requirement && (
        <ResultsView requirement={requirement} ranked={ranked} onStartOver={handleStartOver} />
      )}
    </div>
  )
}