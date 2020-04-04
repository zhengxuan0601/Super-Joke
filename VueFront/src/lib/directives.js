import Vue from 'vue'
const noDataSvg = require('@/assets/basicImg/NoData.png')

function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

const togglePageEmpty = (el, binding) => {
  Vue.nextTick(() => {
    let emptyEl = el.emptyWrap
    if (binding.value) {
      emptyEl.innerHTML = `<div class="inner"><img src=${noDataSvg} /></div>`
      emptyEl.style.display = 'block'
    } else {
      emptyEl.innerHTML = ''
      emptyEl.style.display = 'none'
    }
  })
}

const noDataDirective = {
  bind (el, binding) {
    el.style.position = 'relative'
    let emptyWrap = document.createElement('div')
    addClass(emptyWrap, 'no-data-fallback')
    el.emptyWrap = emptyWrap
    el.appendChild(emptyWrap)
    togglePageEmpty(el, binding)
  },
  update (el, binding) {
    togglePageEmpty(el, binding)
  },
  unbind (el) {
    el.emptyWrap && el.removeChild(el.emptyWrap)
  }
}

export { noDataDirective }
