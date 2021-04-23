import { promises as fs } from 'fs';
import { LoggerContext } from '@/index';


/**
 * Output log to text file.
 *
 * @category middleware:output
 */
export function logFile(filename?: string) {

  return (ctx: LoggerContext, next) => {
    const { options, appenders } = ctx
    const filepath = filename ?? options.logFile

    if (!filepath) return next()

    const text = appenders.map(({ text }) => text(ctx)).join(' ')

    return fs.appendFile(filepath, text + '\n')
      .then(next)
  }
}


/**
 * Output log to json file.
 *
 * @category middleware:output
 */
export function jsonFile(filename?: string) {

  return (ctx: LoggerContext, next) => {
    const output = ctx.options.logFile ?? filename

    if (!output) return next()

    const json = ctx.appenders
      .reduce((o, { name, raw }) => {
        o[name] = raw(ctx)
        return o
      }, {} as Record<string, any>)

    return fs.appendFile(output, `${JSON.stringify(json)}\n`)
      .then(next)
  }
}

