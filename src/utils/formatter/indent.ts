/**
 * 为多行字符串的添加缩进
 * @param indent 缩进空格数
 * @param string 多行字符串
 */
export default function indent(indent: number, string: string) {
    return string.replace(/(?:^|\n)(?!\n)/g, '\n' + ' '.repeat(indent));
}
