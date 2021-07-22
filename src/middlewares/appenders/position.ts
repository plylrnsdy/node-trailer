import { LoggerContext } from "@/index"
import { appender } from "@/middlewares/appenders"
import parsePosition from "@/utils/error/parse-position"
import { font } from "@/utils/formatter/console-style"


type Position = NonNullable<ReturnType<typeof parsePosition>>

const callerPos = (p: Position) => `@ ${p.method} (${p.file}:${p.line}:${p.pos})`

const raw = (ctx: LoggerContext) => parsePosition(ctx.positionError, 2)
const text = (ctx: LoggerContext) => callerPos(raw(ctx)!)
const colorize = (ctx: LoggerContext) => font('grey', text(ctx))

/**
 * print the position of the logger method called
 *
 * @category middleware:appender
 */
export default function position() {
  return appender({
    name: position.name,
    raw,
    text,
    colorize,
  })
}
