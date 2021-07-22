[node-trailer - v0.3.0](README.md) / Exports

# node-trailer - v0.3.0

**`typicalname`** trailer

## Table of contents

### Namespaces

- [appenders](modules/appenders.md)
- [filters](modules/filters.md)
- [outputs](modules/outputs.md)
- [themes](modules/themes.md)

### Interfaces

- [Pipeline](interfaces/pipeline.md)

### Type aliases

- [Logger](modules.md#logger)
- [LoggerContext](modules.md#loggercontext)
- [LoggerOptions](modules.md#loggeroptions)
- [Middleware](modules.md#middleware)

### Functions

- [createLogger](modules.md#createlogger)
- [createPipeline](modules.md#createpipeline)

## Type aliases

### Logger

Ƭ **Logger**: *Record*<Level, (...`args`: *any*[]) => *void*\>

Defined in: [index.ts:52](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L52)

___

### LoggerContext

Ƭ **LoggerContext**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`appenders` | [*Appender*](interfaces/appenders.appender.md)<any\>[] |
`args` | *any*[] |
`level` | Level |
`options` | [*LoggerOptions*](modules.md#loggeroptions) |
`positionError` | Error |

Defined in: [index.ts:26](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L26)

___

### LoggerOptions

Ƭ **LoggerOptions**: *object*

Logger's options

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`level` | Level | Minimum level of log which can be output   |
`logFile`? | *string* | The path of log file.   |

Defined in: [index.ts:37](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L37)

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

Defined in: [index.ts:115](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L115)

## Functions

### createLogger

▸ **createLogger**(`options?`: *Partial*<[*LoggerOptions*](modules.md#loggeroptions)\>, `pipeline?`: [*Pipeline*](interfaces/pipeline.md)): [*Logger*](modules.md#logger)

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
`pipeline` | [*Pipeline*](interfaces/pipeline.md) | middlewares handling the log for customizing logger   |

**Returns:** [*Logger*](modules.md#logger)

Defined in: [index.ts:89](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L89)

___

### createPipeline

▸ `Const`**createPipeline**(): [*Pipeline*](interfaces/pipeline.md)

**Returns:** [*Pipeline*](interfaces/pipeline.md)

Defined in: [index.ts:19](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L19)
