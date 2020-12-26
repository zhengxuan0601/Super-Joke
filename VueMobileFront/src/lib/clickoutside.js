import Vue from 'vue'

const nodeList = []
const ctx = '@@clickoutsideContext'
const isServer = Vue.prototype.$isServer
const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

let startClick
let seed = 0

!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e))

!Vue.prototype.$isServer &&
  on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
  })

function createDocumentHandler (el, binding, vnode, excludes) {
  return function (mouseup = {}, mousedown = {}) {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))
    ) {
      return
    }

    if (
      excludes &&
      (excludes.includes(mousedown.target) || excludes.includes(mouseup.target))
    ) {
      return
    }
    if (
      binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]
    ) {
      vnode.context[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  bind (el, binding, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(
        el,
        binding,
        vnode,
        binding.value.excludes
      ),
      methodName: binding.expression,
      bindingFn:
        typeof binding.value === 'function' ? binding.value : binding.value.fn
    }
  },

  update (el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(
      el,
      binding,
      vnode,
      binding.value.excludes
    )
    el[ctx].methodName = binding.expression

    el[ctx].bindingFn =
      typeof binding.value === 'function' ? binding.value : binding.value.fn
  },

  unbind (el) {
    const len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
