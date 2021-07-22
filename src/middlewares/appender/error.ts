import DebugError from "@/core/debug-error"
import * as stackCleaner from '@/utils/formatter/clean-stack'
import { font } from "@/utils/formatter/console-style"
import indent from "@/utils/formatter/indent"
import flow from "@/utils/function/flow"
import partial from "@/utils/function/partial"
import { LoggerContext } from "@/."
import appender from "./appender"


const callerPos = (e: DebugError) => `@ ${e.method} (${e.file}:${e.line}:${e.pos})`

const hoc = (fn: (s: string) => string) =>
  ({ error: e }: LoggerContext) => e instanceof DebugError
    ? callerPos(e)
    : `\n${fn(e.stack!)}\n`

const indent4 = partial(indent, 4)

const raw = ({ error: e }: LoggerContext) => ({
  type: e.constructor.name,
  message: e.message,
  stack: e.stack
})

/**
 * When no error in log, print call stack;
 * When an error in log, print Error with the simplified stack.
 *
 * @param root project's root path
 * @category middleware:appender
 */
export default function error(root = process.cwd()) {
  const clear = flow(
    stackCleaner.rejectNative(),
    stackCleaner.rejectThirdPart(),
    stackCleaner.simplifyRoot(root),
    indent4,
  )

  const text = hoc(clear)
  const colorize = (ctx: LoggerContext) => {
    const txt = text(ctx)
    return txt.startsWith('@') ? font('grey', txt) : txt
  }

  return appender<ReturnType<typeof raw>>({
    name: error.name,
    raw,
    text,
    colorize,
  })
}
