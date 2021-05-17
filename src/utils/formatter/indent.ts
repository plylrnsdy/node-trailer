/**
 * Add indent for multiple line string.
 *
 * @param indent Whitespace count of indentation.
 * @param string Multiple line string.
 */
export default function indent(indent: number, string: string) {
  return string.split('\n').map(line => ' '.repeat(indent) + line).join('\n')
}
