import { LoggerContext, Middleware } from '..'

/**
 * if predicate is true, execute next middleware.
 * @category middleware
 */
export default function filter(predicate: (ctx: LoggerContext) => boolean): Middleware {
  return (ctx, next) => predicate(ctx) ? next() : void 0
}
