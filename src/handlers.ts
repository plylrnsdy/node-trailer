import * as _ from './util';
import * as Path from 'path';
import * as util from 'util';
import { Output } from './accepters';


export const date = {
    format(template: string) {
        return function (output: Output) {
            let date = new Date(output.timestamp);
            output.timestamp = _.dateFormat(template, date)
        }
    }
}

export const level = {
    upper(output: Output) {
        output.level = output.level.toUpperCase();
    },
    padEnd(width: number) {
        return function (output: Output) {
            output.level = _.padEnd(output.level, width);
        }
    }
}

export const message = {
    format(output: Output) {
        if (!output.template) return;
        output.message = util.format(output.template, ...output.args);
    }
}

// Stack trace format: https://v8.dev/docs/stack-trace-api
const stackRe = /at (.+) \((?:\w:)?([^:]+):(\d+):(\d+)\)/i;
const stackRe2 = /at ()([^:]+):(\d+):(\d+)/i;
const emptyArray = ['', '', '', '', ''];

export const stack = {
    filterTop(level: number) {
        return function (output: Output) {
            let { error } = output;
            error.stack = (<string>error.stack).split('\n').slice(level).join('\n');
        }
    },
    simplifyRoot(root: string, replacement: string = '~') {
        let re = new RegExp(_.escapeRegExp(root), 'g');

        return function (output: Output) {
            output.error.stack = (<string>output.error.stack).replace(re, replacement);
        }
    },
    extract(featrue: RegExp = /at .+/) {

        return function (output: Output) {
            let row = (<string>output.error.stack).match(featrue);
            if (row) {
                let [, method, path, line, pos] = row[0].match(stackRe) || row[0].match(stackRe2) || emptyArray;
                output.method = method;
                output.path = path;
                output.file = Path.basename(path);
                output.line = line;
                output.pos = pos;
            }
        }
    },
    filterThirdPart(output: Output) {
        output.error.stack = (<string>output.error.stack).replace(/\n?.+node_modules.+/g, '');
    },
    filterNative(output: Output) {
        output.error.stack = (<string>output.error.stack).replace(/\n?.+\(internal\/.+/g, '');
    }
}

export const output = {
    format(template: string) {
        let plainTemplate = template.replace(/\{\{[^}]+\}\}/g, '')
        return (output: Output) =>
            output.output = _.format(plainTemplate, output);
    }
}

export const colorOutput = {
    format(template: string) {
        return (output: Output) => {
            output.colorOutput = _.format(template, output);
        }
    }
}
