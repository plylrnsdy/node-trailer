import * as chalk from 'chalk'
import type { Color } from 'chalk'
import { LoggerContext } from "@/."
import { Level } from "@/core/levels"
import appender from "./appender"


interface LevelOptions {
  /**
   * Use default colorize function based on level-color map
   */
  levelColor?: Record<Level, typeof Color>
  /**
   * Custom colorize function
   */
  colorize?: (ctx: LoggerContext, text: string) => string
}

/**
 * Print log's level
 *
 * @param levelColor a mapping from level to color
 * @category middleware:appender
 */
export default function level(options: LevelOptions) {
  const { levelColor, colorize } = options
  const raw = ({ level }: LoggerContext) => level
  const text = (ctx: LoggerContext) => raw(ctx).toUpperCase().padEnd(5)
  const defaultColorize = (ctx: LoggerContext) => chalk[levelColor![ctx.level]](text(ctx))

  return appender<string>({
    name: level.name,
    raw,
    text,
    colorize: colorize
      ? ctx => colorize(ctx, text(ctx))
      : levelColor ? defaultColorize : text,
  })
}
