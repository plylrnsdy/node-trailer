import { promises as fs } from 'fs';


export function logFile(filename?: string) {

  return (ctx, next) => {
    const { options, messages } = ctx
    const text = messages.map(({ part, raw }) => raw(part(ctx), ctx)).join(' ')

    return fs.appendFile(filename ?? options.logFile, text + '\n')
      .then(next)
  }
}


export function jsonFile(filename?: string) {

  return (ctx, next) => {
    const output = ctx.options.logFile ?? filename

    if (!output) return next()

    const json = ctx.messages
      .reduce((o, { name, part }) => {
        o[name] = part(ctx)
        return o
      }, {} as Record<string, any>)

    return fs.appendFile(output, `${JSON.stringify(json)}\n`)
      .then(next)
  }
}

