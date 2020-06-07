(function () {
  var canvas = document.getElementById('regularPolygon');
  var cxt = canvas.getContext('2d');
  var reluarPolygon = new DrawRegularPolygon(160, 160, 7, 100);
  reluarPolygon.drawPolygonStroke(cxt);
  var pointList = reluarPolygon.pointList;
  var equationList = reluarPolygon.equationList;
  var moveStep = 0;
  var startX = pointList[moveStep].x
  var startY = pointList[moveStep].y
  var initY = pointList[moveStep].y // 定义小球移动初始水平纵向距离
  var ball = new DrawBall(startX, startY, 5, '#2080f7');
  (function renderFrame () {
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    window.requestAnimationFrame(renderFrame);
    reluarPolygon.drawPolygonStroke(cxt);
    var k = equationList[moveStep].k;
    var b = equationList[moveStep].b;
    // 当k的斜率存在时,横坐标开始由大逐渐递减,当纵坐标和起始的纵坐标相同或小于起始纵坐标时,横坐标开始递增,实现顺时针多边形运动
    if (Infinity !== Math.abs(equationList[moveStep].k)) {
      startY = k * startX + b;
    } else {
      // 斜率不存在这段轨迹,横坐标保持不变,纵坐标递减
      startY -= 1
    }
    ball.x = startX;
    ball.y = startY;
    var speed = Math.cos(Math.abs(Math.atan(equationList[moveStep].k)));
    if (Infinity !== Math.abs(equationList[moveStep].k)) {
      if (startY >= initY) {
        startX -= speed;
        if (startX < (moveStep === pointList.length - 1 ? pointList[0].x : pointList[moveStep + 1].x) + speed) {
          moveStep ++;
          if (moveStep === equationList.length) {
            moveStep = 0
          }
        }
      } else {
        startX += speed;
        if (startX > (moveStep === pointList.length - 1 ? pointList[0].x : pointList[moveStep + 1].x) + speed) {
          moveStep ++;
        }
      }
    } else {
      if (startY <= pointList[moveStep + 1].y) {
        moveStep ++
      }
    }
    ball.color = api.getColorList[moveStep % (pointList.length - 1)]
    ball.drawFill(cxt);
  })();
})();

function getMax (targetArr, type) {
  return targetArr.reduce((prev, cur) => {
    if (type === 'max') {
      prev = cur.x > prev ? cur.x : prev
    } else if (type === 'min') {
      prev = cur.x < prev ? cur.x : prev
    }
    return prev
  }, targetArr[0].x)
}