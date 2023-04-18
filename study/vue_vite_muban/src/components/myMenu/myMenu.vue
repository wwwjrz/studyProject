<template>
  <template v-for="(item, index) in data">
    <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况情况一：有子集的情况：-->
    <el-sub-menu
      :key="index"
      :index="item.path"
      v-if="item.children.length > 0"
    >
      <template #title>
        <!-- <navIcon :icon="item.icon"></navIcon> -->
        <el-icon>
          <component
            :is="item.icon"
            style="width: 16px; height: 16px"
          ></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <myMenu :data="item.children"></myMenu>
    </el-sub-menu>
    <!-- 情况二：没子集的情况： -->
    <el-menu-item v-else :index="item.path">
      <el-icon>
        <component
          :is="item.icon"
          style="width: 16px; height: 16px"
        ></component>
      </el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>
<script setup>
import { watch, reactive } from 'vue';
defineProps({
  data: Array,
})
</script>

<style>
</style>