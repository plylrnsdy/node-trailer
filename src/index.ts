/**
 * @module node-trailer
 * @typicalname trailer
 */

import { noop, zipObject } from 'lodash'
import { Level, levels } from '@/core/levels'
import DebugError from '@/core/debug-error'
import { Appender } from '@/middlewares/appender'
import defaultTheme from '@/themes/default'

export { default as filter } from '@/middlewares/filter'
export { AppenderOptions, Appender, date, error, level, message } from '@/middlewares/appender'
export { colorConsole, logFile } from '@/middlewares/output'


export type LoggerContext = {
  options: LoggerOptions
  level: Level
  args: any[]
  error: Error
  appenders: Appender<any>[]
}

/**
 * Logger's options
 */
export type LoggerOptions = {
  /**
   * Minimum level of log which can be output
   */
  level: Level
  /**
   * The path of log file.
   */
  logFile?: string
}

const DEFAULT_OPTIONS = {
  level: 'log',
}

export type Logger = Record<Level, (...args: any[]) => void>

/**
 * Create a logger.
 *
 * Basic usage:
 *
 * ```javascript
 * import createLogger from "node-trailer"
 *
 * const logger = createLogger({ level: 'info' })
 * logger.log('log message.') // No output
 * logger.info('info message.') //=> info message.
 * ```
 *
 * Customize:
 *
 * ```javascript
 * const pipeline = trough()
 *   // Filter
 *   .use(filter(({ options, level }: LoggerContext) =>
 *     levelWeight[options.level] <= levelWeight[level]
 *   ))
 *   // Appender
 *   .use(level(levelColor))
 *   .use(message())
 *   .use(error())
 *   // Output
 *   .use(colorConsole())
 *
 * const logger = createLogger({}, pipeline)
 * ```
 *
 * @param {Partial<LoggerOptions>} options Logger's options
 * @param pipeline middlewares handling the log for customizing logger
 * @returns {module:node-trailer~Logger}
 */
export function createLogger(options: Partial<LoggerOptions> = {}, pipeline = defaultTheme()): Logger {

  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options) as LoggerOptions

  const log = (level: Level) =>
    /**
     * Output a specify level log.
     *
     * @name log|debug|info|warn|error|fatal
     * @memberof module:Logger.prototype
     * @return {void}
     */
    (...args: any[]) => {
      const errIdx = args.findIndex(arg => arg instanceof Error)
      const error = errIdx > -1 ? args.splice(errIdx, 1)[0] : new DebugError()
      pipeline.run({ options: mergedOptions, level, args, error, appenders: [] } as any, noop)
    }

  return zipObject(levels, levels.map(log)) as Logger
}
