window.onload = function(){
    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (function () {
            return function (callback, element) {
                window.setTimeout(callback,1000/60)
            };
    })();

    var w = window.innerWidth
    var h = window.innerHeight
    var canvas = document.querySelector('.canvas')
    canvas.width = w
    canvas.height = h

    var ctx = canvas.getContext('2d')

    // 生成随机数
    function Random(x, y){
        return Math.random()*(y-x) + x
    }
    // 生成随机颜色
    function getColor(r, g, b){
        return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    var aPoint = []

    // 画点的构造函数
    function Point(){}
    Point.prototype = {
        init:function(){
            this.x = Random(0, w)
            this.y = Random(0, h)
            this.color = getColor( Math.floor(Random(0,256)), Math.floor(Random(0,256)), Math.floor(Random(0,256)))
            this.r = Random(0.4, 0.6)
            this.vX = Random(-0.5, 0.5)
            this.vY = Random(-0.5, 0.5)
        },
        draw:function(){
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
            ctx.fill()
        },
        move:function(){
            this.x += this.vX
            this.y += this.vY
            if(this.x < 0 || this.x > w){
                this.vX = -this.vX
            }
            if(this.y < 0 || this.y > h){
                this.vY = -this.vY
            }
            this.draw()
        }
    }

    for( var i = 0; i < 200; i++ ){
        var point = new Point()
        point.init()
        point.draw()
        aPoint.push(point)
    }

    // 鼠标移动事件
    var mouseX, mouseY
    window.onmousemove = function(e){
        mouseX = e.clientX
        mouseY = e.clientY
    }

    // 定时器方法
    ~~function delay(){
        ctx.clearRect(0, 0, w, h)
        for(var i = 0; i < aPoint.length; i++){
            aPoint[i].move()
        }
        drawLine()
        window.requestAnimationFrame(delay)
    }()

    // 画线
    function drawLine(){
        for(var i = 0; i < aPoint.length; i++){
            for(var j = i+1; j < aPoint.length; j++){
                if( Math.pow( (aPoint[i].x - aPoint[j].x),2 ) + Math.pow( (aPoint[i].y - aPoint[j].y),2 ) < 2500 ){
                    ctx.beginPath()
                    ctx.strokeStyle = 'rgba(32, 128, 247, 0.1)'
                    ctx.moveTo( aPoint[i].x, aPoint[i].y )
                    ctx.lineTo( aPoint[j].x, aPoint[j].y )
                    ctx.stroke()
                    ctx.closePath()
                }
            }
            // 鼠标移动特效
            if(mouseX){
                if( Math.pow( (aPoint[i].x - mouseX),2 ) + Math.pow( (aPoint[i].y - mouseY),2 ) < 12000 ){
                    ctx.beginPath()
                    ctx.strokeStyle = 'rgba(32, 128, 247, 0.1)'
                    ctx.moveTo( aPoint[i].x, aPoint[i].y )
                    ctx.lineTo( mouseX, mouseY )
                    ctx.stroke()
                    ctx.closePath()
                } 
            }
        }
    }
}