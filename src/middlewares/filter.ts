/**
 * if predicate is true, execute next middleware.
 */
export default function filter<T>(predicate: (ctx: T) => boolean) {
  return (ctx, next) => predicate(ctx) ? next() : void 0
}
