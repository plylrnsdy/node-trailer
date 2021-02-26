/** 条件为真时执行下一个中间件 */
export default function filter<T>(predicate: (ctx: T) => boolean) {
  return (ctx, next) => predicate(ctx) ? next() : void 0
}
