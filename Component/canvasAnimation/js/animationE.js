var animationE = document.getElementById('animationE')
var canvasWidth = animationE.width
var canvasHeight = animationE.height
var cxtE = animationE.getContext('2d')
var trackEllipse = new DrawEllipse(canvasWidth / 2, canvasHeight / 2, 100, 60, '#000')
trackEllipse.drawStroke(cxtE)