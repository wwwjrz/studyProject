<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in dataList" :key="index" :to="index == 0 && item.path">{{ item.meta.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template> 
<script setup>
defineProps({
  dataList: Array,
})
</script>