import { LoggerContext } from "@/index"
import { Level } from "@/core/levels"
import { font } from "@/utils/formatter/console-style"
import messagePart from "./message-part"


export default function level(levelColor: Record<Level, string>) {
  return messagePart<LoggerContext, string>({
    name: 'level',
    part: ({ level }) => level,
    raw: level => level.toUpperCase().padEnd(5),
    colorize: (raw, { level }) => font(levelColor[level], raw),
  })
}
