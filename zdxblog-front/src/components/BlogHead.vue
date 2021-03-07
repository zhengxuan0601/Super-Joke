<template>
  <header>
    <div class="svg_git">
      <svg t="1611488320849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5765" width="32" height="32"><path d="M938.666667 512a426.666667 426.666667 0 0 1-291.84 404.48 22.186667 22.186667 0 0 1-19.2-2.986667 21.76 21.76 0 0 1-8.96-17.493333v-113.92a170.666667 170.666667 0 0 0-21.333334-87.893333 10.666667 10.666667 0 0 1 0-11.52 11.52 11.52 0 0 1 8.533334-5.973334c104.106667-10.666667 162.133333-52.053333 162.133333-164.693333a200.96 200.96 0 0 0-50.773333-143.36 183.466667 183.466667 0 0 0 8.106666-51.2 184.746667 184.746667 0 0 0-6.4-46.08 20.906667 20.906667 0 0 0-22.613333-15.36 189.866667 189.866667 0 0 0-104.106667 50.346667 422.826667 422.826667 0 0 0-160.426666 0A189.866667 189.866667 0 0 0 327.68 256a20.906667 20.906667 0 0 0-22.613333 15.36A184.746667 184.746667 0 0 0 298.666667 317.44a183.466667 183.466667 0 0 0 8.106666 51.2A200.96 200.96 0 0 0 256 512c0 118.613333 64.426667 158.293333 182.613333 168.106667a158.293333 158.293333 0 0 0-29.44 65.28v5.12a29.013333 29.013333 0 0 0 0 5.973333 25.173333 25.173333 0 0 1-27.306666 21.76 42.666667 42.666667 0 0 1-18.346667-5.12 227.84 227.84 0 0 1-60.586667-53.76 430.506667 430.506667 0 0 0-34.133333-34.56 116.906667 116.906667 0 0 0-25.173333-16.64 20.906667 20.906667 0 0 0-20.48 0 21.333333 21.333333 0 0 0-9.813334 17.92v2.56a21.333333 21.333333 0 0 0 9.813334 17.92 193.706667 193.706667 0 0 1 39.253333 44.8 282.026667 282.026667 0 0 0 67.84 73.386667 105.813333 105.813333 0 0 0 59.733333 17.92h15.36V896a21.76 21.76 0 0 1-8.96 17.493333 22.186667 22.186667 0 0 1-19.2 2.986667A426.666667 426.666667 0 1 1 938.666667 512z" p-id="5766" fill="#fff"></path></svg>
    </div>
    <div class="content_width content_nav">
      <div class="_log" @click="toBackSystem">
        <el-tooltip class="item" effect="dark" content="前往后台管理" placement="bottom">
          <img :src="'data:image/png;base64,' + configInfo.headlogoImgSrc" alt="">
        </el-tooltip>
        <span>{{ configInfo.blogTopDesc }}</span>
      </div>
      <nav>
        <ul>
          <li
            :class="{ _active: $route.path === item.menuUrl }"
            @click="$router.push(item.menuUrl)"
            v-for="(item, index) in menuList"
            :key="index" >
            <span :class="item.menuIcon + ' icon'"></span>
            <span class='_name'>{{ item.menuName }}</span>
          </li>
        </ul>
      </nav>
      <div class="fix_right">
        <div @click="loginAdmin">
          <em class="el-icon-user-solid"></em>
          <span v-if="!adminuserInfo">登录</span>
           <el-tooltip v-else class="item" effect="dark" content="退出登录" placement="top-end">
              <span>{{ adminuserInfo.nickName }}</span>
            </el-tooltip>
        </div>
      </div>
    </div>
    <LoginModel
      @close-model="updateLoginState"
      v-if="loginVisible" />
  </header>
</template>

