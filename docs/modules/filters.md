[node-trailer - v0.3.0](../README.md) / [Exports](../modules.md) / filters

# Namespace: filters

## Table of contents

### Other Functions

- [filterByLevel](filters.md#filterbylevel)

### middleware Functions

- [filter](filters.md#filter)

## Other Functions

### filterByLevel

▸ `Const`**filterByLevel**(`ctx`: [*LoggerContext*](../modules.md#loggercontext), `next`: () => *Promise*<void\>): *void* \| *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ctx` | [*LoggerContext*](../modules.md#loggercontext) |
`next` | () => *Promise*<void\> |

**Returns:** *void* \| *Promise*<void\>

Defined in: [middlewares/filters/filter-by-level.ts:5](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/filters/filter-by-level.ts#L5)

___

## middleware Functions

### filter

▸ **filter**(`predicate`: (`ctx`: [*LoggerContext*](../modules.md#loggercontext)) => *boolean*): [*Middleware*](../modules.md#middleware)

if predicate is true, execute next middleware.

#### Parameters:

Name | Type |
:------ | :------ |
`predicate` | (`ctx`: [*LoggerContext*](../modules.md#loggercontext)) => *boolean* |

**Returns:** [*Middleware*](../modules.md#middleware)

Defined in: [middlewares/filters/filter.ts:7](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/middlewares/filters/filter.ts#L7)
