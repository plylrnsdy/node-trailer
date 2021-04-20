import { Level } from "@/core/levels"
import { font } from "@/utils/formatter/console-style"
import { LoggerContext } from "@/."
import appender from "./appender"

/**
 * Print log's level
 *
 * @param levelColor a mapping from level to color
 */
export default function level(levelColor: Record<Level, string>) {
  const raw = ({ level }: LoggerContext) => level
  const text = (ctx: LoggerContext) => raw(ctx).toUpperCase().padEnd(5)
  const colorize = (ctx: LoggerContext) => font(levelColor[ctx.level], text(ctx))

  return appender<string>({
    name: level.name,
    raw,
    text,
    colorize,
  })
}
