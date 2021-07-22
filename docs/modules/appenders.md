[node-trailer - v0.3.0](../README.md) / [Exports](../modules.md) / appenders

# Namespace: appenders

## Table of contents

### Interfaces

- [Appender](../interfaces/appenders.appender.md)

### Other Functions

- [appender](appenders.md#appender)

### middleware:appender Functions

- [date](appenders.md#date)
- [level](appenders.md#level)
- [message](appenders.md#message)
- [position](appenders.md#position)

## Other Functions

### appender

▸ **appender**<U\>(`middleware`: [*Appender*](../interfaces/appenders.appender.md)<U\>): [*Middleware*](../modules.md#middleware)

#### Type parameters:

Name |
:------ |
`U` |

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | [*Appender*](../interfaces/appenders.appender.md)<U\> |

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/appenders/appender.ts:10](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/appenders/appender.ts#L10)

___

## middleware:appender Functions

### date

▸ **date**(`format?`: *string*): [*Middleware*](../modules.md#middleware)

Print current date & time

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`format` | *string* | '[YYYY-MM-DD HH:mm:ss]' | Format of date & time, default as `'[YYYY-MM-DD HH:mm:ss]'`   |

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/appenders/date.ts:13](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/appenders/date.ts#L13)

___

### level

▸ **level**(`options`: LevelOptions): [*Middleware*](../modules.md#middleware)

Print log's level

#### Parameters:

Name | Type |
:------ | :------ |
`options` | LevelOptions |

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/appenders/level.ts:25](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/appenders/level.ts#L25)

___

### message

▸ **message**(): [*Middleware*](../modules.md#middleware)

print log's content

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/appenders/message.ts:11](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/appenders/message.ts#L11)

___

### position

▸ **position**(): [*Middleware*](../modules.md#middleware)

print the position of the logger method called

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/appenders/position.ts:20](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/appenders/position.ts#L20)
