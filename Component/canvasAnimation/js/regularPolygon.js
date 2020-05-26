(function () {
  var canvas = document.getElementById('regularPolygon');
  var cxt = canvas.getContext('2d');
  console.log(cxt);
  var reluarPolygon = new DrawRegularPolygon(160, 160, 8, 100);
  reluarPolygon.drawPolygonStroke(cxt);
})();