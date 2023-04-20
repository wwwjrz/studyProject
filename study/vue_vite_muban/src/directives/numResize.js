// js实现动态变化的数字
const directive = {
  mounted(el, binding) {
    let finalNum = el.innerText;
    // 动画间隔
    let rate = 30;
    // 总时长
    let time = 2000;
    // 步长,数据增加间隔
    let step = finalNum / (time / rate);
    // 初始值
    let count = 0;
    // 要保留的小数
    let timers = setInterval(() => {
      count = count + step;
      el.innerText = count.toFixed(0);
      if (count > finalNum) {
        //  避免count大于finalNum最终数字显示不对
        count = finalNum;
        el.innerText = count;
        // 清空定时器
        clearInterval(timers);
        timers = null;
      }
    }, rate);
  },
};
export default directive;