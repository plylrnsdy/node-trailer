import { expect } from 'chai'
import escapeRegExp from '../escape-regexp'


describe('escapeRegExp(str)', () => {

  it('str: special characters', () => {
    const characters = '^$.*+?()[]{}|\\'
    const result = escapeRegExp(characters)
    const expected = characters.split('').map(c => `\\${c}`).join('')
    expect(result).eq(expected)
  })
})
