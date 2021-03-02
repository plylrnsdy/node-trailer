import { LoggerContext } from "@/index"

export interface AppenderOptions<U> {
  name: string,
  raw: (ctx: LoggerContext) => U
  text: (raw: U, ctx: LoggerContext) => string
  colorize: (text: string, ctx: LoggerContext) => string
}

export interface Appender<U> {
  name: string,
  raw: (ctx: LoggerContext) => U
  text: (ctx: LoggerContext) => string
  colorize: (ctx: LoggerContext) => string
}

export default function appender<U>(opt: AppenderOptions<U>) {
  return (ctx: LoggerContext, next) => {
    ctx.appenders.push({
      ...opt,
      text: ctx => opt.text(opt.raw(ctx), ctx),
      colorize: ctx => opt.colorize(opt.text(opt.raw(ctx), ctx), ctx)
    })
    return next()
  }
}
