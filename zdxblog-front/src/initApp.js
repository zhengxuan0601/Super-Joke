import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { findBlogConfig } from '@/api/frontApi'

export default async function initApp () {
  await Promise.all([sessionStore(), getConfigInfo()])
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

function sessionStore () {
  return new Promise(resolve => {
    // 存储全局的store到sessionStorage里面解决刷新丢失store数据的问题
    window.sessionStorage.getItem('GlobalStateInfo') && store.replaceState(Object.assign(store.state, JSON.parse(window.sessionStorage.getItem('GlobalStateInfo'))))
    // 在页面刷新的时候将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      window.sessionStorage.setItem('GlobalStateInfo', JSON.stringify(store.state))
    })
    resolve()
  })
}

function getConfigInfo () {
  return new Promise(resolve => {
    findBlogConfig().then(res => {
      store.commit('UPDATE_CONFIGINFO', res.data || {})
      resolve()
    }).catch(resolve)
  })
}
