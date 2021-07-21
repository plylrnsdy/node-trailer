import * as util from "util"
import { LoggerContext } from "@/."
import appender from "./appender"


/**
 * print log's content
 *
 * @category middleware:appender
 */
export default function message() {
  const raw = ({ args }: LoggerContext) => args
  const text = (ctx: LoggerContext) => raw(ctx)
    .map(arg => typeof arg === 'object' ? util.inspect(arg, false) : arg.toString())
    .join(' ')

  return appender<any[]>({
    name: message.name,
    raw,
    text,
    colorize: text,
  })
}
