import * as _ from './util';
import * as Path from 'path';
import * as util from 'util';
import { Output } from './Accepter';

export function levelUpper(output: Output) {
    output.level = output.level.toUpperCase();
}
export function levelPad(width: number) {
    return function (output: Output) {
        output.level = _.padEnd(output.level, width);
    }
}

export function filterTop(level: number) {
    return function (output: Output) {
        let { error } = output;
        let _level = level;
        'Trailing... ' === error.message && (_level = 7);
        error.stack = (<string>error.stack).split('\n').slice(_level).join('\n');
    }
}
export function simplifyRoot(root: string, replacement: string = '~') {
    let re = new RegExp(_.escapeRegExp(root), 'g');

    return function (output: Output) {
        output.error.stack = (<string>output.error.stack).replace(re, replacement);
    }
}
// Stack trace format: https://v8.dev/docs/stack-trace-api
const stackRe = /at (.+) \(([^:]+):(\d+):(\d+)\)/i;
const stackRe2 = /at ()([^:]+):(\d+):(\d+)/i;
const emptyArray = ['', '', '', '', ''];
export function extract(featrue: string = '~') {
    let re = new RegExp(`.+${_.escapeRegExp(featrue)}.+`);

    return function (output: Output) {
        let row = (<string>output.error.stack).match(re);
        if (row) {
            let [, method, path, line, pos] = row[0].match(stackRe) || row[0].match(stackRe2) || emptyArray;
            output.method = method;
            output.path = path;
            output.file = Path.basename(path);
            output.line = line;
            output.pos = pos;
        }
    }
}
export function filterThirdPart(output: Output) {
    output.error.stack = (<string>output.error.stack).replace(/\n?.+node_modules.+/g, '');
}
export function filterNative(output: Output) {
    output.error.stack = (<string>output.error.stack).replace(/\n?.+\(internal\/.+/g, '');
}

export function logFormatter(template: string) {
    let plainTemplate = template.replace(/\{\{[^}]+\}\}/g, '')
    return (output: Output) =>
        output.output = _.format(plainTemplate, output);
}
export function colorLogFormatter(template: string) {
    return (output: Output) => {
        output.colorOutput = _.format(template, output);
    }
}
export function dateFormatter(template: string) {
    return function (output: Output) {
        let date = new Date(output.timestamp);
        output.timestamp = _.dateFormat(template, date)
    }
}
export function messageFormatter(output: Output) {
    if (!output.template) return;
    output.message = util.format(output.template, ...output.args);
}
