import { basename } from 'path';


// Stack trace format: https://v8.dev/docs/stack-trace-api
const stackRe = /at (.+) \(((?:\w:)?[^:]+):(\d+):(\d+)\)/i;
const stackRe2 = /at ()((?:\w:)?[^:]+):(\d+):(\d+)/i;

export default function parsePosition(error: Error, skip = 0) {
  const [row] = error.stack?.split('\n')[skip]?.match(/at .+/) ?? [];

  if (!row) return null

  const [, method = '', path = '', line = '', pos = ''] = row.match(stackRe)
    ?? row.match(stackRe2)
    ?? [];

  return {
    method,
    path,
    file: basename(path),
    line: +line,
    pos: +pos,
  }
}
