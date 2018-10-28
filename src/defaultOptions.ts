import * as path from 'path';
import { Options } from '.';
import { filterLevel, useErrorInFirstArg, common, Output } from "./accepters";
import { date, level, message, stack, colorOutput } from "./handlers";
import { colorConsole } from "./appenders";

const DEFAULT_LEVELS =  ['log', 'debug', 'info', 'warn', 'error', 'fatal'];
const [filterLowLevel, setLevel] = filterLevel(DEFAULT_LEVELS);

const theme = (color: string) =>
    `[{{timestamp}}] {{style.${color}}}{{style.inverse}} {{level}} {{style.no_inverse}} {{message}}{{style.clear}} {{style.grey}}@ {{method}} ({{file}} :{{line}}:{{pos}}){{style.clear}}`;

// Template with condition
const themeError = (output: Output) =>
    output.error.message
        ? '[{{timestamp}}] {{style.red}}{{style.inverse}} {{level}} {{style.no_inverse}} {{message}}{{style.clear}}\n[{{style.grey}}{{timestamp}}{{style.clear}}] {{style.magenta}}{{style.inverse}} E.MSG {{style.no_inverse}} {{error.message}}{{style.clear}}\n{{error.stack}}\n'
        : '[{{timestamp}}] {{style.red}}{{style.inverse}} {{level}} {{style.no_inverse}} {{message}}{{style.clear}}\n{{error.stack}}\n';

const
    h1 = date.format('yyyy-mm-dd_hh:MM:ss'),
    h2 = level.upper,
    h3 = level.padEnd(5),
    h4 = message.format,
    h5 = stack.filterTop(1),
    h6 = stack.filterNative,
    h7 = stack.simplifyRoot(path.resolve('.'), '~'),
    h8 = stack.extract();

const DEFAULT_HANDLERS = [h1, h2, h3, h4, h5,         h8, colorOutput.format(theme('white'))];
const   DEBUG_HANDLERS = [h1, h2, h3, h4, h5,         h8, colorOutput.format(theme('cyan'))];
const    WARN_HANDLERS = [h1, h2, h3, h4, h5,         h8, colorOutput.format(theme('yellow'))];
const    INFO_HANDLERS = [h1, h2, h3, h4, h5,         h8, colorOutput.format(theme('green'))];
const   ERROR_HANDLERS = [h1, h2, h3, h4, h5, h6, h7,     colorOutput.format(themeError)];

const DEFAULT_OPTIONS: Options & { levels: string[] } = {
    levels: DEFAULT_LEVELS,
    default: {
        accepters: [
            filterLowLevel,
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
    __setLevel__: setLevel,
}

export default DEFAULT_OPTIONS;
