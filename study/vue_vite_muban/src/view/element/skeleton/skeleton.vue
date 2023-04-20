<template>
  <div>
    <div>
      <label style="margin-right: 16px">帖子</label>
      <el-switch v-model="loadingOne" />
    </div>
    <div class="skeletonOne">
      <el-skeleton :loading="loadingOne" animated>
        <template #template>
          <div class="title">
            <el-skeleton-item variant="text" style="width:20%;" />
            <div class="titleImgList">
              <el-skeleton-item variant="image" style="width:20px;height:20px;" />
              <el-skeleton-item variant="image" style="width:20px;height:20px;" />
              <el-skeleton-item variant="image" style="width:20px;height:20px;" />
            </div>
          </div>
          <div class="con">
            <div class="con_l">
              <el-skeleton-item variant="image" style="width:35px;height:35px;border-radius:50%" />
              <el-skeleton-item variant="text" style="width:17%;" />
              <el-skeleton-item variant="text" style="width:17%;" />
            </div>
            <div class="con_r">
              <div>
                <el-skeleton-item variant="image" style="width:20px;height:20px;" />
                <el-skeleton-item variant="text" style="width:25%;" />
              </div>
              <div>
                <el-skeleton-item variant="image" style="width:20px;height:20px;" />
                <el-skeleton-item variant="text" style="width:25%;" />
              </div>
              <div>
                <el-skeleton-item variant="image" style="width:20px;height:20px;" />
                <el-skeleton-item variant="text" style="width:25%;" />
              </div>
            </div>
          </div>
          <el-skeleton-item variant="text" style="width:100%;margin-top:20px" />
          <el-skeleton-item variant="text" style="width:100%;margin-top:20px" />
          <el-skeleton-item variant="text" style="width:100%;margin-top:20px" />
          <div class="title" style="margin-top:15px">
            <el-skeleton-item variant="text" style="width:4%;" />
            <el-skeleton-item variant="text" style="width:4%;" />
          </div>
        </template>
        <template #default>
          <div class="title">
            <h4>帖子标题帖子标题帖子标题</h4>
            <div class="titleImgList">
              <img src="@/assets/image/community/hot.png" style="width:20px;height:20px;" />
              <img src="@/assets/image/community/jing.png" style="width:20px;height:20px;" />
            </div>
          </div>
          <div class="con">
            <div class="con_l">
              <img src="@/assets/image/community/nimin.png" style="width:35px;height:35px;border-radius:50%" />
              <p>帖子作者帖子作者</p>
              <p>2023-04-19 15:17:29</p>
            </div>
            <div class="con_r">
              <div>
                <img src="@/assets/image/community/view.png" style="width:20px;height:20px;" />
                <p>20</p>
              </div>
              <div>
                <img src="@/assets/image/community/comment.png" style="width:20px;height:20px;" />
                <p>200</p>
              </div>
              <div>
                <img src="@/assets/image/community/like.png" style="width:20px;height:20px;" />
                <p>34</p>
              </div>
            </div>
          </div>
          <p style="letter-space:1px;margin-top:15px">从实践角度对上述四个概念进一步澄清。通常在一个汽车软件开发组织中，符合 ASPICE 的流程都可在符合 CMMI
            的基础上继续深化其可追溯性的严苛程度而实现。而 V 模型（或瀑布模型）是一种通用的软件工程方法，而非标准，ASPICE 及 CMMI 流程均以 V 模型为核心理念。敏捷开发方法则强调开发效率，如经过精细流程设计，可与
            CMMI/ASPICE 流程在同一项目中并存。</p>
          <div class="titleActr" style="margin-top:15px">
            <p>后端</p>
            <p>前端前端前端</p>
          </div>
        </template>
      </el-skeleton>
    </div>
    <div>
      <label style="margin-right: 16px">牛人</label>
      <el-switch v-model="loadingTwo" />
    </div>
    <div class="people">
      <el-skeleton :loading="loadingTwo" animated>
        <template #template>
          <div class="niurenList">
            <div class="niurenItem">
              <div style="text-align: center">
                <el-skeleton-item class="head" variant="image" />
              </div>
              <p class="name">
                <el-skeleton-item variant="text" />
              </p>
              <div class="numList">
                <div>
                  <el-skeleton-item class="num" variant="text" style="width:35px" />
                  <el-skeleton-item class="con" variant="text" style="width:35px" />
                </div>
                <span></span>
                <div>
                  <el-skeleton-item class="num" variant="text" style="width:35px" />
                  <el-skeleton-item class="con" variant="text" style="width:35px" />
                </div>
                <span></span>
                <div>
                  <el-skeleton-item class="num" variant="text" style="width:35px" />
                  <el-skeleton-item class="con" variant="text" style="width:35px" />
                </div>
              </div>
              <!-- actBtn -->
              <div>
                <div class="btn">
                  <el-skeleton-item variant="text" style="width:86px;height:32px" />
                </div>
                <div class="new">
                  <el-skeleton-item variant="image" style="width: 68px;height: 13px" />
                  <el-skeleton-item variant="text" style="width:66px" />
                  <el-skeleton-item variant="image" style="width: 68px;height: 13px" />
                </div>
                <div class="cons">
                  <el-skeleton-item variant="text" />
                </div>
                <div class="view">
                  <el-skeleton-item variant="text" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div class="niurenList">
            <div class="niurenItem">
              <div style="text-align: center">
                <img class="head" src="@/assets/image/community/head.png" alt="" />
              </div>
              <p class="name">
                <span>用户名用户名<i style="margin: 0 3px">·</i></span><span>LV2</span>
              </p>
              <div class="numList">
                <div>
                  <p class="num">10</p>
                  <p class="con">帖子</p>
                </div>
                <span></span>
                <div>
                  <p class="num">20</p>
                  <p class="con">回复</p>
                </div>
                <span></span>
                <div>
                  <p class="num">50</p>
                  <p class="con">粉丝</p>
                </div>
              </div>
              <!-- actBtn -->
              <div>
                <div class="btn actBtn">
                  <el-button type="danger">已关注</el-button>
                </div>
              </div>
              <div class="new">
                <img src="@/assets/image/community/niureTitleLeft.png" alt="" />
                <span>最新热帖</span>
                <img src="@/assets/image/community/niureTitleRight.png" alt="" />
              </div>
              <div class="cons">
                <span>帖子标题</span>
              </div>
              <div class="view">
                <i class="views"></i>
                <span>100</span>
                <i class="comment"></i>
                <span>7574</span>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const loadingOne = ref(true)
