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

/*
* 根据两点坐标及半径确定圆弧所在的圆心及两点之间圆弧弧度大小
* @param{ p1, p2 } 两点坐标 { x: '', y: '' }
* @param{ r } 所需要确定圆心的半径
*/
function getCenterByRAndPoint (p1, p2, r) {
  // 当给出两点坐标的纵坐标坐标坐标相同时
  if (p1.y === p2.y) {
    let discX = Math.abs(p1.x - p2.x)
    let centerX = (p1.x + p2.x) / 2
    if (r < discX / 2) {
      throw new Error('半径r不能小于两点间距离的一半')
    }
    let interceptY = Math.sqrt(Math.pow(r, 2) - Math.pow(discX / 2, 2)) // 圆心距离两点间连线垂直距离
    // 根据余弦定理获取两点间弧度大小
    let disCosA = (2 * Math.pow(r, 2) - Math.pow(discX, 2))
    let lessRadian = Math.acos(0.5 * disCosA / Math.pow(r, 2))
    // 根据图形可求出起始点和水平向右两点间弧度
    let startAngel = 90 * Math.PI / 180 - lessRadian / 2
    return {
      p1: { x: centerX, y: p1.y + interceptY, startAngel: -startAngel, endAngel: -startAngel - lessRadian, drawRadialDirection: true },
      p2: { x: centerX, y: p2.y - interceptY, startAngel: startAngel, endAngel: startAngel + lessRadian, drawRadialDirection: false },
      lessRadian
    }
  } else if (p1.x === p2.x) { // 当给出两点坐标的横坐标坐标相同时
    let discY = Math.abs(p1.y - p2.y)
    let centerY = (p1.y + p2.y) / 2
    if (r < discY / 2) {
      throw new Error('半径r不能小于两点间距离的一半')
    }
    let interceptX = Math.sqrt(Math.pow(r, 2) - Math.pow(discY / 2, 2)) // 圆心距离两点间连线垂直距离
    // 根据余弦定理获取两点间弧度大小
    let disCosA = (2 * Math.pow(r, 2) - Math.pow(discY, 2))
    let lessRadian = Math.acos(0.5 * disCosA / Math.pow(r, 2))
    return {
      p1: { x: p1.x + interceptX, y: centerY, startAngel: lessRadian / 2 - Math.PI, endAngel: -lessRadian / 2 - Math.PI, drawRadialDirection: true },
      p2: { x: p2.x - interceptX, y: centerY, startAngel: -lessRadian / 2, endAngel: lessRadian / 2, drawRadialDirection: false },
      lessRadian
    }
  }

  // 当两点坐标横坐标和纵坐标均不相等时 计算斜率k
  let k = -1 / ((p2.y - p1.y) / (p2.x - p1.x))
  let centerPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
  let b = centerPoint.y - centerPoint.x * k
  // y = k * x + b 两点之间连线垂线的一次函数表达式
  // (x, k * x + b)
  // Math.pow(x - p1.x, 2) + Math.pow(k * x + b - p1.y, 2) = Math.pow(r, 2)  圆心到某一点的距离和r相等二次函数表达式求圆心坐标
  // A * x^2 + B * x + C = 0
  let A = 1 + Math.pow(k, 2)
  let B = -2 * p1.x + (b - p1.y) * k * 2
  let C = Math.pow(p1.x, 2) + Math.pow(b - p1.y, 2) - Math.pow(r, 2)
  let disc = Math.pow(B, 2) - 4 * A * C
  if (disc < 0) {
    throw new Error('根据提供两点坐标和半径无法绘制出圆弧')
  } else {
    // 两个点 p1: { x: x1, y: y1 }  p2: { x: x2, y: y2 }
    let x1 = -1 * (B / (2 * A)) + Math.pow(disc, 0.5) / (-2 * A)
    let x2 = -1 * (B / (2 * A)) - Math.pow(disc, 0.5) / (-2 * A)
    let y1 = x1 * k + b
    let y2 = x2 * k + b
    // cosA = (b ^ 2 + c ^ 2 - a ^ 2) / 2 * b * c 根据余弦定理求出两点之间圆弧的弧度
    let disCosA = 2 * Math.pow(r, 2) - (Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    let lessRadian = Math.acos(disCosA / (2 * Math.pow(r, 2)))

    // 求出此段弧的起点和重点以水平向右为起点
    // 顺时针为正弧,逆时针为负弧
    // 取水平原点和x轴数值较大一点的两点弧度为起始弧度
    let startAngelFirst = getStartAndEndAngel({ x: x1, y: y1 }, r, p1, p2)
    let endAngelFirst = startAngelFirst > 0 ? startAngelFirst + lessRadian : startAngelFirst - lessRadian
    let startAngelSecond = getStartAndEndAngel({ x: x2, y: y2 }, r, p1, p2)
    let endAngelSecond = startAngelSecond > 0 ? startAngelSecond + lessRadian : startAngelSecond - lessRadian
    /*
    * @param { startAngel } 两点之间圆弧起点弧度 - 只考虑小圆弧
    * @param { endAngel } 两点之间圆弧重点弧度
    * @param { drawRadialDirection } 两点之间小圆弧绘制时候逆时针还是顺时针, endAngel < 0 - 逆时针 反之顺时针
    */
    return {
      p1: { x: x1, y: y1, startAngel: startAngelFirst, endAngel: endAngelFirst, drawRadialDirection: endAngelFirst < 0 },
      p2: { x: x2, y: y2, startAngel: startAngelSecond, endAngel: endAngelSecond, drawRadialDirection: endAngelSecond < 0 },
      lessRadian: lessRadian
    }
  }
  /* 根据传入的圆心、半径及两个控制点确定起点和重点弧度 */
  function getStartAndEndAngel (radialR, R, p1, p2) {
    let horizontalPoint = { x: radialR.x + r, y: radialR.y }
    let startPoint = p1.x > p2.x ? p1 : p2
    let disCosA = 2 * Math.pow(R, 2) - (Math.pow(startPoint.x - horizontalPoint.x, 2) + Math.pow(startPoint.y - horizontalPoint.y, 2))
    let lessRadian = Math.acos(disCosA / (2 * Math.pow(R, 2)))
    return startPoint.y < radialR.y ? -lessRadian : lessRadian
  }
}

/**
 * 一键复制
 * @param  {String} id [需要粘贴的内容]
 * @param  {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
 *
 * range + selection
 *
 * 1.创建一个 range
 * 2.把内容放入 range
 * 3.把 range 放入 selection
 *
 * 注意：参数 attr 不能是自定义属性
 * 注意：对于 user-select: none 的元素无效
 * 注意：当 id 为 false 且 attr 不为空，会直接复制 attr 的内容
 */
function copyTargetText (id, attr, callback) {
  let target = null
  if (attr) {
    target = document.createElement('div')
    target.id = 'tempTarget'
    target.style.opacity = '0'
    if (id) {
      let curNode = document.querySelector('#' + id)
      target.innerText = curNode[attr]
    } else {
      target.innerText = attr
    }
    document.body.appendChild(target)
  } else {
    target = document.querySelector('#' + id)
  }

  try {
    let range = document.createRange()
    range.selectNode(target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
  } catch (e) {
    console.log(e)
  }
  if (attr) {
    target.parentElement.removeChild(target)
  }
}

/**
 * 根据指定id和parentId关系将一维数据结构转成tree属性结构
 * @param { Array } data 需要转变的数据
 * @param { String } id 数据唯一标识id
 * @param { String } parentId 数据指定父级唯一标识
 * @return { Object } 返回树形结构object
 */
function translateDataToTree (data, id = 'id', parentId = 'parentId') {
  const idMapping = data.reduce((prev, cur, i) => {
    prev[cur[id]] = i
    return prev
  }, {})

  let root = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i][parentId] === undefined || data[i][parentId] === null) {
      root = data[i]
      continue
    }
    const parentEl = data[idMapping[data[i][parentId]]]
    parentEl.children = [...(parentEl.children || []), data[i]]
  }
  return root
}

/**
 * 时间格式化
 * @param { Date } time 需要格式化时间
 * @param { String } fmt 时间格式化具体格式
 */
function timeFormat (time, fmt) {
  if (typeof time === 'object' || typeof new Date(time) === 'object') {
    time = new Date(time)
    if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'
    var o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (time.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  } else {
    return time || ''
  }
}

export { newRandomId, debounce, throttle, getCenterByRAndPoint, copyTargetText, translateDataToTree, timeFormat }
