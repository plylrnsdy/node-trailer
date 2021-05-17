import { expect } from 'chai';
import dateFormat from '../date-format';


describe('dateFormat(template, date)', () => {

    it('default', () => {
        const dateStr = '2000-01-02 15:04:05.678'
        const date = new Date(dateStr)

        expect(dateFormat('YYYY', date)).eq('2000')
        expect(dateFormat('YY', date)).eq('00')

        expect(dateFormat('M', date)).eq('1')
        expect(dateFormat('MM', date)).eq('01')

        expect(dateFormat('D', date)).eq('2')
        expect(dateFormat('DD', date)).eq('02')

        expect(dateFormat('H', date)).eq('15')
        expect(dateFormat('HH', date)).eq('15')
        expect(dateFormat('h', date)).eq('3')
        expect(dateFormat('hh', date)).eq('03')

        expect(dateFormat('m', date)).eq('4')
        expect(dateFormat('mm', date)).eq('04')

        expect(dateFormat('s', date)).eq('5')
        expect(dateFormat('ss', date)).eq('05')

        expect(dateFormat('SSS', date)).eq('678')

        expect(dateFormat('YYYY-MM-DD HH:mm:ss.SSS', date)).eq(dateStr)
    })
})
