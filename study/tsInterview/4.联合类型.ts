export {}

//  |  联合类型   或
let numAndStr: number | string = 10
// numAndStr = 'str'

//1 | '2' 在这里的1和'2'是类型  常量  表示numAndStr2的值只能是1 或者 '2'
let numAndStr2: 1 | '2' = 1
numAndStr2 = '2'
// numAndStr2 = 2 //报错
let obj: { a: 1 } | { b: '3' } // | 或 表示要么有a属性，要么有b属性，不能有其他属性
obj = {
  a: 1,
}
obj = {
  b: '3',
}
obj = { a: 1, b: '3' }
// obj = {c:3}  // 报错
