export {}
// & 交叉类型

// let a: number & string //不会有任何值满足这个类型  一般不会这么写

let obj: { name: string; age: number } & { height: number; age: 18 } // & 都 必须有name,age,height属性
// 如果一个属性出现多次类型的设置，需要都满足
obj = {
  name: 'xiao',
  age: 18,
  height: 0,
}

// & 换成 | 才可以少属性
