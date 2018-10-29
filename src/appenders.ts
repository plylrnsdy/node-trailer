import * as _console from 'console';
import { Output } from './accepters';
import * as fs from 'fs';


/**
 * Transport Output#`output` to console.
 */
export function console(output: Output) {
    _console.log(output.output);
}
/**
 * Transport Output#`colorOutput` to console.
 */
export function colorConsole(output: Output) {
    _console.log(output.colorOutput);
}

/**
 * Retrun an appender to transport Output#`output` to file.
 * @param path log-file's path.
 */
export function file(path: string) {
    return function (output: Output) {
        fs.appendFile(path, output.output, error =>
            error && _console.log(`\n${error.message}\n`));
    }
}
