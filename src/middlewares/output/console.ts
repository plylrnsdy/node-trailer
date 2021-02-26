
export function rawConsole() {

  return (ctx, next) => {
    console.log(
      ...ctx.messages.map(({ part, raw }) => raw(part(ctx), ctx))
    )
    return next()
  }
}

export function colorConsole() {

  return (ctx, next) => {
    console.log(
      ...ctx.messages.map(({ part, raw, colorize }) => colorize(raw(part(ctx), ctx), ctx))
    )
    return next()
  }
}
