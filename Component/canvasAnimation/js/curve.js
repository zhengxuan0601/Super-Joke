(function () {
  var startP = { x: 20, y : 270 };
  var endP = { x: 300, y: 50 };
  var steepF = (startP.x + endP.x) / 4;
  var center = { x: (startP.x + endP.x) / 2, y: (startP.y + endP.y) / 2 };
  var firstCp = { x: startP.x + steepF, y: startP.y };
  var secondCp = { x: endP.x - steepF, y: endP.y };
  var canvas = document.getElementById('curve');
  var cxt = canvas.getContext('2d');
  drawCruve(cxt, startP, firstCp, center);
  drawCruve(cxt, center, secondCp, endP);
})();

function drawCruve (cxt, sp, cp, ep) {
  cxt.beginPath();
  cxt.moveTo(sp.x, sp.y);
  cxt.strokeStyle = '#000';
  cxt.quadraticCurveTo(cp.x, cp.y, ep.x, ep.y);
  cxt.stroke();
}