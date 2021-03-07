<template>
  <div class="message_model">
    <div class='desc'>
      <span class="el-icon-info icon"></span>
      <em>留言说明</em>
      <p>请输入正确的邮箱哟~~</p>
    </div>
    <el-form :model="messageContent" :rules="messageRules" ref="messageContent" label-width="100px">
      <el-row :gutter="10">
        <el-col :span="2">
          <div class="img_block"
            @mouseleave="imgSelectVisible = false"
            @mouseenter="imgSelectVisible = true">
            <img :src="currentImg" alt="">
            <el-collapse-transition>
              <div class="img_list" v-show="imgSelectVisible">
                <img
                  v-for="(item, index) in hederImgList.filter(o => o !== currentImg)"
                  @click="currentImg = item; imgSelectVisible = false"
                  :key="index"
                  :src="item" alt="">
              </div>
            </el-collapse-transition>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="messageContent.nickName" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="messageContent.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="评论" prop="message">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="随便吐槽两句吧~"
          v-model="messageContent.message">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMessage">提交评论</el-button>
        <el-button @click="$refs.messageContent.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="message_list">
      <p>共 <em>{{ messageList.length }}</em> 条评论</p>
      <div class="message_block" v-noData="!messageList.length">
        <ul>
          <li
            :key="index"
            v-for="(item, index) in messageList">
            <div class="top">
              <div class="_l">
                <div class="logo"><img :src="item.headImg" alt=""></div>
                <p class="name">{{ item.nickName }}</p>
                <div class="_tag" v-if="item.os">{{ item.os }}</div>
                <div class="_tag" v-if="item.browseVersion">{{ item.browseVersion }}</div>
              </div>
              <div class="_r">
                <span>{{ item.createTime }}</span>
                <span class='feedback' v-if="adminuserInfo" @click="toggleFeedback(item)">回复</span>
              </div>
            </div>
            <el-collapse-transition>
              <div class=feedbackInput v-if="item.feedbackState">
                <el-input
                  placeholder="请输入内容"
                  v-model="feedbackContent"
                  clearable>
                </el-input>
                <el-button @click="submitFeedbackMes(item)" type="primary" :disabled="!feedbackContent">提交评论</el-button>
              </div>
            </el-collapse-transition>
            <div class="mescontent">
              <div>{{ item.message }}</div>
              <div class="feedback_message" v-if="item.children && item.children.length">
                <div v-for="(itemName, idx) in item.children" :key="idx">
                  <span>{{ itemName.nickName }}回复：</span>
                  <p>{{ itemName.message }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RULE_REQUIRED, RULE_INCORRECTEMAIL } from '@/lib/dic'
import { saveMessage, queryAllMessage } from '@/api/frontApi'
import { getTargetOS, getBrowse } from '@/lib/util'
export default {
  props: {
    articleId: {
      type: Number
    }
  },
  data () {
    return {
      messageContent: {
        nickName: '',
        email: '',
        message: ''
      },
      messageRules: {
        nickName: [RULE_REQUIRED],
        email: [RULE_REQUIRED, RULE_INCORRECTEMAIL],
        message: [RULE_REQUIRED]
      },
      messageList: [],
      adminuserInfo: localStorage.getItem('adminuserInfo') ? JSON.parse(localStorage.getItem('adminuserInfo')) : '',
      feedbackContent: '',
      hederImgList: [
        './static/headimg/head1.jpeg',
        './static/headimg/head2.jpeg',
        './static/headimg/head3.jpeg',
        './static/headimg/head4.jpeg',
        './static/headimg/head5.jpeg',
        './static/headimg/head6.jpeg',
        './static/headimg/head7.jpeg'
      ],
      currentImg: './static/headimg/head1.jpeg',
      imgSelectVisible: false
    }
  },

  created () {
    this.queryAllMessage()
  },

  methods: {
    /* 添加评论信息 */
    submitMessage () {
      this.$refs.messageContent.validate(valid => {
        if (valid) {
          const searchParams = {
            ...this.messageContent,
            articleId: this.articleId,
            os: getTargetOS(),
            browseVersion: getBrowse(),
            headImg: this.currentImg
          }
          saveMessage(searchParams).then(res => {
            this.$refs.messageContent.resetFields()
            this.$message({
              type: 'success',
              message: '添加评论成功'
            })
            this.queryAllMessage()
          })
        }
      })
    },

    submitFeedbackMes (messageItem) {
      const adminuserInfo = JSON.parse(localStorage.getItem('adminuserInfo'))
      const searchParams = {
        message: this.feedbackContent,
        nickName: adminuserInfo.nickName,
        email: adminuserInfo.email,
        articleId: this.articleId,
        parentId: messageItem.id
      }
      saveMessage(searchParams).then(res => {
        this.$message({
          message: '回复评论成功',
          type: 'success'
        })
        this.queryAllMessage()
        this.feedbackContent = ''
      })
    },

    /* 查询所有留言评论数据信息 */
    queryAllMessage () {
      queryAllMessage(this.articleId).then(res => {
        this.messageList = (res.data || []).map(item => {
          return {
            ...item,
            feedbackState: false
          }
        })
      })
    },

    toggleFeedback (messageItem) {
      this.feedbackContent = ''
      messageItem.feedbackState = !messageItem.feedbackState
      for (let i = 0; i < this.messageList.length; i++) {
        if (this.messageList[i].feedbackState && messageItem.id !== this.messageList[i].id) {
          this.messageList[i].feedbackState = false
          break
        }
      }
    }
  },

  watch: {
    articleId (newVal) {
      if (newVal) {
        this.queryAllMessage()
      }
    }
  }
}
</script>

