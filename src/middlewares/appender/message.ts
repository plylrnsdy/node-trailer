import { LoggerContext } from "@/."
import appender from "./appender"


/**
 * print log's content
 *
 * @category middleware:appender
 */
export default function message() {
  const raw = ({ args }: LoggerContext) => args
  const text = (ctx: LoggerContext) => raw(ctx).map(arg => arg + '').join(' ')

  return appender<any[]>({
    name: message.name,
    raw,
    text,
    colorize: text,
  })
}
