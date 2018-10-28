
export function arrayEach<T>(arr: ArrayLike<T>, iterator: (v: T, k: number, arr: ArrayLike<T>) => void | boolean): void {
    for (let i = 0; i < arr.length; i++)
        if (iterator(arr[i], i, arr) === false)
            return;
}

export default function padStart(str: string, length: number, char: string = ' ') {
    return str.length >= length
        ? str
        : char.repeat(length).slice(0, length - str.length) + str;
}

export function padEnd(str: string, length: number, char: string = ' ') {
    return str.length >= length
        ? str
        : (str + char.repeat(length)).slice(0, length);
}

const regexpToken = /[\^$.*+?()[\]{}|\\]/g;
export function escapeRegExp(str: string): string {
    return str.replace(regexpToken, '\\$&');
}

const templateToken = /(?!=\\)\{\{([^}]+)\}\}/g;
export function format(template: string, dataObject: any): string {
    return template.replace(templateToken,
        (match: string, variable: string) => get(dataObject, toPath(variable) || ''));
}

export function get(object: any, path: string | number | (string | number)[], defaultValue?: any): any {
    let portions = Array.isArray(path) ? path : toPath(path),
        current = object;

    for (let i = 0; i < portions.length; i++) {
        current = current[portions[i]];
        if (current === undefined) return defaultValue;
    }
    return current;
}

const bothEndsDelimiter = /^\[|\]$/g;
const delimiters = /^\[|\]?(?:\[|\.)|\]$/;
export function toPath(path: string | number): (string | number)[] {
    if (typeof path === 'number') return [path];

    return path.replace(bothEndsDelimiter, '')
        .split(delimiters);
}

export function dateFormat(template: string, date: Date) {
    let data: Record<string, number | string> = {
        yyyy: date.getFullYear(),
        yy: ('' + date.getFullYear()).slice(2, 4),
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        hh: date.getHours(),
        MM: date.getMinutes(),
        ss: date.getSeconds(),
        SSS: padStart('' + date.getMilliseconds(), 3, '0'),
        O: date.getTimezoneOffset(),
    }
    return fillTemplate(template, data);
}

export function fillTemplate(template: string, dataObject: any) {
    for (let token in dataObject)
        template = template.replace(token, (match: string) => '' + dataObject[match]);
    return template;
}

export const style = {
    clear: '\x1B[0m',
    bold: '\x1B[1m',
    italic: '\x1B[3m',
    underline: '\x1B[4m',
    inverse: '\x1B[7m',
    strikethrough: '\x1B[9m',

    no_bold: '\x1B[22m',
    no_italic: '\x1B[23m',
    no_underline: '\x1B[24m',
    no_inverse: '\x1B[27m',
    no_strikethrough: '\x1B[29m',

    black: '\x1B[30m',
    red: '\x1B[31m',
    green: '\x1B[32m',
    yellow: '\x1B[33m',
    blue: '\x1B[34m',
    magenta: '\x1B[35m',
    cyan: '\x1B[36m',
    white: '\x1B[37m',
    reset: '\x1B[39m',
    grey: '\x1B[90m',

    bg_black: '\x1B[40m',
    bg_red: '\x1B[41m',
    bg_green: '\x1B[42m',
    bg_yellow: '\x1B[43m',
    bg_blue: '\x1B[44m',
    bg_magenta: '\x1B[45m',
    bg_cyan: '\x1B[46m',
    bg_white: '\x1B[47m',
    bg_reset: '\x1B[49m',
    bg_grey: '\x1B[49;5;8m',
}
