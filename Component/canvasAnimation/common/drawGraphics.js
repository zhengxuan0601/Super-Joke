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
  this.drawPolygonStroke = function (cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    var pointList = []
    var equationList = []
    for (var i = 0; i < this.n; i++) {
      var dx = Math.cos(i * this.angelRadious) * this.size
      var dy = Math.sin(i * this.angelRadious) * this.size
      pointList.push({ x: dx, y: dy })
      if (i > 0 && i <= this.n - 1) {
        var k = (pointList[i].y - pointList[i - 1].y)  / (pointList[i].x - pointList[i - 1].x)
        var b = pointList[i].y - k * pointList[i].x
        equationList.push({k, b})
      } 
      if (i === this.n - 1) {
        console.log(1)
        var k = (pointList[i].y - pointList[0].y)  / (pointList[i].x - pointList[0].x)
        var b = pointList[i].y - k * pointList[i].x
        equationList.push({k, b})
      }
      cxt.strokeStyle = this.color
      cxt.lineTo(dx, dy)
    }
    console.log(pointList)
    console.log(equationList)
    cxt.lineTo(size, 0)
    cxt.stroke()
    cxt.restore()
  }
  this.drawPolygonFill = function (cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    for (var i = 0; i < this.n; i++) {
      var dx = Math.cos(i * this.angelRadious) * this.size
      var dy = Math.sin(i * this.angelRadious) * this.size
      cxt.fillStyle = this.color
      cxt.lineTo(dx, dy)
    }
    cxt.fill()
    cxt.restore()
  }
}

/**
 * 绘制圆角矩形
 * @param {x} 圆角矩形其实横坐标 
 * @param {y} 圆角矩形其实纵坐标 
 * @param {radius} 圆角大小 
 * @param {width} 矩形长度 
 * @param {height} 矩形宽度
 */
function DrawRectRadius (id, x, y, strokeColor, fillColor, text1, text2) {
  this.id = id
  this.x = x
  this.y = y
  this.strokeColor = strokeColor
  this.fillColor = fillColor
  this.text1 = text1
  this.text2 = text2
  this.drawRect = function (cxt) {
    this.drawRectRadius(cxt, 132, 42, this.x, this.y, 2, this.fillColor, this.strokeColor, this.text1, '#4c4c4c')
    this.drawRectRadius(cxt, 30, 30, this.x + 6, this.y + 6, 2, this.strokeColor, this.strokeColor, this.text2, '#fff')
    this.drawRadius(cxt)
  }
  // 绘制圆角矩形
  this.drawRectRadius = function (cxt, width, height, x, y, radius, fillColor, strokeColor, text, textColor) {
    cxt.save()
    cxt.beginPath()
    cxt.lineWidth = 2
    cxt.moveTo(x + radius, y)
    cxt.moveTo(width + x - radius, y)
    cxt.arcTo(width + x, y, width + x, y + radius, radius)
    cxt.lineTo(width + x, y + height - radius)
    cxt.arcTo(width + x, y + height, width + x - radius, y + height, radius)
    cxt.lineTo(x + radius, y + height)
    cxt.arcTo(x, y + height, x, y + height - radius, radius)
    cxt.lineTo(x, y + radius)
    cxt.arcTo(x, y, x + radius, y, radius)
    cxt.strokeStyle = strokeColor
    cxt.fillStyle = fillColor
    cxt.closePath()
    cxt.stroke()
    cxt.fill()
    cxt.beginPath()
    cxt.font = '12px PingFangSC-Regular'
    cxt.fillStyle = textColor
    cxt.textAlign = 'center'
    cxt.textBaseline = 'middle'
    cxt.fillText(text, x + width / 2, y + 3 + height / 2)
    cxt.restore()
  }

  // 绘制左边半圆连接点
  this.drawRadius = function (cxt) {
    cxt.beginPath()
    cxt.strokeStyle = '#2080f7'
    cxt.arc(132 + this.x, 22 + this.y, 4, -90 * Math.PI / 180, 90 * Math.PI / 180, false)
    cxt.stroke()
  }
}