<template>
  <div class="playEr">
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="againS">再来一遍</el-button>
      </el-col>
    </el-row>
    <div class="lyWords">
      <audio ref="audio" :src="getIcon('music.mp3')"></audio>
      <div ref="container" class="container">
        <ul ref="ulList" class="lrc-list">
          <li v-for="item in lrcData" :key="item.time">{{ item.words }}</li>
        </ul>
      </div>
      <el-slider
        v-model="currentTime"
        :max="duration"
        @input="sliderStop"
        :format-tooltip="(val) => transTime(val)"
      ></el-slider>
      <div>{{ transTime(currentTime) }} / {{ transTime(duration) }}</div>
    </div>
    <div class="lyFooter">
      <div class="lyPlayer">
        <div class="imgBox">
          <!-- img_active  旋转动画 -->
          <!-- <div> -->
          <img
            ref="imgs"
            class="img"
            src="https://p2.music.126.net/kwahKngiu5K4s2hktASbsw==/109951165792137374.jpg?param=130y130"
          />
          <!-- </div> -->
        </div>
        <div class="control">
          <!-- <el-icon><ArrowLeftBold /></el-icon> -->
          <el-icon v-if="playStatus" @click="playSetStatus(false)"
            ><VideoPause
          /></el-icon>
          <el-icon v-else @click="playSetStatus(true)"><VideoPlay /></el-icon>
          <!-- <el-icon><ArrowRightBold /></el-icon> -->
        </div>
        <div>1</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import lrc from './data.js'
const audio = ref(null)
const container = ref(null)
const ulList = ref(null)
let containerHeight = ref(null)
let liHeight = ref(null)
let maxOffset = ref(null)
let playStatus = ref(false)
let currentTime = ref(0)
let duration = ref(0)
let isChange = ref(false)
const imgs = ref(null)

const getIcon = (name) => {
  return new URL(`./${name}`, import.meta.url).href
}
const parseLrc = () => {
  var lines = lrc.split('\n')
  var result = [] // 歌词对象数组
  for (var i = 0; i < lines.length; i++) {
    var str = lines[i]
    var parts = str.split(']')
    var timeStr = parts[0].substring(1)
    var obj = {
      time: parseTime(timeStr),
      words: parts[1],
    }
    result.push(obj)
  }
  return result
}

/**
 * 将一个时间字符串解析为数字（秒）
 * @param {String} timeStr 时间字符串
 * @returns
 */
const parseTime = (timeStr) => {
  var parts = timeStr.split(':')
  return +parts[0] * 60 + +parts[1]
}

let lrcData = parseLrc()

const findIndex = () => {
  // 播放器当前时间
  var curTime = audio.value.currentTime

  for (var i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1
    }
  }
  // 找遍了都没找到（说明播放到最后一句）
  return lrcData.length - 1
}
const setOffset = () => {
  currentTime.value = +audio.value.currentTime.toFixed(2)
  var index = findIndex()
  var offset = liHeight * index + liHeight / 2 - containerHeight / 2
  if (offset < 0) {
    offset = 0
  }
  if (offset > maxOffset) {
    offset = maxOffset
  }
  ulList.value.style.transform = `translateY(-${offset}px)`
  // 去掉之前的 active 样式
  var li = ulList.value.querySelector('.active')
  if (li) {
    li.classList.remove('active')
  }

  li = ulList.value.children[index]
  if (li) {
    li.classList.add('active')
  }
}

const play = () => {
  playStatus.value = true
  setImgs(true)
}
const pause = () => {
  playStatus.value = false
  setImgs(false)
}
const playSetStatus = (e) => {
  if (e) {
    audio.value.play()
    setImgs(e)
  } else {
    setImgs(e)
    audio.value.pause()
  }
}
const setImgs = (e) => {
  if (e) {
    if (imgs.value.classList.contains('play')) {
      imgs.value.className = 'play img'
    } else {
      imgs.value.className = 'restart img'
    }
  } else {
    if (imgs.value.classList.contains('play')) {
      imgs.value.className = 'pause play img'
    } else {
      imgs.value.className = 'pause restart img'
    }
  }
}
const againS = () => {
  audio.value.currentTime = 0
  audio.value.play()
}
const transTime = (time) => {
  var duration = parseInt(time)
  var minute = parseInt(duration / 60)
  var sec = (duration % 60) + ''
  var isM0 = ':'
  if (minute === 0) {
    minute = '00'
  } else if (minute < 10) {
    minute = '0' + minute
  }
  if (sec.length === 1) {
    sec = '0' + sec
  }
  return minute + isM0 + sec
}
//正在被拖动时改变当前播放值
const sliderStop = (value) => {
  if (!isChange.value) {
    console.log(value)
    audio.value.currentTime = value
    playSetStatus(true)
  } else {
    isChange.value = true
  }
}

onMounted(() => {
  containerHeight = container.value.clientHeight
  liHeight = ulList.value.children[0].clientHeight
  maxOffset = ulList.value.clientHeight - containerHeight
  audio.value.addEventListener('timeupdate', setOffset)
  audio.value.addEventListener('play', play)
  audio.value.addEventListener('pause', pause)
  setTimeout(() => {
    duration.value = +audio.value.duration.toFixed(2)
  }, 500)
})
</script>
<style lang="less" scoped>
.playEr {
  background: #000;
  color: #666;
  text-align: center;
  position: relative;
  height: 100%;
}
.lyFooter {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.lyPlayer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  width: 100%;
  border: solid 1px #fff;
  color: #fff;
  .imgBox {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: solid 1px #ccc;
    .img {
      border-radius: 50%;
      width: 55px;
      height: 55px;
      border: solid 1px red;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    // .img_active {
    //   animation: turn 10s linear infinite;
    // }
  }
  .control {
    display: flex;
    align-items: center;
    gap: 35px;
    color: #fff;
    font-size: 30px;
    i {
      cursor: pointer;
    }
  }
}
//   audio {
//   width: 450px;
//   margin: 30px 0;
// }

.container {
  height: 420px;
  overflow: auto;
  /* border: 2px solid #fff; */
}
.container::-webkit-scrollbar {
  display: none;
}

.container ul {
  /* border: 2px solid #fff; */
  transition: 0.6s;
  list-style: none;
}

.container li {
  height: 30px;
  /* border: 1px solid #fff; */
  line-height: 30px;
  transition: 0.2s;
}

.container li.active {
  color: #fff;
  /* font-size: ; */
  transform: scale(1.2);
}
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.play {
  animation: turn 10s linear infinite;
}
.restart {
  animation: turn 10s linear infinite;
}
.pause {
  animation-play-state: paused;
}
</style>
