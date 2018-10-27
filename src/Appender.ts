import * as _console from 'console';
import { Output } from './Accepter';
import * as fs from 'fs';


export function console(output: Output) {
    _console.log(output.output);
}
export function colorConsole(output: Output) {
    _console.log(output.colorOutput);
}

export function file(path: string) {
    return function (output: Output) {
        fs.appendFile(path, output.output, error =>
            error && _console.log(`\n${error.message}\n`));
    }
}
