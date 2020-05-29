(function () {
  var canvas = document.getElementById('regularPolygon');
  var cxt = canvas.getContext('2d');
  var reluarPolygon = new DrawRegularPolygon(160, 160, 8, 100);
  reluarPolygon.drawPolygonStroke(cxt);
  var pointList = reluarPolygon.pointList;
  var equationList = reluarPolygon.equationList;
  console.log(pointList);
  console.log(equationList);
  var maxPosition = getMax(pointList, 'max')
  var minPosition =getMax(pointList, 'min')
  var moveStep = 0;
  var startX = pointList[moveStep].x
  var startY = pointList[moveStep].y
  var initY = pointList[moveStep].y
  var ball = new DrawBall(startX, startY, 5, '#2080f7');
  ball.drawFill(cxt);
  console.log(ball);

  (function renderFrame () {
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    window.requestAnimationFrame(renderFrame);
    reluarPolygon.drawPolygonStroke(cxt);
    var k = equationList[moveStep].k;
    var b = equationList[moveStep].b;
    startY = k * startX + b
    ball.x = startX
    ball.y = startY
    if (startY >= initY) {
      startX -= 1;
      if (startX < pointList[moveStep + 1].x) {
        moveStep ++
      }
    } else {
      startX += 1;
      if (startX > pointList[moveStep + 1].x) {
        moveStep ++
      }
    }
    
   
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