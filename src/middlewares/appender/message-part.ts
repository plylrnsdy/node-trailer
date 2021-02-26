
export interface MessagePart<T, U> {
  name: string,
  part: (ctx: T) => U
  raw: (part: U, ctx: T) => string
  colorize: (raw: string, ctx: T) => string
}

export default function messagePart<T, U>(part: MessagePart<T, U>) {
  return (ctx, next) => {
    ctx.messages.push(part as any)
    return next()
  }
}
