
export default function dateFormat(template: string, date: Date) {
    const data = new DatePart(date)
    return template.replace(/(\w)\1*/g, ($: string) => (data as any)[$] ?? '')
}

class DatePart {
    constructor(private date: Date) { }

    get YYYY() { return this.date.getFullYear() + '' }
    get YY() { return this.YYYY.slice(2, 4) }

    get M() { return (this.date.getMonth() + 1) + '' }
    get MM() { return this.M.padStart(2, '0') }

    get D() { return this.date.getDate() + '' }
    get DD() { return this.D.padStart(2, '0') }

    get H() { return this.date.getHours() + '' }
    get HH() { return this.H.padStart(2, '0') }

    get h() { return ((this.date.getHours() - 1) % 12 + 1) + '' }
    get hh() { return this.h.padStart(2, '0') }

    get m() { return this.date.getMinutes() + '' }
    get mm() { return this.m.padStart(2, '0') }

    get s() { return this.date.getSeconds() + '' }
    get ss() { return this.s.padStart(2, '0') }

    get SSS() { return this.date.getMilliseconds().toString().padStart(3, '0') }

    get O() { return this.date.getTimezoneOffset() + '' }
}
