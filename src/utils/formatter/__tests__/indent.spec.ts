import { expect } from 'chai'
import indent from '../indent'


describe('indent(indent, string)', () => {

  it('string: single line', () => {
    const str = 'single line.'
    const result = indent(4, str)
    const expected = ' '.repeat(4) + str
    expect(result).eq(expected)
  })

  it('string: multiple line', () => {
    const str = ['line 1.', 'line 2.']
    const result = indent(4, str.join('\n'))
    const expected = str.map(s => ' '.repeat(4) + s).join('\n')
    expect(result).eq(expected)
  })
})
