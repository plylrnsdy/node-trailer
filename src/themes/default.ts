import { createPipeline } from '@/index'
import { levels } from '@/core/levels'
import { filterByLevel } from '@/middlewares/filters'
import { date, level, message, position } from '@/middlewares/appenders'
import { colorConsole, logFile } from '@/middlewares/outputs'
import zipObject from '@/utils/zip-object'


export const colors = ['white', 'cyan', 'green', 'yellow', 'red', 'red'] as const
export const levelColor = zipObject(levels, colors)

function defaultTheme() {
  return createPipeline()
    // Filter
    .use(filterByLevel)
    // Appender
    .use(date())
    .use(level({ levelColor }))
    .use(message())
    .use(position())
    // Output
    .use(colorConsole())
    .use(logFile())
}

defaultTheme.colors = colors
defaultTheme.levelColor = levelColor

export default defaultTheme
