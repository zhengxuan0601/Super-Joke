window.onload = function() {
  window.requestAnimationFrame = (
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame || 
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  );
  var animationR = document.getElementById('animationR');
  var canvasWidth = animationR.width;
  var canvasHeight = animationR.height;
  var cxtR = animationR.getContext('2d');
  // 设定起始位置,根据圆心方程可知 x^2 + y^2 = r^2
  var ballR = new DrawBall();
  var startAngel = 0;
  (function renderFrame () {
    window.requestAnimationFrame(renderFrame)
    cxtR.clearRect(0, 0, canvasWidth, canvasHeight)
    // 先画出轨迹圆形
    var trackBall = new DrawBall(canvasWidth / 2, canvasHeight / 2, 100, '#000')
    trackBall.drawStroke(cxtR)
    startAngel += 0.01
    var dx = 100 * Math.cos(startAngel) + canvasWidth / 2
    var dy = 100 * Math.sin(startAngel) + canvasHeight / 2
    ballR.x = dx
    ballR.y = dy
    ballR.drawFill(cxtR)
  })();
}