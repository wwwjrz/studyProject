<template>
  <div>
    <p>{{value}}</p>
    <el-button type="success" @click="edits">修改</el-button>
  </div>
</template>
<script>
  export default {
    props:['value'],
    methods:{
      edits(){
        this.$emit('input',Math.random())
      }
    }
  }
</script>
