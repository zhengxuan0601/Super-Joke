/**
 * 
 * @param {x} x 球形横坐标
 * @param {y} y 球形纵坐标
 * @param {r} r 球形半径
 * @param {color} color 
 */
function DrawBall (x, y, r, color) {
  this.x = x || 0
  this.y = y || 0
  this.r = r || 10
  this.color = color || '#2080f7'
}

// 描边原型
DrawBall.prototype.drawStroke = function (cxt) {
  cxt.save()
  cxt.beginPath()
  cxt.strokeStyle = this.color
  cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
  cxt.closePath()
  cxt.stroke()
  cxt.restore()
}

// 填充原型
DrawBall.prototype.drawFill = function (cxt) {
  cxt.save()
  cxt.beginPath()
  cxt.fillStyle = this.color
  cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
  cxt.closePath()
  cxt.fill()
  cxt.restore()
}


/**
 * 
 * @param {*} x 椭圆横坐标
 * @param {*} y 椭圆纵坐标
 * @param {*} a 椭圆长轴
 * @param {*} b 椭圆短轴
 * @param {*} color 
 */
function DrawEllipse (x, y, a, b, color) {
  this.x = x || 0
  this.y = y || 0
  this.a = a || 10
  this.b = b || 6
  this.color = color || '#2080f7'
}  

DrawEllipse.prototype.drawStroke = function (cxt) {
  cxt.save()
  cxt.beginPath()
  cxt.strokeStyle = this.color
  cxt.ellipse(this.x, this.y, this.a, this.b, 0, Math.PI * 2, false)
  cxt.stroke()
  cxt.closePath()
  cxt.restore()
}