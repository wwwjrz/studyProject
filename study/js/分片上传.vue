<template>
  <div class="Box">
    <el-upload
      v-loading="loading"
      class="upload-demo"
      action=""
      drag
      :http-request="upload"
      :show-file-list="false"
      accept=".apk"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip"></div>
    </el-upload>
    <el-row :gutter="24" class="progess">
      <el-col :span="22">
        <el-progress :percentage="progress"></el-progress>
      </el-col>
      <el-col :span="1" style="display: flex; align-items: center; gap: 10px">
        <i
          v-if="loadStatus == 'start'"
          @click="Power"
          :class="[!isShow ? 'el-icon-video-pause' : 'el-icon-video-play']"
        ></i>
        <i v-if="loadStatus == 'success'" class="el-icon-circle-check"></i>
        <i
          v-if="loadStatus == 'start'"
          @click="closeFile"
          class="el-icon-close"
        ></i>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from '@/api'
import SparkMD5 from 'spark-md5'
export default {
  data () {
    return {
      loading: false,
      isShow: false,
      urlList: {
        uploadChunk: api.file.uploadChunk,//上传分块文件
        mergeChunks: api.file.mergeChunks,//合并文件
        checkFile: api.file.checkFile,//文件上传前检查文件
        checkChunk: api.file.checkChunk,//分块文件上传前的检测
        cancelUpload: api.file.cancelUpload //取消上传
      },
      progress: 0,
      chunkSize: 5 * 1024 * 1024,
      chunks: [],
      currentChunk: 0,
      fileMd5: '',
      loadStatus: '',
      formData: ''
    }
  },
  methods: {
    Power () {
      this.isShow = !this.isShow
      if (!this.isShow) {
        console.log(this.currentChunk)
        this.uploadChunk(this, this.result.file, this.currentChunk)
      }
    },
    closeFile () {
      this.isShow = !this.isShow
      this.$confirm('确认取消上传此文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
        this.urlList.cancelUpload(this.formData).then((res) => {
          this.loading = false
          this.loadStatus = ''
          this.progress = 0
        })
      }).catch(() => {
        this.isShow = !this.isShow
        this.uploadChunk(this, this.result.file, this.currentChunk)
      });
    },
    upload (file, backtopage) {
      this.result = file
      this.loading = true
      this.getFileMD5(file.file, md5 => {
        // 存储文件的md5码
        file.file.md5 = md5
        this.formData = new FormData();
        this.fileMd5 = md5
        this.formData.append("fileMd5", md5);
        this.formData.append("bucket", 'chunk');
        this.urlList.checkFile(this.formData).then((res) => {
          if (!res.data) {
            this.loadStatus = 'start'
            this.uploadChunk(this, file.file, 0, backtopage)
            return
          } else { // 秒传
            // 文件上传成功
            this.loading = false
            this.loadStatus = 'success'
            backtopage && backtopage()

          }
        })
      })
    },
    uploadChunk (that, file, currentChunk, backtopage) {
      if (that.isShow) {
        return
      }
      var fileReader = new FileReader()
      // 上传文件块的大小，可自定义
      // 计算改文件的可分为多少块


      // 文件切割后的回调，this.result为切割的文件块
      fileReader.onload = function (e) {

        // 用FormData传输文件对象
        let fd = new FormData()
        // 设置文件上传接口的需要的参数
        fd.append('fileMd5', file.md5)
        // fd.append('chunks', chunks)
        // console.log(that.chunks)
        fd.append('currentChunk', that.chunks.length)
        fd.append('chunk', currentChunk)
        fd.append('bucket', 'chunk')
        // 设置上传的当前的文件块
        fd.append('file', that.chunks[currentChunk])
        // console.log(fd)
        let xhr = new XMLHttpRequest()
        xhr.open('post', '/ep/file/minio/uploadChunk', true)
        xhr.onreadystatechange = function () {
          // 上传成功
          if (xhr.readyState == 4 && xhr.status == 200) {
            currentChunk++
            that.currentChunk = currentChunk
            if (currentChunk < that.chunks.length) {

              loadNext() // 继续切割下一块文件
            } else {
              // 文件上传成功
              // backtopage && backtopage()
              that.loadStatus = 'success'
              const mergeData = new FormData();
              mergeData.append("fileMd5", file.md5);
              mergeData.append("bucket", 'chunk');
              mergeData.append("fileName", file.name);
              mergeData.append("chunkTotal", that.chunks.length);
              that.urlList.mergeChunks(mergeData).then((res) => {
                console.log(res)

                that.loading = false
              })
            }
            xhr = null
            return
          }
          if (xhr.readyState == 4 && xhr.status == 500) {
            // 文件上传出错
          }
        }
        // 文件上传进度条
        xhr.upload.onprogress = function (e) {
          // 计算上传的进度
          if (that.isShow) {
            return
          }
          let progess = parseInt((e.loaded + currentChunk * that.chunkSize) / file.size * 100)
          that.progress = progess > 100 ? 100 : progess
          // 更新ui
        }
        xhr.onerror = xhr.upload.onerror = function () {
          // 文件上传出错
        }
        //开始发送
        xhr.send(fd)
        fd = null
      }
      function loadNext () {

        if (that.isShow) {
          return
        }
        // 查询后台判断当前块文件有没有上传，如果已经上传则不需要上传，继续读取下一块
        let fd = new FormData()
        fd.append('fileMd5', file.md5)
        fd.append('chunk', currentChunk)
        fd.append('bucket', 'chunk')
        fd.append('file', that.chunks[currentChunk])
        // setTimeout(() => {
        that.urlList.checkChunk(fd, { type: 'res' }).then((resd) => {
          // 后台返回没有上传过
          console.log(resd)
          if (!resd.data.data) {
            // 计算切割文件的开始索引和结束索引
            var start = currentChunk * that.chunkSize,
              end = Math.min(start + that.chunkSize, file.size)
            // 切割文件并触发fileReader.onload
            fileReader.readAsArrayBuffer(file.slice(start, end))
            // 后台返回此块已经上传过，递归调用loadNext，继续判断下一块文件块
          } else {
            currentChunk++
            that.currentChunk = currentChunk
            let progess = parseInt(((1 + currentChunk) * that.chunkSize) / file.size * 100)
            that.progress = progess > 100 ? 100 : progess
            if (currentChunk < that.chunks.length) {
              loadNext()
            }
          }
        })
        // }, 1000)
      }
      // 触发文件第一块上传
      loadNext()
    },
    createChunks (file) {
      const result = []
      for (let i = 0; i < file.size; i += this.chunkSize) {
        result.push(file.slice(i, i + this.chunkSize))
      }
      return result
    },

    getFileMD5 (file, callback) {
      let that = this
      //声明必要的变量
      var fileReader = new FileReader()
      //文件每块分割2M，计算分割详情
      // chunks = Math.ceil(file.size / this.chunkSize),
      this.chunks = this.createChunks(file)
      let currentChunk = 0,
        //创建md5对象（基于SparkMD5） 
        spark = new SparkMD5()
      //每块文件读取完毕之后的处理
      fileReader.onload = function (e) {
        //每块交由sparkMD5进行计算
        spark.appendBinary(e.target.result)
        currentChunk++

        //如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < that.chunks.length) {
          loadNext()
        } else {
          callback(spark.end())
        }
      }
      //处理单片文件的上传
      function loadNext () {
        var start = currentChunk * that.chunkSize,
          end = start + that.chunkSize >= file.size ? file.size : start + that.chunkSize
        fileReader.readAsBinaryString(file.slice(start, end))
      }
      loadNext()
    }
  }
}
</script>
<style lang="less" scoped>
.Box {
  width: 600px;
  // display: flex;
  padding: 40px;
  margin: 0 auto;
  text-align: center;
}
.progess {
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>