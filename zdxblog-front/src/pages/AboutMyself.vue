<template>
  <div class="content_width co_myself" v-loading="loading">
    <h5>关于我</h5>
    <div class="content">
      <div v-html="aboutMessage" class="ql-editor"></div>
      <div class="update_logs">
        <h4>更新日志</h4>
        <div class="log_model">
          <div
            :class="{ b_dark: (index + 1) % 2 === 0, b_green: (index + 1) % 3 === 0 }"
            v-for="(item, index) in updateLogsTree" :key="index">
            <div class="_t">{{ item.titleTime.substring(0, 4) }}年 {{ item.titleTime.substring(5, 7) }}月</div>
            <div class="_c" v-for="(itemName, idx) in item.children" :key="idx">
              <p>{{ itemName.time.substring(8, 11) }}日</p>
              <div class="_mes">
                <h3>{{ itemName.mes }}</h3>
                <div class="_r"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="_t _start">开始</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mapContent">
      <div id="hmap"></div>
    </div>
  </div>
</template>

<script>
import { findAoutselfMessage, findUpdateLog } from '@/api/frontApi'
import { initMap, addMapMarker } from '@/lib/bdmap'
export default {
  data () {
    return {
      aboutMessage: '',
      loading: false,
      updateLogsTree: []
    }
  },

  created () {
    this.findAoutselfMessage()
    this.findUpdateLog()
    this.$nextTick(() => {
      initMap('hmap').then(res => {
        addMapMarker('hmap', { lon: 120.20000, lat: 30.26667 }, {
          icon: require('@/assets/images/mark.png'),
          w: 32,
          h: 32
        })
      })
    })
  },

  methods: {
    findAoutselfMessage () {
      this.loading = true
      findAoutselfMessage().then(res => {
        this.aboutMessage = res.data ? res.data.aboutMessage : ''
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    findUpdateLog () {
      findUpdateLog().then(res => {
        let updateLogs = res.data || []
        let logsTree = updateLogs.reduce((prev, cur) => {
          let titleTime = cur.updateBlogTime.substring(0, 7)
          let index = prev.findIndex(o => o.titleTime === titleTime)
          if (index > -1) {
            prev[index].children = [...prev[index].children, {
              time: cur.updateBlogTime,
              mes: cur.updateContent
            }]
          } else {
            prev.push({
              titleTime: cur.updateBlogTime.substring(0, 7),
              children: [{
                time: cur.updateBlogTime,
                mes: cur.updateContent
              }]
            })
          }
          return prev
        }, [])
        this.updateLogsTree = logsTree
      })
    }
  }
}
</script>

<style scoped lang="less">
.co_myself {
  min-height: ~"calc(100vh - 56px)";
  padding-bottom: 50px;
  /deep/.ql-editor {
    a {
      color: #4c4c4c;
    }
  }
  .mapContent {
    #hmap {
      width: 1200px;
      height: 1200px;
      border: 5px double #c6edf6;
      margin-top: 10px;
    }
  }
  h5 {
    text-align: center;
    padding: 50px 0 30px 0;
    font-size: 32px;
    letter-spacing: 8px;
    color: #17c0e8;
    font-weight: bold;
  }
  .content {
    background: rgba(250,250,250,.92);
    padding: 30px 50px;
    border: 5px double #c6edf6;
    border-radius: 4px;
    .update_logs {
      margin-top: 20px;
      h4 {
        color: #d22656;
        font-size: 18px;
        letter-spacing: 2px;
      }
      .log_model {
        margin-top: 30px;
        margin-left: 20px;
        ._t {
          display: inline-block;
          width: 92px;
          height: 30px;
          line-height: 30px;
          color: #fff;
          background: #23b7e5;
          text-align: center;
          font-size: 12px;
          border-radius: 15px;
          cursor: url('~@/assets/images/link.png'), default;
          &._start {
            background: #fff;
            color: #4c4c4c;
            box-shadow: 0 0 4px rgba(0,0,0,.2);
          }
        }
        ._c {
          display: flex;
          align-items: center;
          font-size: 12px;
          p {
            color: #999;
            flex-shrink: 0;
          }
          ._mes {
            padding: 15px 0 15px 26px;
            border-left: 4px solid #23b7e5;
            margin-left: 16px;
            position: relative;
            transition: .2s;
            &:hover {
              opacity: .8;
            }
            h3 {
              background-color: #23b7e5;
              color: #fff;
              padding: 8px 15px;
              border-radius: 2px;
              position: relative;
              font-size: 12px;
              cursor: url('~@/assets/images/link.png'), default;
              &:after {
                content: "";
                width: 0;
                height: 0;
                border-top: 8px solid #23b7e5;
                border-right: 8px solid transparent;
                border-left: 8px solid transparent;
                border-bottom: 8px solid transparent;
                position: absolute;
                left: -15px;
                transform: rotate(90deg);
                top: 50%;
                margin-top: -8px;
              }
            }
            ._r {
              position: absolute;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #fff;
              box-shadow: 0 0 4px #e8dede;
              left: -11px;
              top: 50%;
              margin-top: -6px;
              &:after {
                content: "";
                width: 4px;
                height: 4px;
                position: absolute;
                left: 4px;
                top: 4px;
                border-radius: 50%;
                border: 2px solid #23b7e5;
              }
            }
          }
        }
        .b_dark {
          ._t {
            background: rgb(58, 63, 81);
          }
          ._mes {
            border-left: 4px solid rgb(58, 63, 81);
            h3 {
              background-color: rgb(58, 63, 81);
              &:after {
                border-top: 8px solid rgb(58, 63, 81);
              }
            }
            ._r {
              &:after {
                border: 2px solid rgb(58, 63, 81);
              }
            }
          }
        }
        .b_green {
          ._t {
            background: rgb(39, 194, 76);
          }
          ._mes {
            border-left: 4px solid rgb(39, 194, 76);
            h3 {
              background-color: rgb(39, 194, 76);
              &:after {
                border-top: 8px solid rgb(39, 194, 76);
              }
            }
            ._r {
              &:after {
                border: 2px solid rgb(39, 194, 76);
              }
            }
          }
        }
      }
    }
  }
}
</style>
