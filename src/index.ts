import { noop, zipObject } from 'lodash'
import * as trough from 'trough'
import { Level, levels, levelWeight } from '@/core/levels'
import DebugError from '@/core/debug-error'
import filter from '@/middlewares/filter'
import { MessagePart, date, error, level, message } from '@/middlewares/appender'
import { colorConsole, logFile } from '@/middlewares/output'


export type LoggerContext = {
  options: LoggerOptions
  level: Level
  args: any[]
  error: Error
  messages: MessagePart<LoggerContext, any>[]
}


export type LoggerOptions = {
  level: Level
  logFile: string
}

const DEFAULT_OPTIONS = {
  level: 'log',
}


export type Logger = Record<Level, (...args: any[]) => void>

export default function createLogger(options: Partial<LoggerOptions> = {}, pipeline = defaultPipeline()) {

  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options) as LoggerOptions

  const log = (level: Level) =>
    (...args: any[]) => {
      const errIdx = args.findIndex(arg => arg instanceof Error)
      const error = errIdx > -1 ? args.splice(errIdx, 1)[0] : new DebugError()
      pipeline.run({ options: mergedOptions, level, args, error, messages: [] } as any, noop)
    }

  return zipObject(levels, levels.map(log)) as Logger
}

function defaultPipeline() {
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