<script>
import { findMenuList } from '@/api/frontApi'
import LoginModel from '@/pages/components/LoginModel'
import { mapState } from 'vuex'
export default {
  components: { LoginModel },
  data () {
    return {
      menuList: [],
      loginVisible: false,
      adminuserInfo: ''
    }
  },

  created () {
    this.initAdminuserInfo()
    this.findMenuList()
  },

  methods: {
    initAdminuserInfo () {
      if (localStorage.getItem('adminuserInfo')) {
        this.adminuserInfo = JSON.parse(localStorage.getItem('adminuserInfo'))
      }
    },

    updateLoginState (loginState) {
      loginState && (this.adminuserInfo = JSON.parse(localStorage.getItem('adminuserInfo')))
      this.loginVisible = false
    },

    loginAdmin () {
      if (localStorage.getItem('adminuserInfo')) {
        this.$confirm('确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adminuserInfo = ''
          localStorage.removeItem('adminuserInfo')
          this.$message({
            type: 'success',
            message: '退出登录成功'
          })
        })
        return
      }
      this.loginVisible = true
    },

    findMenuList () {
      findMenuList().then(res => {
        this.menuList = res.data || []
      })
    },

    toBackSystem () {
      const backSystem = this.$router.resolve({ name: 'MenuConfig' })
      window.open(backSystem.href, '_blank')
    }
  },

  computed: {
    ...mapState({
      configInfo: state => state.configInfo
    })
  }
}
</script>

<style scoped lang="less">
header {
  border-bottom: 1px solid #e5e5e5;
  position: relative;
  cursor: url("~@/assets/images/link.png"), default;
  background: rgba(250,250,250,.92);
  .svg_git {
    position: absolute;
    left: 0;
    top: 0;
    border-top: 28px solid #ff2f56;
    border-left: 28px solid #ff2f56;
    border-right: 28px solid rgba(255,255,255,0);
    border-bottom: 28px solid rgba(255,255,255,0);
    svg {
      position: absolute;
      left: -30px;
      top: -26px;
    }
  }
  .fix_right {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    & > div {
      span {
        color: #2080f7;
        font-size: 13px;
        cursor: url('~@/assets/images/link.png'), default;
        letter-spacing: 1.2px;
      }
      em {
        color: #2080f7;
        position: relative;
        top: 1px;
        margin-right: 4px;
      }
    }
  }
  .content_nav {
    display: flex;
    height: 56px;
    align-items: center;
    justify-content: space-between;
    ._log {
      font-size: 14px;
      cursor: url('~@/assets/images/link.png'), default;
      color: #4c4c4c;
      display: flex;
      align-items: center;
      img {
        width: 28px;
        border-radius: 50%;
        transition: 0.6s ease-out;
        padding: 3px;
        border-top: 1px solid #2080f7;
        border-right: 1px solid #ed5555;
        border-bottom: 1px solid #50ecec;
        border-left: 1px solid #e6cf79;
        &:hover {
          transform: rotate(360deg);
        }
      }
      span {
        margin-left: 12px;
        letter-spacing: 1px;
        font-family: cursive;
        background: linear-gradient(to right, red, blue);
        background-clip: text;
        color: transparent;
        animation: blink 2s linear infinite;
      }
    }
    nav {
      width: 0;
      flex: 1;
      height: 100%;
      ul {
        display: flex;
        justify-content: flex-end;
        height: 100%;
        padding-right: 60px;
        li {
          padding: 0 16px;
          display: flex;
          align-items: center;
          height: 100%;
          transition: .2s;
          ._name {
            font-size: 14px;
            margin-left: 4px;
            transition: .3s;
            font-family: cursive;
          }
          &._active {
            color: #2080f7;
            ._name {
              font-size: 18px;
              background: linear-gradient(to right, red, blue);
              background-clip: text;
              color: transparent;
            }
            .icon {
              background: linear-gradient(to right, red, blue);
              background-clip: text;
              color: transparent;
            }
          }
          cursor: url('~@/assets/images/link.png'), default;
          .icon {
            position: relative;
            top: 1px;
          }
          &:hover {
            ._name {
              background: linear-gradient(to right, red, blue);
              background-clip: text;
              color: transparent;
            }
          }
        }
      }
    }
  }
}

@keyframes blink{
  0%{opacity: 1;}
  50%{opacity: 0.5;}
  100%{opacity: 0.8;}
}
</style>
