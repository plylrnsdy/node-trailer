import { Level } from "@/core/levels"
import { font } from "@/utils/formatter/console-style"
import appender from "./appender"

/**
 * Print log's level
 *
 * @param levelColor a mapping from level to color
 */
export default function level(levelColor: Record<Level, string>) {
  return appender<string>({
    name: level.name,
    raw: ({ level }) => level,
    text: level => level.toUpperCase().padEnd(5),
    colorize: (text, { level }) => font(levelColor[level], text),
  })
}
