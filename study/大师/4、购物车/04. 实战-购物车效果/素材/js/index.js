//单件商品的数据
class UIGoods {
  constructor(g) {
    this.data = g
    this.choose = 0
  }
  //获取总价
  getTotalPrice () {
    return this.data.price * this.choose
  }
  //是否选中了此件商品
  isChoose () {
    return this.choose > 0
  }
  // 选择的数量+1
  increase () {
    this.choose++
  }
  //选择的数量-1
  decrease () {
    if (this.choose === 0) {
      return
    }
    this.choose--
  }
}

//整个界面的数据
class UIData {
  constructor() {
    var uiGoods = []
    for (let i = 0; i < goods.length; i++) {
      let uig = new UIGoods(goods[i])
      uiGoods.push(uig)
    }
    this.uiGoods = uiGoods
    this.deliveryThreshold = 30
    this.deliveryPrice = 5
  }

  //总价
  getTotalPrice () {
    return this.uiGoods.reduce((prev, cur) => {
      return prev += cur.getTotalPrice()
    }, 0)
  }

  //增加某件商品的选中数量
  increase (index) {
    this.uiGoods[index].increase()
  }

  //减少某件商品的选中数量
  decrease (index) {
    this.uiGoods[index].decrease()
  }

  //得到总共的选择数量
  getTotalCHooseNumber () {
    return this.uiGoods.reduce((prev, cur) => {
      return prev += cur.choose
    }, 0)
  }

  //购物车中有没有东西
  hasGoodsInCar () {
    return this.getTotalCHooseNumber() > 0
  }

  //是否跨过了配送标准
  isCrossDeliveryThreshold () {
    return this.getTotalPrice() >= this.deliveryThreshold
  }

  isChoose (index) {
    return this.uiGoods[index].isChoose()
  }
}

//整个界面
class UI {
  constructor() {
    this.UIData = new UIData()
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliveryPrice: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPayInnerSpan: document.querySelector('.footer-pay span'),
      totalPrice: document.querySelector('.footer-car-total'),
      car: document.querySelector('.footer-car'),
      carSpan: document.querySelector('.footer-car span')
    }

    var carRect = this.doms.car.getBoundingClientRect()
    var jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5
    }
    this.jumpTarget = jumpTarget

    this.createHTML()
    this.updateFooter()
    this.listenEvent()
  }

  // 监听各种事件
  listenEvent () {
    this.doms.car.addEventListener('animationend', function () {
      this.classList.remove('animate')
    })
  }

  // 根据商品数据创建商品列表的元素
  createHTML () {
    let html = this.UIData.uiGoods.reduce((prev, cur, index) => {
      return prev += `<div class="goods-item">
      <img src="${cur.data.pic}" alt="" class="goods-pic" />
      <div class="goods-info">
        <h2 class="goods-title">${cur.data.title}</h2>
        <p class="goods-desc">${cur.data.desc}</p>
        <p class="goods-sell">
          <span>月售 ${cur.data.sellNumber}</span>
          <span>好评率${cur.data.favorRate}%</span>
        </p>
        <div class="goods-confirm">
          <p class="goods-price">
            <span class="goods-price-unit">￥</span>
            <span>${cur.data.price}</span>
          </p>
          <div class="goods-btns">
            <i index="${index}" class="iconfont i-jianhao"></i>
            <span>${cur.choose}</span>
            <i index="${index}" class="iconfont i-jiajianzujianjiahao"></i>
          </div>
        </div>
      </div>
    </div>`
    }, '')
    this.doms.goodsContainer.innerHTML = html
  }

  increase (index) {
    this.UIData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooter()
    this.jump(index)
  }

  decrease (index) {
    this.UIData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooter()
  }

  // 更新某个商品元素的显示状态
  updateGoodsItem (index) {
    var goodsDom = this.doms.goodsContainer.children[index]
    if (this.UIData.isChoose(index)) {
      goodsDom.classList.add('active')
    } else {
      goodsDom.classList.remove('active')
    }
    var span = goodsDom.querySelector('.goods-btns span')
    span.textContent = this.UIData.uiGoods[index].choose
  }

  //更新页脚
  updateFooter () {
    // 得到总价数据
    var total = this.UIData.getTotalPrice()
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费：${this.UIData.deliveryPrice}`
    //设置起送费
    if (this.UIData.isCrossDeliveryThreshold()) {
      // 到达起送
      this.doms.footerPay.classList.add('active')
    } else {
      this.doms.footerPay.classList.remove('active')
      //还差多少钱
      var dis = Math.round(this.UIData.deliveryThreshold - total)
      this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`
    }
    //总价元素
    this.doms.totalPrice.textContent = total.toFixed(2)

    //设置购物车的样式状态
    if (this.UIData.hasGoodsInCar()) {
      this.doms.car.classList.add('active')
    } else {
      this.doms.car.classList.remove('active')
    }
    //设置购物车中的数量
    this.doms.carSpan.textContent = this.UIData.getTotalCHooseNumber()
  }

  // 购物车动画
  carAnimate () {
    this.doms.car.classList.add('animate')
  }

  // 抛物线跳跃的元素
  jump (index) {
    //找到对应商品的加号
    var btnAdd = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao')
    var rect = btnAdd.getBoundingClientRect()
    var start = {
      x: rect.left,
      y: rect.top
    }

    //跳

    var div = document.createElement('div')
    div.className = 'add-to-car'
    var i = document.createElement('i')
    i.className = `iconfont i-jiajianzujianjiahao`
    //设置初始位置
    div.style.transform = `translateX(${start.x}px)`

    i.style.transform = `translateY(${start.y}px)`

    div.appendChild(i)
    document.body.appendChild(div)
    // 强行渲染
    div.clientWidth;


    //设置结束位置
    div.style.transform = `translateX(${this.jumpTarget.x}px)`
    i.style.transform = `translateY(${this.jumpTarget.y}px)`

    div.addEventListener('transitionend', () => {
      div.remove()
      this.carAnimate()
    }, { once: true })
    // div.addEventListener('transitionend', function () {
    //   div.remove()
    //   this.car.carAnimate()
    // }, {
    //   once: true,  //事件仅触发一次
    // })
  }
}

var ui = new UI()

// 事件
ui.doms.goodsContainer.addEventListener('click', (e) => {
  let index = +e.target.getAttribute('index')
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    ui.increase(index)
  } else if (e.target.classList.contains('i-jianhao')) {
    ui.decrease(index)
  }
})