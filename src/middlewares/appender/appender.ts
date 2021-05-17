import { LoggerContext, Middleware } from "@/index"

export interface Appender<U> {
  name: string,
  raw: (ctx: LoggerContext) => U
  text: (ctx: LoggerContext) => string
  colorize: (ctx: LoggerContext) => string
}

export default function appender<U>(middleware: Appender<U>): Middleware {
  return (ctx, next) => {
    ctx.appenders.push(middleware)
    return next()
  }
}
