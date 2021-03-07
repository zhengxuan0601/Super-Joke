import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export default async function initApp () {
  await Promise.all([getIcon()])
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

function getIcon () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, Math.random() * 3000)
  })
}
