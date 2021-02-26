/**
 * Console color control character.
 */
export const style = {
  /**
   * Clear font and background style.
   */
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
  /**
   * Clear font style.
   */
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
  /**
   * Clear background style.
   */
  bg_reset: '\x1B[49m',
  bg_grey: '\x1B[49;5;8m',
}

export function font(s: string, text: string) {
  return style[s] + text + style.reset
}

export function bg(s: string, text: string) {
  return style['bg_' + s] + text + style.bg_reset
}
