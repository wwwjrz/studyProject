// 获取banner元素
const banner = document.querySelector('.animated-banner')
// 获取所有图片和视频
const childs = banner.querySelectorAll('img, video')
// console.log(layer)

// 所有图片的 样式
const styleArr = [
  { x: -70, y: 0, filter_blur: 2, rotate: 0 },
  { x: 256, y: 6, filter_blur: 2, rotate: 0 },
  { x: 0, y: 0, filter_blur: 1, rotate: 0 },
  { x: -363, y: -58, filter_blur: 1, rotate: 0 },
  { x: -58, y: -23, rotate: 0 },
  { x: 23, y: -29, rotate: 0 },
  { x: 315, y: 46, rotate: 0 },
  { x: -585, y: 26, rotate: 0 },
  { x: -358, y: 41, rotate: 0 },
  { x: 483, y: 3, rotate: 0 },
  { x: 345, y: -38, rotate: 0 },
  { x: 452, y: -120, rotate: 0 },
  { x: 418, y: 0, rotate: 0 },
  { x: -279, y: -7, rotate: 0 },
  { x: 209, y: 7, rotate: 0 },
  { x: 104, y: -14, rotate: 0 },
  { x: 104, y: -14, rotate: 0 },
  { x: -122, y: -82, rotate: 0 },
  { x: 17, y: 45, rotate: 0 },
  { x: -929, y: 0, rotate: 0 },
  { x: -684, y: 0, rotate: 0 },
  { x: -557, y: 33, rotate: 0 },
  { x: 464, y: 58, rotate: 0 },
  { x: 610, y: 0, rotate: 0 },
  { x: 813, y: 32, rotate: 0 },

]
// 1. 初始化函数，通过遍历给每个图片根据数据添加样式
function init() {
  styleArr.forEach((ele, index) => {
    childs[index].style = ` 
    transform: translate(${ele.x}px, ${ele.y}px)  rotate(${ele.rotate}); 
    filter: blur(${ele.filter_blur}px)`
  })
}
init()


// 2. 记录鼠标经过事件得到当前的鼠标坐标 
let startX = 0
banner.addEventListener('mouseenter', function (e) {
  // 清除过渡效果，因为鼠标滑动不断计算结果来一定的，不需要过渡
  childs.forEach((ele) => {
    ele.classList.remove('trans')
  })
  // 得到鼠标经过盒子获得初始的鼠标坐标
  startX = e.clientX
})

// 3. 鼠标经过事件， 计算移动距离让图片和视频旋转
banner.addEventListener('mousemove', function (e) {
  // 鼠标移动距离
  let level = e.clientX - startX
  // 移动距离在屏幕的占比
  let newX = level / window.outerWidth
  // 遍历所有图片和视频，根据鼠标移动距离来移动
  childs.forEach((ele, index) => {
    // 计算移动距离 = 当前位置 + (移动距离在屏幕的占比 * 当前索引号 * 10)
    // 因为索引号，乘积约小，数字就越小（这样实现最前面的图片移动幅度变大，远处图片移动幅度变小)
    const x = styleArr[index].x + newX * index * 12
    // 如果是旋转的叶子，则需要调整rotate

    // // 计算旋转角度
    const rotate = level * 0.02
    // 如果是叶子的图片或者视频，则需要旋转
    if (index === 3 || index === 4) {
      ele.style = ` transform: translate(${x}px, ${styleArr[index].y}px)  rotate(${rotate}deg); 
      filter: blur(${styleArr[index].filter_blur}px)`
    } else {
      ele.style = ` transform: translate(${x}px, ${styleArr[index].y}px)  rotate(${styleArr[index].rotate}deg); 
    filter: blur(${styleArr[index].filter_blur}px)`
    }

  })

})

// 4. 鼠标离开复原开始默认样式，先添加过渡，这样可以缓慢动画回来
banner.addEventListener('mouseleave', function () {
  childs.forEach((ele) => {
    ele.classList.add('trans')
  })
  // 复原
  init()
})

