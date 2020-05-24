(function () {
  window.requestAnimationFrame = (
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame || 
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  );
  var animationE = document.getElementById('animationE');
  var canvasWidth = animationE.width;
  var canvasHeight = animationE.height;
  var cxtE = animationE.getContext('2d');
  // 设置小球圆周运动的起始角度
  var startAngel = 0;
  var ball = new DrawBall();
  // 由椭圆方程可知, x 和 y的关系为x = a * Math.cos(A) y = b * Math.sin(A)
  (function frame() {
    window.requestAnimationFrame(frame);
    startAngel += 0.005;
    cxtE.clearRect(0, 0, canvasWidth, canvasHeight);
    var trackEllipse = new DrawEllipse(canvasWidth / 2, canvasHeight / 2, 100, 60);
    trackEllipse.drawStroke(cxtE);
    ball.x = canvasWidth / 2 + 100 * Math.cos(startAngel);
    ball.y = canvasHeight / 2 + 60 * Math.sin(startAngel);
    if (Math.sin(startAngel) > 0) {
      ball.color = 'blue'
    } else {
      ball.color = '#2080f7'
    }
    ball.drawFill(cxtE);
  })();
})();