import { style } from './util'


export class DebugError extends Error {
    constructor() {
        super();
        let stacks = (<string>this.stack).split('\n');
        stacks.splice(1, 6);
        this.stack = stacks.join('\n');
    }
}

export class Output {
    [key: string]: any

    timestamp: number | string = Date.now()
    message: string = ''

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
        public error: Error = new DebugError()) { }
}

export function filterLevel(levels: string[]) {
    let _level = 0;
    return [
        // canOutputLevel(level: number, args: any[])
        (level: number, levelName: string, args: any[]) => level >= _level ? undefined : null,
        // setLevel(level: string)
        (level: string) => _level = levels.indexOf(level),
    ] as [(level: number, levelName: string, args: any[]) => null | undefined, (level: string) => void];
}

export function useErrorInFirstArg(level: number, levelName: string, args: any[]) {
    if (!(args[0] instanceof Error)) return;

    return new Output(levelName, args[1], args.slice(2), args[0]);
}

export function common(level: number, levelName: string, args: any[]) {
    return new Output(levelName, args[0], args.slice(1));
}
