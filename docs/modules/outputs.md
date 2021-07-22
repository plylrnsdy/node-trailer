[node-trailer - v0.3.0](../README.md) / [Exports](../modules.md) / outputs

# Namespace: outputs

## Table of contents

### middleware:output Functions

- [colorConsole](outputs.md#colorconsole)
- [jsonFile](outputs.md#jsonfile)
- [logFile](outputs.md#logfile)
- [rawConsole](outputs.md#rawconsole)

## middleware:output Functions

### colorConsole

▸ **colorConsole**(): [*Middleware*](../modules.md#middleware)

Output log to colorize console.

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/outputs/console.ts:24](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/outputs/console.ts#L24)

___

### jsonFile

▸ **jsonFile**(`filename?`: *string*): [*Middleware*](../modules.md#middleware)

Output log to json file.

#### Parameters:

Name | Type |
:------ | :------ |
`filename?` | *string* |

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/outputs/file.ts:30](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/outputs/file.ts#L30)

___

### logFile

▸ **logFile**(`filename?`: *string*): [*Middleware*](../modules.md#middleware)

Output log to text file.

#### Parameters:

Name | Type |
:------ | :------ |
`filename?` | *string* |

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/outputs/file.ts:10](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/outputs/file.ts#L10)

___

### rawConsole

▸ **rawConsole**(): [*Middleware*](../modules.md#middleware)

Output log to console.

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/outputs/console.ts:9](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/outputs/console.ts#L9)
