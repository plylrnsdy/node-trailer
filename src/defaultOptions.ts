import * as path from 'path';
import { Options } from '.';
import { useErrorInFirstArg, common } from "./Accepter";
import { filterNative, simplifyRoot, filterTop, messageFormatter, colorLogFormatter, dateFormatter, extract, levelUpper, levelPad } from "./Handler";
import { colorConsole } from "./Appender";

const theme = (color: string) =>
    `[{{style.grey}}{{timestamp}}{{style.clear}}] {{style.${color}}}{{style.inverse}} {{level}} {{style.noInverse}} {{message}}{{style.clear}} @ {{method}} ({{file}}:{{line}}:{{pos}})`;

const DEFAULT_HANDLERS = [
    dateFormatter('yyyy-mm-dd_hh:MM:ss.SSS'),
    levelUpper,
    levelPad(5),
    messageFormatter,
];
let m = DEFAULT_HANDLERS.length;
DEFAULT_HANDLERS.push(
    filterTop(1),
    simplifyRoot(path.resolve('.'), '~'),
    extract('~'),

    colorLogFormatter(theme('white')),
);
let n = DEFAULT_HANDLERS.length;

const DEBUG_HANDLERS = DEFAULT_HANDLERS.slice(0, n);
DEBUG_HANDLERS[n] = colorLogFormatter(theme('cyan'));

const INFO_HANDLERS = DEFAULT_HANDLERS.slice(0, n);
INFO_HANDLERS[n] = colorLogFormatter(theme('green'));

const WARN_HANDLERS = DEFAULT_HANDLERS.slice(0, n);
WARN_HANDLERS[n] = colorLogFormatter(theme('yellow'));

const ERROR_HANDLERS = DEFAULT_HANDLERS.slice(0, n);
ERROR_HANDLERS.splice(m + 1, 0, filterNative);
ERROR_HANDLERS[n + 1] = colorLogFormatter(
    '[{{timestamp}}] {{style.red}}{{style.inverse}} {{level}} {{style.noInverse}} {{error.message}}{{style.clear}}\n{{error.stack}}\n');


const DEFAULT_OPTIONS: Options = {
    default: {
        accepters: [
            useErrorInFirstArg,
            common,
        ],
        handlers: DEFAULT_HANDLERS,
        appenders: [colorConsole],
    },
    debug: { handlers: DEBUG_HANDLERS },
    info: { handlers: INFO_HANDLERS },
    warn: { handlers: WARN_HANDLERS },
    error: { handlers: ERROR_HANDLERS },
    fatal: { handlers: ERROR_HANDLERS },
}

export default DEFAULT_OPTIONS;
