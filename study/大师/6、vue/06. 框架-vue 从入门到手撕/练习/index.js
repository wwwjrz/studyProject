
let user = {
  userName: '姜荣郅',
  age: 22
}

obServer(user)

function setUserName1 () {
  document.querySelector('#name1').textContent = '姓：' + user.userName[0]
}

function setUserName2 () {
  document.querySelector('#name2').textContent = '名：' + user.userName.slice(1)
}

function setAge () {
  document.querySelector('#age').textContent = '年龄：' + user.age
}

autoFun(setUserName1)
autoFun(setUserName2)
autoFun(setAge)