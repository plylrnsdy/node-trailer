import { identity } from "lodash"
import appender from "./appender"


/**
 * print log's content
 */
export default function message() {
  return appender<any[]>({
    name: message.name,
    raw: ({ args }) => args,
    text: args => args.map(arg => arg + '').join(' '),
    colorize: identity,
  })
}
