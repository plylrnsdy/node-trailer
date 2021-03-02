import { LoggerContext } from "@/index"

export function rawConsole() {

  return (ctx: LoggerContext, next) => {
    console.log(
      ...ctx.appenders.map(({ text }) => text(ctx))
    )
    return next()
  }
}

export function colorConsole() {

  return (ctx: LoggerContext, next) => {
    console.log(
      ...ctx.appenders.map(({ colorize }) => colorize(ctx))
    )
    return next()
  }
}
