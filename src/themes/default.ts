import { zipObject } from 'lodash'
import * as trough from 'trough'
import { Level, levels, levelWeight } from '@/core/levels'
import filter from '@/middlewares/filter'
import { date, error, level, message } from '@/middlewares/appender'
import { colorConsole, logFile } from '@/middlewares/output'
import type { LoggerContext } from '..'


export default function defaultTheme() {
  const colors = ['white', 'cyan', 'green', 'yellow', 'red', 'red'] as const
  const levelColor = zipObject(levels, colors) as Record<Level, string>

  return trough()
    // Filter
    .use(filter(({ options, level }: LoggerContext) =>
      levelWeight[options.level] <= levelWeight[level]
    ))
    // Appender
    .use(date())
    .use(level(levelColor))
    .use(message())
    .use(error())
    // Output
    .use(colorConsole())
    .use(logFile())
}
