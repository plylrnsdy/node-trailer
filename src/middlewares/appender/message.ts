import { identity } from "lodash"
import { LoggerContext } from "@/index"
import appender from "./appender"


/**
 * print log's content
 */
export default function message() {
  return appender<LoggerContext, any[]>({
    name: 'message',
    raw: ({ args }) => args,
    text: args => args.map(arg => arg + '').join(' '),
    colorize: identity,
  })
}
