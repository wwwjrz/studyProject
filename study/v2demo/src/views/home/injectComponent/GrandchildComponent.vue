<!-- 孙子组件 -->
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  inject: ['message'],
}
</script>
