import { expect } from 'chai'
import escapeRegExp from '@/utils/escape-regexp'
import { simplifyRoot, rejectThirdPart, rejectNative } from '../clean-stack'


describe('clean-stack', () => {

  const throwErr = () => { throw new Error() }
  const catchErr = (fn: Function): Error => {
    try {
      return fn() || Error('`fn` does not throw.')
    } catch (e) {
      return e
    }
  }
  const err = catchErr(throwErr)

  it('simplifyRoot(root, replacement)', () => {
    const replacement = '~'
    const result = simplifyRoot(__dirname, replacement)(err.stack!)
    const expected = err.stack?.replace(new RegExp(escapeRegExp(__dirname), 'g'), replacement)
    expect(result).eq(expected)
  })

  it('rejectThirdPart()', () => {
    const result = rejectThirdPart()(err.stack!)
    const expected = err.stack
      ?.split('\n')
      .filter(line => !line.includes('node_modules'))
      .join('\n')
    expect(result).eq(expected)
  })

  it('rejectNative()', () => {
    const result = rejectNative()(err.stack!)
    const expected = err.stack
      ?.split('\n')
      .filter(line => !line.includes('internal'))
      .join('\n')
    expect(result).eq(expected)
  })
})
