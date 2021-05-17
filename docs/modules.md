[node-trailer - v0.2.2](README.md) / Exports

# node-trailer - v0.2.2

**`typicalname`** trailer

## Table of contents

### Interfaces

- [Appender](interfaces/appender.md)

### Type aliases

- [Logger](modules.md#logger)
- [LoggerContext](modules.md#loggercontext)
- [LoggerOptions](modules.md#loggeroptions)
- [Middleware](modules.md#middleware)

### Other Functions

- [createLogger](modules.md#createlogger)

### middleware Functions

- [filter](modules.md#filter)

### middleware:appender Functions

- [date](modules.md#date)
- [error](modules.md#error)
- [level](modules.md#level)
- [message](modules.md#message)

### middleware:output Functions

- [colorConsole](modules.md#colorconsole)
- [logFile](modules.md#logfile)

## Type aliases

### Logger

Ƭ **Logger**: *Record*<Level, (...`args`: *any*[]) => *void*\>

Defined in: [index.ts:43](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/index.ts#L43)

___

### LoggerContext

Ƭ **LoggerContext**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`appenders` | [*Appender*](interfaces/appender.md)<any\>[] |
`args` | *any*[] |
`error` | Error |
`level` | Level |
`options` | [*LoggerOptions*](modules.md#loggeroptions) |

Defined in: [index.ts:17](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/index.ts#L17)

___

### LoggerOptions

Ƭ **LoggerOptions**: *object*

Logger's options

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`level` | Level | Minimum level of log which can be output   |
`logFile`? | *string* | The path of log file.   |

Defined in: [index.ts:28](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/index.ts#L28)

___

### Middleware

Ƭ **Middleware**: (`ctx`: [*LoggerContext*](modules.md#loggercontext), `next`: () => *Promise*<void\>) => *void* \| *Promise*<void\>

#### Type declaration:

▸ (`ctx`: [*LoggerContext*](modules.md#loggercontext), `next`: () => *Promise*<void\>): *void* \| *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ctx` | [*LoggerContext*](modules.md#loggercontext) |
`next` | () => *Promise*<void\> |

**Returns:** *void* \| *Promise*<void\>

Defined in: [index.ts:101](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/index.ts#L101)

## Other Functions

### createLogger

▸ **createLogger**(`options?`: *Partial*<[*LoggerOptions*](modules.md#loggeroptions)\>, `pipeline?`: *any*): [*Logger*](modules.md#logger)

Create a logger.

Basic usage:

```javascript
import createLogger from "node-trailer"

const logger = createLogger({ level: 'info' })
logger.log('log message.') // No output
logger.info('info message.') //=> info message.
```

Customize:

```javascript
const pipeline = trough()
  // Filter
  .use(filter(({ options, level }: LoggerContext) =>
    levelWeight[options.level] <= levelWeight[level]
  ))
  // Appender
  .use(level(levelColor))
  .use(message())
  .use(error())
  // Output
  .use(colorConsole())

const logger = createLogger({}, pipeline)
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`options` | *Partial*<[*LoggerOptions*](modules.md#loggeroptions)\> | Logger's options   |
`pipeline` | *any* | middlewares handling the log for customizing logger   |

**Returns:** [*Logger*](modules.md#logger)

Defined in: [index.ts:80](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/index.ts#L80)

___

## middleware Functions

### filter

▸ **filter**(`predicate`: (`ctx`: [*LoggerContext*](modules.md#loggercontext)) => *boolean*): [*Middleware*](modules.md#middleware)

if predicate is true, execute next middleware.

#### Parameters:

Name | Type |
:------ | :------ |
`predicate` | (`ctx`: [*LoggerContext*](modules.md#loggercontext)) => *boolean* |

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/filter.ts:7](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/filter.ts#L7)

___

## middleware:appender Functions

### date

▸ **date**(`format?`: *string*): [*Middleware*](modules.md#middleware)

Print current date & time

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`format` | *string* | '[YYYY-MM-DD HH:mm:ss]' | Format of date & time, default as `'[YYYY-MM-DD HH:mm:ss]'`   |

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/appender/date.ts:13](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/appender/date.ts#L13)

___

### error

▸ **error**(`root?`: *string*): [*Middleware*](modules.md#middleware)

When no error in log, print call stack;
When an error in log, print Error with the simplified stack.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`root` | *string* | project's root path   |

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/appender/error.ts:28](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/appender/error.ts#L28)

___

### level

▸ **level**(`levelColor`: *Record*<Level, string\>): [*Middleware*](modules.md#middleware)

Print log's level

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`levelColor` | *Record*<Level, string\> | a mapping from level to color   |

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/appender/level.ts:12](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/appender/level.ts#L12)

___

### message

▸ **message**(): [*Middleware*](modules.md#middleware)

print log's content

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/appender/message.ts:10](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/appender/message.ts#L10)

___

## middleware:output Functions

### colorConsole

▸ **colorConsole**(): [*Middleware*](modules.md#middleware)

Output log to colorize console.

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/output/console.ts:24](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/output/console.ts#L24)

___

### logFile

▸ **logFile**(`filename?`: *string*): [*Middleware*](modules.md#middleware)

Output log to text file.

#### Parameters:

Name | Type |
:------ | :------ |
`filename?` | *string* |

**Returns:** [*Middleware*](modules.md#middleware)

Defined in: [middlewares/output/file.ts:10](https://github.com/plylrnsdy/node-trailer/blob/b1a846f/src/middlewares/output/file.ts#L10)
