import { identity } from "lodash"
import dateFormat from "@/utils/formatter/date-format"
import appender from "./appender"


/**
 * Print current date & time
 *
 * @param format Format of date & time, default as `'[YYYY-MM-DD HH:mm:ss]'`
 */
export default function date(format: string = '[YYYY-MM-DD HH:mm:ss]') {
  return appender<Date>({
    name: date.name,
    raw: () => new Date(),
    text: (date) => dateFormat(format, date),
    colorize: identity,
  })
}
