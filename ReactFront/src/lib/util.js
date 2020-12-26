// 生成一个随机id
function newRandomId () {
  let randomId = ''
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16)
    randomId += n
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
      randomId += '-'
    }
  }
  return randomId
}

/**
 * 函数防抖
 * @author zhengxuan
 * @param func 需要防抖的实际方法
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce (func, wait, immediate) {
  let timeout
  return function () {
    let that = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) func.apply(that, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(that, args)
      }, wait)
    }
  }
}

/**
 * 函数节流
 * @author zhengxuan
 * @param func 需要节流的实际方法
 * @param wait 延迟执行毫秒数(需要控制的时间长度)
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle (func, wait, type) {
  if (type === 1) {
    var previous = 0 // 第一次执行的时候是0，第一次点击的时候肯定大于这个数，所以会立马执行
  } else if (type === 2) {
    var timeout
  }
  return function () {
    let that = this
    let args = arguments
    if (type === 1) {
      let now = Date.now() // 实际执行的时间

      if (now - previous > wait) { // 执行的时间是不是比上次执行的时间大于需要延迟的时间，大于，则执行
        func.apply(that, args)
        previous = now // 执行了以后，重置上一次执行的时间为刚刚执行这次函数的时间，下次执行就用这个时间为基准
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null
          func.apply(that, args)
        }, wait)
      }
    }
  }
}
export { newRandomId, debounce, throttle }
