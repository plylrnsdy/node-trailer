import * as _ from './util';
import * as Path from 'path';
import * as util from 'util';
import { Output } from './accepters';


export const date = {
    /**
     * Return a handler for formating date with template, use `yyyy`, `yy`, `mm`, `dd`, `hh`, `MM`, `ss`, `SSS`, `O`.
     */
    format(template: string) {
        return function (output: Output) {
            let date = new Date(output.timestamp);
            output.timestamp = _.dateFormat(template, date)
        }
    }
}

export const level = {
    /**
     * A handler for converting Output#`level` to upper.
     */
    upper(output: Output) {
        output.level = output.level.toUpperCase();
    },
    /**
     * Return a handler to ensure Output#`level` min-length equaling to `width`, if less than `width`, filling with whitespace.
     */
    padEnd(width: number) {
        return (output: Output) =>
            output.level = _.padEnd(output.level, width);
    }
}

export const message = {
    /**
     * A handler for generating Output#`message` with printf-like template.
     */
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
    /**
     * Return a handler to remove Output#`error.stack` line 1 to `level`, line 1 is `Error: <error.message>`.
     */
    filterTop(line: number) {
        return function (output: Output) {
            let { error } = output;
            error.stack = (<string>error.stack).split('\n').slice(line).join('\n');
        }
    },
    /**
     * Return a handler to replace the path `root` in `stack` with `replacement`.
     * @param root path of current project.
     * @param replacement string for replacing `root`.
     */
    simplifyRoot(root: string, replacement: string = '~') {
        let re = new RegExp(_.escapeRegExp(root), 'g');

        return (output: Output) =>
            output.error.stack = (<string>output.error.stack).replace(re, replacement);
    },
    /**
     * Return a handler to extract Output#`method`, Output#`path`, Output#`file`, Output#`line` and Output#`pos` from Output#`error.stack` matched `featrue` first.
     * @param featrue Default to be `/at .+/`.
     */
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
    /**
     * A handler for removing the row contain `node_modules` in Output#`error.stack`.
     */
    filterThirdPart(output: Output) {
        output.error.stack = (<string>output.error.stack).replace(/\n?.+node_modules.+/g, '');
    },
    /**
     * A handler for removing the row contain `internal` in Output#`error.stack`.
     */
    filterNative(output: Output) {
        output.error.stack = (<string>output.error.stack).replace(/\n?.+\(internal\/.+/g, '');
    }
}

export const output = {
    /**
     * Return a handler to format `Output` data with `template` and save in Output#`output`.
     * @param template
     *     1. `{{prop.sub_prop}}` will fill with the content of Output#`prop.sub_prop`.
     *     2. Can contain `{{style.xxx}}`, but it will be ignore.
     */
    format(template: string | ((output: Output) => string)) {
        if (typeof template === 'string') {
            let plainTemplate = template.replace(/\{\{[^}]+\}\}/g, '');
            return (output: Output) =>
                output.output = _.format(plainTemplate, output);
        } else {
            return (output: Output) =>
                output.output = _.format(template(output), output);
        }
    }
}

export const colorOutput = {
    /**
     * Return a handler to format `Output` data with `template` and save in Output#`colorOutput`.
     * @param template
     *     1. `{{prop.sub_prop}}` will fill with the content of Output#`prop.sub_prop`.
     *     2. `{{style.xxx}}` will fill with the content of Output#`style.xxx`, after this string will show color as `xxx` in console.
     */
    format(template: string | ((output: Output) => string)) {
        return typeof template === 'string'
            ? (output: Output) => output.colorOutput = _.format(template, output)
            : (output: Output) => output.colorOutput = _.format(template(output), output);
    }
}
