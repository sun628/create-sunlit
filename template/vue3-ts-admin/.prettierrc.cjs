module.exports = {
  printWidth: 100, // 一行最多多少个字符
  singleQuote: true, // 使用制表符而不是空格缩进行
  useTabs: false, // 使用制表符而不是空格缩进行
  jsxSingleQuote: false, // 在JSX中使用单引号而不是双引号
  semi: true, // 在语句末尾是否需要分号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号
  //在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
  //然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
  //对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'ignore' // 指定HTML文件的全局空格敏感度 css\strict\ignore
};
