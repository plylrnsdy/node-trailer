import { Middleware } from "@/index"


/**
 * Output log to console.
 *
 * @category middleware:output
 */
export function rawConsole(): Middleware {

  return (ctx, next) => {
    console.log(
      ...ctx.appenders.map(({ text }) => text(ctx))
    )
    return next()
  }
}

/**
 * Output log to colorize console.
 *
 * @category middleware:output
 */
export function colorConsole(): Middleware {

  return (ctx, next) => {
    console.log(
      ...ctx.appenders.map(({ colorize }) => colorize(ctx))
    )
    return next()
  }
}
