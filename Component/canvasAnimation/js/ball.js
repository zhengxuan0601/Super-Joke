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
  this.r = r || 3
  this.color = color || api.getColorList[Math.floor(api.getRandom(0, 8))]
  this.speed = speed || 1
  this.id = api.getRandomId()
  this.randomAngel = api.getRandom(0, 360) * Math.PI / 180
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