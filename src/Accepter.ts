import { style } from './util'


export class DebugError extends Error { }

export class Output {
    [key: string]: any

    timestamp: number | string = Date.now()
    message?: string

    method: string = ''
    path: string = ''
    file: string = ''
    line: string = ''
    pos: string = ''

    style = style

    constructor(
        public level: string,
        public template: string = '',
        public args: any[],
        public error: Error = new DebugError('Trailing... ')) { }
}


export function useErrorInFirstArg(level: string, args: any[]) {
    if (!(args[0] instanceof Error)) return;

    return new Output(level, args[1], args.slice(2), args[0]);
}

export function common(level: string, args: any[]) {
    return new Output(level, args[0], args.slice(1));
}
