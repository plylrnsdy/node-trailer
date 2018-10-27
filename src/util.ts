
export function arrayEach<T>(arr: ArrayLike<T>, iterator: (v: T, k: number, arr: ArrayLike<T>) => void | boolean): void {
    for (let i = 0; i < arr.length; i++)
        if (iterator(arr[i], i, arr) === false)
            return;
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
        yy: date.getFullYear().toString().slice(2, 4),
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        hh: date.getHours(),
        MM: date.getMinutes(),
        ss: date.getSeconds(),
        SSS: date.getMilliseconds().toFixed(3),
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

    noBold: '\x1B[22m',
    noItalic: '\x1B[23m',
    noUnderline: '\x1B[24m',
    noInverse: '\x1B[27m',
    noStrikethrough: '\x1B[29m',

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

    bgBlack: '\x1B[40m',
    bgRed: '\x1B[41m',
    bgGreen: '\x1B[42m',
    bgYellow: '\x1B[43m',
    bgBlue: '\x1B[44m',
    bgMagenta: '\x1B[45m',
    bgCyan: '\x1B[46m',
    bgWhite: '\x1B[47m',
    bgReset: '\x1B[49m',
    bgGrey: '\x1B[49;5;8m',
}
