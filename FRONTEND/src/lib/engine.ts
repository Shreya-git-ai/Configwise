import type {
  Category,
  DeviceSpec,
  HardConstraints,
  RequirementJSON,
  ScoreContribution,
  ScoredConfig,
  Tradeoff,
  WeightKey,
  WeightProfile,
} from '../types'

const BASE_WEIGHT = 0.35
const BOOST_WEIGHT = 0.9

const KEYWORD_MAP: { pattern: RegExp; keys: WeightKey[]; label: string }[] = [
  { pattern: /gaming|game|fps|performance/i, keys: ['performance'], label: 'Gaming' },
  { pattern: /camera|photo|photography|selfie/i, keys: ['camera'], label: 'Camera' },
  { pattern: /battery|backup|all[-\s]?day/i, keys: ['battery'], label: 'Battery life' },
  { pattern: /display|screen|amoled|refresh/i, keys: ['display'], label: 'Display' },
  { pattern: /budget|cheap|value|affordable/i, keys: ['value'], label: 'Value for money' },
  { pattern: /student|office|work|productivity/i, keys: ['value', 'battery'], label: 'Productivity' },
]

/** Requirement Collection -> Requirement JSON */
export function parseRequirement(raw: string): RequirementJSON {
  const text = raw.trim()
  const category: Category = /laptop|computer|notebook|pc\b/i.test(text) ? 'laptop' : 'mobile'

  let maxBudget = category === 'laptop' ? 70000 : 30000
  const kMatch = text.match(/(\d{2,3})\s*k\b/i)
  const rupeeMatch = text.match(/₹\s?([\d,]{3,7})/)
  if (kMatch) maxBudget = parseInt(kMatch[1], 10) * 1000
  else if (rupeeMatch) maxBudget = parseInt(rupeeMatch[1].replace(/,/g, ''), 10)

  const weights: WeightProfile = {
    performance: BASE_WEIGHT,
    camera: BASE_WEIGHT,
    battery: BASE_WEIGHT,
    display: BASE_WEIGHT,
    value: BASE_WEIGHT,
  }
  const labels: string[] = []

  for (const rule of KEYWORD_MAP) {
    if (rule.pattern.test(text)) {
      rule.keys.forEach((k) => (weights[k] = BOOST_WEIGHT))
      labels.push(rule.label)
    }
  }
  if (labels.length === 0) labels.push('Balanced')

  const mustHave: string[] = []
  if (/5g/i.test(text)) mustHave.push('5G')
  if (/amoled/i.test(text)) mustHave.push('AMOLED')

  return {
    raw: text,
    constraints: { category, maxBudget, mustHave },
    weights,
    labels,
  }
}

/** FILTER stage: hard constraints eliminate candidates outright. */
export function filterByConstraints(catalog: DeviceSpec[], constraints: HardConstraints): DeviceSpec[] {
  return catalog.filter((device) => {
    if (device.category !== constraints.category) return false
    if (device.price > constraints.maxBudget) return false
    if (constraints.mustHave.length > 0) {
      const hasAll = constraints.mustHave.every((req) =>
        device.tags.some((tag) => tag.toLowerCase() === req.toLowerCase())
      )
      if (!hasAll) return false
    }
    return true
  })
}

/** SCORING stage: weighted sum over normalized per-dimension scores. */
export function scoreConfig(device: DeviceSpec, weights: WeightProfile, maxBudget: number): { score: number; breakdown: ScoreContribution[] } {
  const valueScore = Math.max(0, Math.min(100, 100 - (device.price / maxBudget) * 100 + 20))

  const dimensionScores: Record<WeightKey, number> = {
    performance: device.scores.performance,
    camera: device.scores.camera,
    battery: device.scores.battery,
    display: device.scores.display,
    value: valueScore,
  }

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0)
  const breakdown: ScoreContribution[] = (Object.keys(weights) as WeightKey[]).map((dimension) => {
    const weight = weights[dimension]
    const deviceScore = dimensionScores[dimension]
    return { dimension, weight, deviceScore, contribution: (weight * deviceScore) / totalWeight }
  })

  const score = Math.round(breakdown.reduce((sum, b) => sum + b.contribution, 0))
  return { score, breakdown }
}

/** CONFIGURATION OPTIMIZER: filter -> score -> rank -> top N. */
export function runOptimizer(catalog: DeviceSpec[], requirement: RequirementJSON, topN = 3): ScoredConfig[] {
  const candidates = filterByConstraints(catalog, requirement.constraints)
  const scored = candidates.map((device) => {
    const { score, breakdown } = scoreConfig(device, requirement.weights, requirement.constraints.maxBudget)
    return { ...device, score, breakdown, rank: 0 }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topN).map((c, i) => ({ ...c, rank: i + 1 }))
}

/** WHAT-IF: change a constraint or weight, re-run the optimizer, and diff against the previous top pick. */
export function whatIf(
  catalog: DeviceSpec[],
  previousTop: ScoredConfig,
  nextRequirement: RequirementJSON
): { ranked: ScoredConfig[]; tradeoff: Tradeoff } {
  const ranked = runOptimizer(catalog, nextRequirement)
  const newPick = ranked[0] ?? previousTop

  const fieldsToCompare: { key: keyof DeviceSpec; label: string }[] = [
    { key: 'name', label: 'Pick' },
    { key: 'price', label: 'Price' },
    { key: 'chip', label: 'Chip' },
    { key: 'battery', label: 'Battery' },
    { key: 'cameraSpec', label: 'Camera' },
  ]

  const deltas = fieldsToCompare.map(({ key, label }) => {
    const before = String(previousTop[key])
    const after = String(newPick[key])
    let direction: 'up' | 'down' | 'flat' = 'flat'
    if (key === 'price') direction = newPick.price < previousTop.price ? 'down' : newPick.price > previousTop.price ? 'up' : 'flat'
    return { field: label, before, after, direction }
  })

  return {
    ranked,
    tradeoff: {
      previousPick: previousTop,
      newPick,
      changed: newPick.id !== previousTop.id,
      deltas,
    },
  }
}