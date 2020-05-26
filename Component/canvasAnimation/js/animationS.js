(function () {
  var animationS = document.getElementById('animationS');
  var canvasWidth = animationS.width;
  var canvasHeight = animationS.height;
  var cxtS = animationS.getContext('2d');
  var sine = new DrawSine(20, canvasHeight / 2, Math.PI * 4, 20, 30);
  var ball = new DrawBall();
  var startAngel = 0;
  (function renderFrame () {
    window.requestAnimationFrame(renderFrame);
    if (startAngel > Math.PI * 4) {
      startAngel = 0;
    }
    startAngel += 0.05;
    cxtS.clearRect(0, 0, canvasWidth, canvasHeight);
    sine.drawStroke(cxtS);
    var dx = startAngel * 20 + 20;
    var dy = Math.sin(startAngel) * 30 + canvasHeight / 2;
    if (startAngel > Math.PI * 2) {
      ball.color = 'blue'
    } else {
      ball.color = '#2080f7'
    }
    ball.x = dx;
    ball.y = dy;
    ball.drawFill(cxtS);
  })();
})();