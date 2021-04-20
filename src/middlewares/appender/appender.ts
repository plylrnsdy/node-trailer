import { LoggerContext } from "@/index"

export interface Appender<U> {
  name: string,
  raw: (ctx: LoggerContext) => U
  text: (ctx: LoggerContext) => string
  colorize: (ctx: LoggerContext) => string
}

export default function appender<U>(middleware: Appender<U>) {
  return (ctx: LoggerContext, next) => {
    ctx.appenders.push(middleware)
    return next()
  }
}
