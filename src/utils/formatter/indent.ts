/**
 * Add indent for multiple line string.
 *
 * @param indent Whitespace count of indentation.
 * @param string Multiple line string.
 */
export default function indent(indent: number, string: string) {
  return string.replace(/(?:^|\n)(?!\n)/g, '\n' + ' '.repeat(indent));
}
