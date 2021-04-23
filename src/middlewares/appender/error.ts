import { partial, flow } from "lodash"
import DebugError from "@/core/debug-error"
import * as stackCleaner from '@/utils/formatter/clean-stack'
import { font } from "@/utils/formatter/console-style"
import indent from "@/utils/formatter/indent"
import { LoggerContext } from "@/."
import appender from "./appender"


/**
 * When no error in log, print call stack;
 * When an error in log, print Error with the simplified stack.
 *
 * @param root project's root path
 * @category middleware:appender
 */
export default function error(root: string = process.cwd()) {

  const callerPos = (e: DebugError) => `@ ${e.method} (${e.file}:${e.line}:${e.pos})`

  const clear = flow(
    stackCleaner.rejectNative(),
    stackCleaner.rejectThirdPart(),
    stackCleaner.simplifyRoot(root),
    partial(indent, 4),
  )

  const raw = ({ error: e }: LoggerContext) => e instanceof DebugError
    ? callerPos(e)
    : indent(4, e.stack!) + '\n'

  const text = ({ error: e }: LoggerContext) => e instanceof DebugError
    ? callerPos(e)
    : clear(e.stack!) + '\n'

  const colorize = (ctx: LoggerContext) => {
    const txt = text(ctx)
    return txt.startsWith('@') ? font('grey', txt) : txt
  }

  return appender<string>({
    name: error.name,
    raw,
    text,
    colorize,
  })
}
