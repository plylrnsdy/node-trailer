import { LoggerContext } from "@/index"


/**
 * Output log to console.
 *
 * @category middleware:output
 */
export function rawConsole() {

  return (ctx: LoggerContext, next) => {
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
export function colorConsole() {

  return (ctx: LoggerContext, next) => {
    console.log(
      ...ctx.appenders.map(({ colorize }) => colorize(ctx))
    )
    return next()
  }
}
