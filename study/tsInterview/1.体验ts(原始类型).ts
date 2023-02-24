export {}
let str = '123' //根据初始的赋值来推导出变量的类型。以后str的类型不能修改
// str = 2  //报错  原因： 变量在定义的时候，类型已经确定下来了，不能修改
// console.log(str)
const num = 1 //常量不能改变指向(不能被修改)， 所以它的值 就是它的类型

// num = 2 //报错  原因： 常量不能改变指向(不能被修改)

// ts原始类型有哪些？  js基础数据类型 number string boolean undefined null symbol
// ts原始数据类型就是 js基础数据类型 这些
let str1: string = '1'
let bool: boolean = true
let num1: number = 10
let und: undefined = undefined
let nul: null = null
let sy: symbol = Symbol('123')
let vo: void = undefined
function a(): void {}
function b(): undefined {
  return undefined
}
// function c():undefined{} // 报错
// 在ts中函数没有写返回值，函数类型就是void
