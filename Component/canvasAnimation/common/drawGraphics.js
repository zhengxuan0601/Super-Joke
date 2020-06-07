/**
 * 球形绘制
 * @param {x} x 球形横坐标
 * @param {y} y 球形纵坐标
 * @param {r} r 球形半径
 * @param {color} color 
 */
function DrawBall (x, y, r, color) {
  this.x = x || 0
  this.y = y || 0
  this.r = r || 4
  this.color = color || '#2080f7'
}

// 描边圆形
DrawBall.prototype.drawStroke = function (cxt) {
  cxt.save()
  cxt.beginPath()
  cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
  cxt.closePath()
  cxt.stroke()
  cxt.restore()
}

// 填充圆形
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
 * 椭圆绘制
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
  this.color = color || '#000'
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

/**
 * 三角函数图形
 * @param {*} x 三角函数起始坐标点x
 * @param {*} y 三角函数起始坐标点y
 * @param {*} range 三角函数范围 默认Math.PI * 2
 * @param {*} scaleX 横坐标缩放比例
 * @param {*} scaleY 纵坐标缩放比例，即峰值
 * @param {*} color 
 */
function DrawSine (x, y, range, scaleX, scaleY, color) {
  this.x = x || 0
  this.y = y || 0
  this.range = range || Math.PI *2
  this.scaleX = scaleX || 20
  this.scaleY = scaleY || 30
  this.color = color || '#000'
}

// 默认每隔0.4px画点连线
DrawSine.prototype.drawStroke = function (cxt) {
  var startAngel = 0
  for (var i = 0; i < this.range / (1.2 / this.scaleY); i++) {
    startAngel += 1.2 / this.scaleY
    cxt.save()
    cxt.beginPath()
    cxt.translate(this.x, this.y)
    cxt.scale(this.scaleX, this.scaleY)
    cxt.arc(startAngel, Math.sin(startAngel), 1.2 / this.scaleY / 2, 0, Math.PI * 2)
    cxt.fillStyle = this.color
    cxt.fill()
    cxt.closePath()
    cxt.restore()
  }
}

/**
 * 绘制正多边形
 * @param {x} 正多边形中心横坐标 
 * @param {*} 正多边形中心纵坐标 
 * @param {*} 正多边形边数
 * @param {*} 正多边形大小 中心距离定点的距离
 * @param {*} 
 */
function DrawRegularPolygon (x, y, n, size, color) {
  this.x = x
  this.y = y
  this.n = n
  this.size = size
  this.color = color || '#000'
  this.angelRadious = Math.PI * 2 / n
  this.pointList = []
  this.equationList = []
  this.drawPolygonStroke = function (cxt) {
    this.equationList = []
    this.pointList = []
    cxt.save()
    cxt.beginPath()
    for (var i = 0; i < this.n; i++) {
      var dx = Math.cos(i * this.angelRadious) * size + this.x
      var dy = Math.sin(i * this.angelRadious) * size + this.y
      this.pointList.push({ x: dx, y: dy })
      if (i > 0 && i <= this.n - 1) {
        var disY = this.pointList[i].y - this.pointList[i - 1].y
        var disX = this.pointList[i].x - this.pointList[i - 1].x
        var k =  disY / (Math.abs(disX) < 0.001 ? 0 : disX)
        var b = this.pointList[i].y - k * this.pointList[i].x
        this.equationList.push({k, b})
      } 
      if (i === this.n - 1) {
        var k = (this.pointList[i].y - this.pointList[0].y)  / (this.pointList[i].x - this.pointList[0].x)
        var b = this.pointList[i].y - k * this.pointList[i].x
        this.equationList.push({k, b})
      }
      cxt.strokeStyle = this.color
      cxt.lineTo(dx, dy)
    }
    cxt.lineTo(size + this.x, this.y)
    cxt.stroke()
    cxt.restore()
  }
  this.drawPolygonFill = function (cxt) {
    cxt.save()
    for (var i = 0; i < this.n; i++) {
      var dx = Math.cos(i * this.angelRadious) * this.size + this.x
      var dy = Math.sin(i * this.angelRadious) * this.size + this.y
      cxt.fillStyle = this.color
      cxt.lineTo(dx, dy)
    }
    cxt.fill()
    cxt.restore()
  }
}