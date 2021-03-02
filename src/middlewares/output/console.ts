import { LoggerContext } from "@/index"

export function rawConsole() {

  return (ctx: LoggerContext, next) => {
    console.log(
      ...ctx.appenders.map(({ raw, text }) => text(raw(ctx), ctx))
    )
    return next()
  }
}

export function colorConsole() {

  return (ctx: LoggerContext, next) => {
    console.log(
      ...ctx.appenders.map(({ raw, text, colorize }) => colorize(text(raw(ctx), ctx), ctx))
    )
    return next()
  }
}
