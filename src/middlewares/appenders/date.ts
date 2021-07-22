import dateFormat from "@/utils/formatter/date-format"
import appender from "./appender"


const raw = () => new Date()

/**
 * Print current date & time
 *
 * @param format Format of date & time, default as `'[YYYY-MM-DD HH:mm:ss]'`
 * @category middleware:appender
 */
export default function date(format = '[YYYY-MM-DD HH:mm:ss]') {
  const text = () => dateFormat(format, raw())

  return appender<Date>({
    name: date.name,
    raw,
    text,
    colorize: text,
  })
}
