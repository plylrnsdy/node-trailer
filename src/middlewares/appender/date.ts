import { identity } from "lodash"
import { LoggerContext } from "@/index"
import dateFormat from "@/utils/formatter/date-format"
import messagePart from "./message-part"


/**
 * Print current date & time
 *
 * @param format Format of date & time, default as `'[YYYY-MM-DD HH:mm:ss]'`
 */
export default function date(format: string = '[YYYY-MM-DD HH:mm:ss]') {
  return messagePart<LoggerContext, Date>({
    name: 'date',
    part: () => new Date(),
    raw: (date) => dateFormat(format, date),
    colorize: identity,
  })
}
