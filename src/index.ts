/**
 * @module node-trailer
 * @typicalname trailer
 */

import * as trough from 'trough'
import { Level, levels } from '@/core/levels'
import { Appender } from '@/middlewares/appenders'
import defaultTheme from '@/themes/default'
import noop from '@/utils/function/noop'
import zipObject from '@/utils/zip-object'

export const createPipeline = trough
export * as themes from '@/themes'
export * as filters from '@/middlewares/filters'
export * as appenders from '@/middlewares/appenders'
export * as outputs from '@/middlewares/outputs'


export type LoggerContext = {
  options: LoggerOptions
  level: Level
  args: any[]
  positionError: Error
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
      const ctx = {
        options: mergedOptions,
        level,
        args,
        appenders: [],
        positionError: Error('Use for getting logger called position.')
      }
      pipeline.run(ctx, noop)
    }

  return zipObject(levels, levels.map(log)) as Logger
}

export type Middleware = (ctx: LoggerContext, next: () => Promise<void>) => void | Promise<void>
