import * as path from 'path';
import { Options } from '.';
import { useErrorInFirstArg, common } from "./accepters";
import { date, level, message, stack, colorOutput } from "./handlers";
import { colorConsole } from "./appenders";

const theme = (color: string) =>
    `[{{timestamp}}] {{style.${color}}}{{style.inverse}} {{level}} {{style.no_inverse}} {{message}}{{style.clear}} @ {{method}} ({{file}}:{{line}}:{{pos}})`;

const themeError = `[{{timestamp}}] {{style.red}}{{style.inverse}} {{level}} {{style.no_inverse}} {{message}}{{style.clear}}
[{{style.grey}}{{timestamp}}{{style.clear}}] {{style.magenta}}{{style.inverse}} E.MSG {{style.no_inverse}} {{error.message}}{{style.clear}}
{{error.stack}}
`;

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
    levels: ['log', 'debug', 'info', 'warn', 'error', 'fatal'],
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
