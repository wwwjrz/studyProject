<template>
  <div class="toolbar">
    <el-button type="primary" @click="switchVisible('threeDvisible')">
      {{ objStr.threeDvisible ? '隐藏3D' : '显示3D' }}
    </el-button>
    <el-button type="primary" @click="switchVisible('districtVisible')">
      {{ objStr.districtVisible ? '隐藏行政区' : '显示行政区' }}
    </el-button>
  </div>
  <div class="map-page-container">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
      view-mode="3D"
      :pitch="50"
      :show-building-block="false"
    >
      <!-- 比例尺 -->
      <el-amap-control-scale :visible="true"></el-amap-control-scale>
      <!-- 地图操作工具 -->
      <el-amap-control-tool-bar :visible="true"></el-amap-control-tool-bar>
      <!-- 地图控制 -->
      <el-amap-control-control-bar
        :visible="true"
      ></el-amap-control-control-bar>
      <!-- 地图类型 -->
      <el-amap-control-map-type :visible="true"></el-amap-control-map-type>
      <!-- 鹰眼 -->
      <el-amap-control-hawk-eye :visible="true"></el-amap-control-hawk-eye>
      <!-- 定位 -->
      <el-amap-control-geolocation
        :visible="true"
        position="LB"
        :offset="[20, 70]"
        :convert="true"
        @complete="getLocation"
      />
      <!-- 3D -->
      <el-amap-layer-buildings :visible="objStr.threeDvisible" />
      <!-- 行政区划图 -->
      <el-amap-layer-district
        :visible="objStr.districtVisible"
        type="Province"
        adcode="220100"
        :depth="2"
        :styles="styles"
      ></el-amap-layer-district>
    </el-amap>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
const zoom = ref(12)
const center = ref([125.323643, 43.816996])
let map = null
let threeDvisible = ref(false)
let objStr = reactive({
  threeDvisible: false,
  districtVisible: false,
})

let colors = reactive({})
let styles = reactive({
  fill: function (properties) {
    let adcode = properties.adcode
    return getColorByAdcode(adcode)
  },
})

const getColorByAdcode = (adcode) => {
  if (!colors[adcode]) {
    let gb = Math.random() * 155 + 50
    colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)'
  }
  return colors[adcode]
}

//方法
const init = (e) => {
  const marker = new AMap.Marker({
    position: [125.323643, 43.816996],
  })
  e.add(marker)
  map = e
}

const getLocation = (e) => {
  console.log(e)
}

const switchVisible = (str) => {
  objStr[str] = !objStr[str]
  // [str].value = ![str].value
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 30px;
}
.map-page-container {
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 20px;
}
</style>
