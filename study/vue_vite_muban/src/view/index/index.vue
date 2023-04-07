<template>
  <div>
    <!-- <el-progress :percentage="par" :indeterminate="true" /> -->
    {{ fake.progress }}
  </div>
</template>
<script>
import FakeProgress from 'fake-progress'
export default {
  data () {
    return {
      fake: new FakeProgress({
        timeConstant: 1000,
        autoStart: true
      })
    }
  }
}
</script>