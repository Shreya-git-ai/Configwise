export type Category = 'mobile' | 'laptop'

export type WeightKey = 'performance' | 'camera' | 'battery' | 'display' | 'value'

export type WeightProfile = Record<WeightKey, number>

export interface HardConstraints {
  category: Category
  maxBudget: number
  mustHave: string[]
}

/** The "Requirement JSON" node in the architecture diagram. */
export interface RequirementJSON {
  raw: string
  constraints: HardConstraints
  weights: WeightProfile
  labels: string[]
}

export interface DeviceSpec {
  id: string
  name: string
  category: Category
  price: number
  chip: string
  ram: string
  storage: string
  battery: string
  displaySpec: string
  cameraSpec: string
  tags: string[]
  scores: {
    performance: number
    camera: number
    battery: number
    display: number
  }
}

export interface ScoreContribution {
  dimension: WeightKey
  weight: number
  deviceScore: number
  contribution: number
}

/** Output of the CONFIGURATION OPTIMIZER — a ranked config. */
export interface ScoredConfig extends DeviceSpec {
  score: number
  rank: number
  breakdown: ScoreContribution[]
}

export interface TradeoffDelta {
  field: string
  before: string
  after: string
  direction: 'up' | 'down' | 'flat'
}

export interface Tradeoff {
  previousPick: ScoredConfig
  newPick: ScoredConfig
  changed: boolean
  deltas: TradeoffDelta[]
}