const loadingTwo = ref(true)
</script>
<style lang="less" scoped>
.skeletonOne {
  width: 1000px;
  margin: 20px 0
}

.skeletonOne .title,
.skeletonOne .titleImgList,
.con_l,
.con_r {
  display: flex;
  align-items: center;
  gap: 15px
}

.con_l,
.con_r {
  width: 40%;
}

.con_r div {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 20%
}

.con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px
}

.titleActr {
  display: flex;
  align-items: center;
  gap: 15px;

}

.titleActr p {
  padding: 2px 5px;
  border: 1px solid #888;
  color: #888;
  background: #f5f5f5;
  font-size: 14px;
  letter-spacing: 0.5px
}

.niurenList {
  width: 1000px;
  margin: 0 11px;
  overflow: hidden;
  padding-top: 10px;

  .niurenItem {
    float: left;
    border: solid 1px #d9d9d9;
    padding: 20px;
    width: 23.8%;
    height: 100%;
    max-height: 410px;
    margin: 10px;
    margin-left: 0;
    margin-top: 0;

    .head {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 auto 17px;

      img {
        border-radius: 50%;
      }
    }

    .name {
      color: #000000;
      font-size: 18px;
      margin-bottom: 30px;
      letter-spacing: 1px;
      text-align: center;
      display: flex;
      align-items: center;

      span {
        color: #e60012;
        font-size: 14px;
        margin-left: 10px;
      }

      span:nth-of-type(1) {
        width: 120px;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #000000;
        font-size: 18px;
        text-align: right;
        height: 20px;
      }
    }

    .numList {
      display: flex;
      align-items: center;
      gap: 25px;
      white-space: nowrap;
      text-align: center;
      justify-content: space-between;
      letter-spacing: 0.5px;
      margin-bottom: 24px;

      span {
        width: 1.5px;
        height: 28px;
        background-color: #d9d9d9;
      }

      .num {
        color: #000000;
        font-size: 16px;
        margin-bottom: 10px;
      }

      .con {
        color: #999999;
        font-size: 14px;
      }
    }

    .btn {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      margin-bottom: 24px;

      button {
        width: 86px;
        height: 32px;
        line-height: 30px;
        text-align: center;
        padding: 0;
        display: block;
      }
    }

    .actBtn {
      button {
        background: #fdcbce !important;
        color: #e60012 !important;
        border-color: #fdcbce !important;
      }
    }

    .new {
      display: flex;
      gap: 8px;
      justify-content: center;
      white-space: nowrap;
      letter-spacing: 0.5px;
      margin-bottom: 24px;

      span {
        color: #000000;
        font-size: 16px;
      }

      img {
        width: 68px;
        height: 6px;
        display: block;
        margin-top: 11px;
      }
    }

    .cons {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 18px;
      color: #575757;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin-bottom: 21px;

      span {
        cursor: pointer;
      }

      p {
        margin: 0;
      }
    }

    .view {
      display: flex;
      align-items: center;

      .views {
        // cursor: pointer;
        width: 21px;
        height: 14px;
        display: block;
        margin-right: 10px;
        background: url('../../../assets/image/community/view.png') no-repeat;
        background-size: 100% 100%;
        // &:hover {
        //   background: url('../../../../assets/images/communityForum/viewActive.png')
        //     no-repeat;
        // }
      }

      .comment {
        // cursor: pointer;
        width: 16px;
        height: 14px;
        display: block;
        margin-right: 10px;
        background: url('../../../assets/image/community/comment.png') no-repeat;
        background-size: 100% 100%;
        // &:hover {
        //   background: url('../../../../assets/images/communityForum/commentActive.png')
        //     no-repeat;
        // }
      }

      span {
        margin-right: 32px;
        color: #777777;
        font-size: 16px;
      }
    }
  }
}
</style>