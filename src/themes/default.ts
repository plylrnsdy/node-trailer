import * as trough from 'trough'
import { levels, levelWeight } from '@/core/levels'
import filter from '@/middlewares/filter'
import { date, error, level, message } from '@/middlewares/appender'
import { colorConsole, logFile } from '@/middlewares/output'
import zipObject from '@/utils/zip-object'


export default function defaultTheme() {
  const colors = ['white', 'cyan', 'green', 'yellow', 'red', 'red'] as const
  const levelColor = zipObject(levels, colors)

  return trough()
    // Filter
    .use(filter(({ options, level }) =>
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
