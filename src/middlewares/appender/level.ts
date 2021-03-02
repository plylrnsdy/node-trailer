import { LoggerContext } from "@/index"
import { Level } from "@/core/levels"
import { font } from "@/utils/formatter/console-style"
import appender from "./appender"

/**
 * Print log's level
 *
 * @param levelColor a mapping from level to color
 */
export default function level(levelColor: Record<Level, string>) {
  return appender<LoggerContext, string>({
    name: 'level',
    raw: ({ level }) => level,
    text: level => level.toUpperCase().padEnd(5),
    colorize: (raw, { level }) => font(levelColor[level], raw),
  })
}
