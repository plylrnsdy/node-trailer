import noop from "@/utils/function/noop";


type Fn = (...args: any[]) => any

/**
 * Composite several single-parameter function as a function
 */
export default function flow<T extends Fn[], R extends Fn>(...funcs: [...T, R]): (x: Parameters<T[0]>[0]) => ReturnType<R> {

    if (funcs.length === 0) return noop as any;
    if (funcs.length === 1) return funcs[0];

    return function (x: any) {
        let result = x
        for (let i = 0; i < funcs.length; i++) {
            result = funcs[i](result);
        }
        return result;
    }
}
