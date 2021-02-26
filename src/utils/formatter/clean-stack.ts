import escapeRegExp from "../escape-regexp";


/**
 * Return a handler to replace the path `root` in `stack` with `replacement`.
 * @param root path of current project.
 * @param replacement string for replacing `root`.
 */
export function simplifyRoot(root: string, replacement: string = '~') {
  const re = new RegExp(escapeRegExp(root), 'g');

  return (stack: string) => {
    return stack.replace(re, replacement)
  }
}

/**
 * Remove the row contain `node_modules` in Context#`error.stack`.
 */
export function rejectThirdPart() {
  return (stack: string) => {
    return stack.replace(/\n?.+node_modules.+/g, '')
  }
}

/**
 * Remove the row contain `internal` in Output#`error.stack`.
 */
export function rejectNative() {
  return (stack: string) => {
    return stack.replace(/\n?.+\(internal\/.+/g, '')
  }
}
