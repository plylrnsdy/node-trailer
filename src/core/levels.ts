
export const levels = ['log', 'debug', 'info', 'warn', 'error', 'fatal'] as const

export type Level = typeof levels[number]

export type LevelWeight = Record<Level, number>

export const levelWeight = levels.reduce((m, level, i) => (m[level] = i, m), {} as LevelWeight)
