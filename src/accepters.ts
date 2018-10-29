import { style } from './util'


export class DebugError extends Error {
    constructor() {
        super();
        let stacks = (<string>this.stack).split('\n');
        stacks.splice(1, 6);
        this.stack = stacks.join('\n');
    }
}

/**
 * Carry the log data for transforming as log string and transport to appender(e.g. console).
 */
export class Output {
    [key: string]: any

    timestamp: number | string = Date.now()
    message: string = ''

    method: string = ''
    path: string = ''
    file: string = ''
    line: string = ''
    pos: string = ''

    /**
     * Console color control character.
     */
    style = style

    constructor(
        public level: string,
        public template: string = '',
        public args: any[],
        public error: Error = new DebugError()) { }
}

/**
 * Support `setLevel(minLevel)` to limit min-level to transport for next handling.
 * @param levels all user's defined levels.
 * @return [`filterLowLevel`, `setLevel`]
 *
 */
export function filterLevel(levels: string[]) {
    let _level = 0;
    return [
        // canOutputLevel(level: number, args: any[])
        (level: number, levelName: string, args: any[]) => level >= _level ? undefined : null,
        // setLevel(level: string)
        (level: string) => _level = levels.indexOf(level),
    ] as [(level: number, levelName: string, args: any[]) => null | undefined, (level: string) => void];
}

/**
 *  If first args is instance of `Error`, use it as Output#`error` as source of `stack`.
 * @param level current log's level number.
 * @param levelName current log's level name.
 * @param args current log's user-input.
 */
export function useErrorInFirstArg(level: number, levelName: string, args: any[]) {
    if (!(args[0] instanceof Error)) return;

    return new Output(levelName, args[1], args.slice(2), args[0]);
}

/**
 * Use build-in error as Output#`error` as source of `stack`.
 * @param level current log's level number.
 * @param levelName current log's level name.
 * @param args current log's user-input.
 */
export function common(level: number, levelName: string, args: any[]) {
    return new Output(levelName, args[0], args.slice(1));
}
