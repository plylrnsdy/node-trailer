[node-trailer - v0.3.0](../README.md) / [Exports](../modules.md) / Pipeline

# Interface: Pipeline

## Table of contents

### Methods

- [run](pipeline.md#run)
- [use](pipeline.md#use)

## Methods

### run

▸ **run**(`ctx`: *any*, `onCompleted`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`ctx` | *any* |
`onCompleted` | () => *void* |

**Returns:** *void*

Defined in: [index.ts:16](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L16)

___

### use

▸ **use**(`middleware`: [*Middleware*](../modules.md#middleware)): [*Pipeline*](pipeline.md)

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | [*Middleware*](../modules.md#middleware) |

**Returns:** [*Pipeline*](pipeline.md)

Defined in: [index.ts:15](https://github.com/plylrnsdy/node-trailer/blob/9f823be/src/index.ts#L15)
