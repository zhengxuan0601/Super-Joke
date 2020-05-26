/**
 * 小球构造函数
 * @param {x} 小球横坐标点
 * @param {y} 小球纵坐标点
 * @param {r} 小球半径
 * @param {color} 小球颜色 
 * @param {speed} 小球随机方向移动速度, 默认匀速运动 
 */
function Ball ({ width, height, x, y, r, color, speed }) {
  this.width = width
  this.height = height
  this.x = x || Math.floor(api.getRandom(0, width))
  this.y = y || Math.floor(api.getRandom(0, height))
  this.r = r || 0.8
  this.color = color || api.getColorList[Math.floor(api.getRandom(0, 8))]
  this.speed = speed || 0.8
  this.id = api.getRandomId()
  this.randomAngel = api.getRandom(0, 360) * Math.PI / 180
  this.vx = api.getRandom(-0.6, 0.6)
  this.vy = api.getRandom(-4, -3)
  this.g = 0.1
  this.drawBall = function (cxt) {
    cxt.save()
    cxt.beginPath()
    cxt.fillStyle = this.color
    cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    cxt.fill()
    cxt.closePath()
    cxt.restore()
  }
}

Ball.prototype.moveBall = function () {
  // speed 为随机方向速度, 所以需要将速度分解成x 和 y 轴的速度
  // 定义一个随机的夹角分解速度
  var vx = this.speed * Math.cos(this.randomAngel)
  var vy = this.speed * Math.sin(this.randomAngel)
  this.x += vx
  this.y += vy
  this.updateAngel()
}

// 小球边界处理, 当小球将要离开canvas范围内,改变速度分解角度
Ball.prototype.updateAngel = function () {
  if (this.x > this.width || this.x < 0) {
    this.randomAngel = Math.PI - this.randomAngel
  } else if (this.y < 0 || this.y > this.height) {
    this.randomAngel = Math.PI * 2 - this.randomAngel
  }
}

// 小球散射方法
Ball.prototype.scatterBall = function (cxt, callback) {
  this.x += this.vx
  this.vy += this.g
  this.y += this.vy
  if (this.vy > 4) {
    callback()
    return
  }
  this.drawBall(cxt)
}


/**
 * 两点之间画线构造函数
 * @param {moveTo}  画线起点坐标
 * @param {lineTo} 画线重点坐标
 * @param {color}  
 */
function Line (moveTo, lineTo, color) {
  this.moveTo = moveTo
  this.lineTo = lineTo
  this.color = color
  this.drawLine = function (cxt) {
    cxt.beginPath()
    cxt.strokeStyle = this.color
    cxt.lineWidth = 0.15
    cxt.moveTo(moveTo.x, moveTo.y)
    cxt.lineTo(lineTo.x, lineTo.y)
    cxt.stroke()
  }
}