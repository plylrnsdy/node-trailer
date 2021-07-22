import * as chalk from 'chalk'
import { createPipeline } from '@/index'
import { filterByLevel } from '@/middlewares/filters'
import { date, level, message, position } from '@/middlewares/appenders'
import { levelColor } from '@/themes/default'
import { colorConsole, logFile } from '@/middlewares/outputs'


function defaultPlusTheme() {
  return createPipeline()
    // Filter
    .use(filterByLevel)
    // Appender
    .use(date())
    .use(level({ colorize: (ctx, text) => chalk.black.bgKeyword(levelColor[ctx.level])(` ${text} `) }))
    .use(message())
    .use(position())
    // Output
    .use(colorConsole())
    .use(logFile())
}

export default defaultPlusTheme
