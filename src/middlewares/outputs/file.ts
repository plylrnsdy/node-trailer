import { promises as fs } from 'fs';
import { Middleware } from '@/index';


/**
 * Output log to text file.
 *
 * @category middleware:output
 */
export function logFile(filename?: string): Middleware {

  return (ctx, next) => {
    const output = ctx.options.logFile ?? filename

    if (!output) return next()

    const text = ctx.appenders.map(({ text }) => text(ctx)).join(' ')

    return fs.appendFile(output, text + '\n')
      .then(next)
  }
}


/**
 * Output log to json file.
 *
 * @category middleware:output
 */
export function jsonFile(filename?: string): Middleware {

  return (ctx, next) => {
    const output = ctx.options.logFile ?? filename

    if (!output) return next()

    const json = ctx.appenders
      .reduce<Record<string, any>>((o, { name, raw }) => (o[name] = raw(ctx), o), {})

    return fs.appendFile(output, `${JSON.stringify(json)}\n`)
      .then(next)
  }
}

