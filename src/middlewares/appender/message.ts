import { identity } from "lodash"
import { LoggerContext } from "@/index"
import messagePart from "./message-part"


export default function message() {
  return messagePart<LoggerContext, any[]>({
    name: 'message',
    part: ({ args }) => args,
    raw: args => args.map(arg => arg + '').join(' '),
    colorize: identity,
  })
}
