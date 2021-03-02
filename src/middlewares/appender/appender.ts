
export interface Appender<T, U> {
  name: string,
  raw: (ctx: T) => U
  text: (part: U, ctx: T) => string
  colorize: (raw: string, ctx: T) => string
}

export default function appender<T, U>(part: Appender<T, U>) {
  return (ctx, next) => {
    ctx.appenders.push(part as any)
    return next()
  }
}
