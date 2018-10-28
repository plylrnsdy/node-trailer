import * as _ from './util';
import * as _console from "console";
import DEFAULT_OPTIONS from './defaultOptions';
import { Output } from './accepters';


export interface Options {
    [level: string]: Record<string, any> & {
        accepters?: Array<(level: string, args: any[]) => Output | void>
        handlers?: Array<(output: Output) => void>
        appenders?: Array<(output: Output) => void>
    }
}
interface DefaultOptions extends Record<string, any> {
    accepters: Array<(level: string, args: any[]) => Output | void>
    handlers: Array<(output: Output) => void>
    appenders: Array<(output: Output) => void>
}
export interface Level<T> extends Record<string, T> { }
export interface Trailer extends Level<(...args: any[]) => void> { }

export function create(options?: Options & { levels?: string[] }) {
    let logger: Trailer = {};

    if (options)
        if (options.default)
            for (let prop of ['accepters', 'handlers', 'appenders'])
                options.default[prop] || (options.default[prop] = DEFAULT_OPTIONS.default[prop]);
        else
            options.default = DEFAULT_OPTIONS.default;
    else
        options = DEFAULT_OPTIONS;

    _.arrayEach(options.levels || DEFAULT_OPTIONS.levels, level => {
        logger[level] = (...args: any[]) => log(options as Options, level, args)
    });

    return logger;
}

function log(options: Options, level: string, args: any[]) {
    let _default = options.default as DefaultOptions;
    let _level = options[level] || _default;
    let output: any = null;

    _.arrayEach(_level.accepters || _default.accepters, accepter => {
        output = accepter(level, args);
        return output === undefined;
    });
    if (!output) return;

    _.arrayEach(_level.handlers || _default.handlers, handler =>
        handler(output as Output));

    _.arrayEach(_level.appenders || _default.appenders, appender =>
        appender(output as Output));
}

export const defaultOptions = DEFAULT_OPTIONS;

export const accepters = require('./accepters');

export const handlers = require('./handlers');

export const appenders = require('./appenders');

export const util = require('./util');
