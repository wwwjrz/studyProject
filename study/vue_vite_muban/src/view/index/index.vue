<!--
 * @Author: your name
 * @Date: 2021-03-16 15:09:41
 * @LastEditTime: 2022-01-20 14:19:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\dashboard\LiveChart.vue
-->
<template>
  <div class="numList">
    <div class="numItem">
      <el-icon>
        <User />
      </el-icon>
      <div class="nameBox">
        <p class="name">{{ $t('menus.numberUser') }}</p>
        <p class="num" v-resize>52454</p>
      </div>
    </div>
    <div class="numItem">
      <el-icon>
        <Message />
      </el-icon>
      <div class="nameBox">
        <p class="name">{{ $t('menus.numberMessage') }}</p>
        <p class="num" v-resize>9757727</p>
      </div>
    </div>
    <div class="numItem">
      <el-icon>
        <Tickets />
      </el-icon>
      <div class="nameBox">
        <p class="name">{{ $t('menus.numberTickets') }}</p>
        <p class="num" v-resize>2264</p>
      </div>
    </div>
  </div>
  <div class="box">
    <div class="boxL">
      <bread />
    </div>
    <div class="boxR">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="......" placement="top">
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  <!-- <div class="zhuti" :style="{'color':color}">主题色：{{ color }}</div>
  <el-button @click="editColor">修改主题</el-button> -->
</template>

<script setup>
import useCounter from '../../stores/color'
import { storeToRefs } from 'pinia'
import bread from '../../components/indexChart/index.vue'
const counterStore = useCounter()
const { color } = storeToRefs(counterStore)
const editColor = () => {
  counterStore.color = 'blue'
  // counterStore.$patch({color:"green"})
}
</script>

<style lang="less" scoped>
.zhuti {
  width: 400px;
}
.box {
  display: flex;
  gap: 30px;
  align-items: center;
  height: 450px;
  .boxL {
    flex: 1;
  }
  .boxR {
    flex: 0.4;
    height: 450px;
    overflow: auto;
  }
  .boxR::-webkit-scrollbar {
    display: none;
  }
}
.numList {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
  justify-content: space-between;
  .numItem {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 15px;
    border-radius: 15px;
    color: #fff;
    position: relative;
    transition: all 0.3s;
    user-select: none;
    &:hover {
      box-shadow: 0 0 15px #ccc;
    }
    .nameBox {
      text-align: center;
      padding-left: 100px;
      .name {
        font-size: 20px;
        margin-bottom: 20px;
        font-family: '宋体';
        letter-space: 0.5px;
      }
      .num {
        font-size: 32px;
        font-weight: bold;
        letter-space: 0.5px;
      }
    }

    i {
      font-size: 100px;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .numItem:nth-of-type(1) {
    background: #409eff;
    &:hover {
      background: #fff;
      color: #409eff !important;
    }
  }
  .numItem:nth-of-type(2) {
    background: #67c23a;
    &:hover {
      background: #fff;
      color: #67c23a !important;
    }
  }
  .numItem:nth-of-type(3) {
    background: #e6a23c;
    &:hover {
      background: #fff;
      color: #e6a23c !important;
    }
  }
}
</style>
