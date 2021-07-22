type TupleRest<T1 extends ReadonlyArray<any>, T2 extends ReadonlyArray<any>> = T1 extends [...T2, ...infer T3] ? T3 : never

/**
 * Return a function with partial default arguments.
 *
 * @param fn a function
 * @param partials partial arguments
 */
export default function partial<T extends (...args: any[]) => any, P extends ReadonlyArray<any>>(
  fn: T,
  ...partials: P
): (...args: TupleRest<Parameters<T>, P>) => ReturnType<T> {

  return function wrapper(...args: any[]) {
    // @ts-ignore
    return fn.call(this, ...partials, ...args)
  }
}