<style scoped lang="less">
.message_model {
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  margin-top: 50px;
  transition: .3s;
  background: rgba(250,250,250,.92);
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .desc {
    font-size: 14px;
    letter-spacing: 1.5px;
    .icon {
      color: #f57225;
      position: relative;
      top: 2px;
    }
    em {
      margin-left: 4px;
      vertical-align: top;
      color: #999;
    }
    p {
      color: #4c4c4c;
      padding-top: 5px;
    }
  }
  /deep/.el-form {
    margin-top: 30px;
    padding: 0 50px;
    .img_block {
      text-align: right;
      position: relative;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: url('~@/assets/images/link.png'), default;
        display: block;
      }
      & > img {
        position: absolute;
        right: 25px;
        top: 2px;
      }
      .img_list {
        position: absolute;
        top: 40px;
        left: 16px;
        text-align: left;
        z-index: 999;
        img {
          margin-bottom: 4px;
        }
      }
    }
  }
  .message_list {
    & > p {
      font-size: 14px;
      em {
        color: orange;
      }
    }
    .message_block {
      padding: 20px;
      font-size: 13px;
      min-height: 200px;
      li {
        border-bottom: 1px solid #f1f1f1;
        padding-top: 10px;
        .top {
          display: flex;
          justify-content: space-between;
          ._r {
            span {
              color: #999;
              font-size: 12px;
              &.feedback {
                margin-left: 8px;
                cursor: url('~@/assets/images/link.png'), default;
              }
            }
          }
          ._l {
            display: flex;
            align-items: center;
            .logo {
              img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
              }
            }
            .name {
              margin: 0 10px;
              color: orange;
            }
            ._tag {
              padding: 6px 12px;
              background: rgba(32,128,247,.06);
              color: #2080f7;
              border-radius: 2px;
              margin-right: 10px;
              font-family: cursive;
              position: relative;
              &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 2px solid rgba(0,255,238,0.26);
                animation: clippathX 3s infinite linear;
              }
              &:nth-child(2n) {
                &:before {
                  animation-direction: alternate;
                }
              }
            }
          }
        }
        .feedbackInput {
          padding: 10px 20px 0;
          display: flex;
          button {
            margin-left: 10px;
          }
        }
        .mescontent {
          padding: 20px;
          .feedback_message {
            padding: 10px 10px 0;
            & > div {
              display: flex;
              padding: 6px 0;
              span {
                color: #2080f7;
              }
            }
          }
        }
      }
    }
  }
}

@keyframes clippathX {
  0%,
  100% {
    clip-path: inset(0 0 95% 0);
  }
  25% {
    clip-path: inset(0 95% 0 0);
  }
  50% {
    clip-path: inset(95% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 95%);
  }
}
</style>
