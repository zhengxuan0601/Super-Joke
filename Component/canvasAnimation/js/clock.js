(function () {
  // 获取当前时间
  var h_rotate, m_rotate, s_rotate; // 时针、分针、秒针旋转角度
  var clockCanvas = document.getElementById('clock');
  var cxt = clockCanvas.getContext('2d');
  var w = clockCanvas.width;
  var h = clockCanvas.height;
  var timeScale = ['12', '3', '6', '9'];
  var clockSize = 80; // 时钟大小
  var timeInterval = 'AM';

  // 绘制钟表盘
  function drawClockBoard () {
    cxt.beginPath();
    cxt.strokeStyle = '#000';
    cxt.arc(w / 2, h / 2, clockSize, 0, 2 * Math.PI, true);
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(w / 2, h /2, 5, 0, Math.PI * 2, true);
    cxt.fill();
    cxt.beginPath();
    cxt.font = '10px 微软雅黑';
    cxt.textAlign = 'center';
    cxt.textBaseline = 'middle';
    cxt.fillStyle = '#999';
    cxt.fillText(timeInterval, w / 2 - 10, h / 2 + 18);
    cxt.fillText('劳力士', w / 2 + 20, h / 2 + 17);
    drawTimeScale();
  }
  
  // 绘制重点时间刻度
  function drawTimeScale () {
    var startAngel = -90;
    cxt.beginPath();
    cxt.textAlign = 'center';
    cxt.fillStyle = '#000';
    cxt.textBaseline = 'middle';
    for (var i = 0; i < timeScale.length; i++) {
      var x = w / 2 + (clockSize - 15) * Math.cos(startAngel * Math.PI / 180);
      var y = h / 2 + (clockSize - (i === 2 ? 15 : 18)) * Math.sin(startAngel * Math.PI / 180);
      startAngel += 90;
      cxt.font = '14px 微软雅黑';
      cxt.fillText(timeScale[i], x, y);
    }
    cxt.beginPath();
    var stepAngel = 1 / 60 * Math.PI * 2;
    for (var i = 0; i < 60; i++) {
      var angel = i * stepAngel - 90 * Math.PI / 180;
      var start_x = w / 2 + clockSize * Math.cos(angel);
      var start_y = h / 2 + clockSize * Math.sin(angel);
      var diffstep = (i % 5 === 0) ? 8 : 4
      var end_x = w / 2 + (clockSize - diffstep) * Math.cos(angel);
      var end_y = h / 2 + (clockSize - diffstep) * Math.sin(angel);
      cxt.moveTo(start_x, start_y);
      cxt.lineTo(end_x, end_y);
      cxt.strokeStyle = '#999';
      cxt.stroke();
    }
  }

  // 绘制分针和时针
  function drawMinScale (type) {
    cxt.save();
    cxt.beginPath();
    cxt.fillStyle = '#000';
    cxt.translate(w / 2, h / 2);
    cxt.rotate(type === 'fz' ? m_rotate : h_rotate);
    cxt.moveTo(2, 8);
    cxt.lineTo(-2, 8);
    cxt.lineTo(-1, type === 'fz' ? -55 : -45);
    cxt.lineTo(1, type === 'fz' ? -55 : -45);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }

  // 绘制秒针
  function drawSecondScale () {
    cxt.save();
    cxt.beginPath();
    cxt.fillStyle = '#000';
    cxt.translate(w / 2, h / 2);
    cxt.rotate(s_rotate);
    cxt.moveTo(1, 8);
    cxt.lineTo(-1, 8);
    cxt.lineTo(-0.5, -60);
    cxt.lineTo(0.5, -60);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }

  // 计算当前时间时针、分针、秒针所旋转角度
  function calculateRotate () {
    var nowTime = new Date();
    var H = nowTime.getHours() > 12 ? nowTime.getHours() - 12 : nowTime.getHours();
    var M = nowTime.getMinutes();
    var S = nowTime.getSeconds();
    h_rotate = (H + M / 60 + S / 3600) / 12 * Math.PI * 2;
    m_rotate = (M + S / 60) / 60 * Math.PI * 2;
    s_rotate = S / 60 * Math.PI * 2;
    timeInterval = nowTime.getHours() > 12 ? 'PM' : 'AM';
  }

  setInterval(function () {
    cxt.clearRect(0, 0, 320, 320);
    calculateRotate();
    drawClockBoard();
    drawMinScale('fz');
    drawMinScale('sz');
    drawSecondScale();
  }, 1000)
})();