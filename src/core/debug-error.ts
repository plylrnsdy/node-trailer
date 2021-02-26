import * as path from 'path';


// Stack trace format: https://v8.dev/docs/stack-trace-api
const stackRe = /at (.+) \((?:\w:)?([^:]+):(\d+):(\d+)\)/i;
const stackRe2 = /at ()([^:]+):(\d+):(\d+)/i;

export default class DebugError extends Error {

  method: string = ''
  path: string = ''
  file: string = ''
  line: string = ''
  pos: string = ''

  constructor() {
    super();

    const [row] = (<string>this.stack).split('\n')[2]?.match(/at .+/) ?? [];

    if (row) {
      const [, $method = '', $path = '', $line = '', $pos = ''] = row.match(stackRe)
        ?? row.match(stackRe2)
        ?? [];
      this.method = $method;
      this.path = $path;
      this.file = path.basename($path);
      this.line = $line;
      this.pos = $pos;
    }
  }
}