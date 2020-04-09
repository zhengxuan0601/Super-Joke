window.onload = function () {
    var c = document.getElementById('tank')
    var ctx = c.getContext('2d');
    var heroColor = ['#DAA520', '#F4A460'] //英雄坦克颜色
    var emenyColor = ['#FF00FF', '#FF69B4'] //敌方坦克颜色
    var heroBulletArr = [] //英雄坦克子弹
    var heroShotState = true
    
    function Hero(x, y, direct, color, speed) {
        Tank.call(this, x, y, direct, color, speed)
        this.shotBullet = function () {
            var bullet = new Bullet(this.x, this.y, this.direct, this.color, 2)
            heroBulletArr.push(bullet)
        }
    }
    // 英雄坦克
    var hero = new Hero(100, 100, 0, heroColor, 3)

    // 绘制坦克
    function drawTank(tank) {
        switch (tank.direct) {
            case 0:
            case 2:
                ctx.fillStyle = tank.color[0];
                ctx.fillRect(tank.x, tank.y, 5, 30)
                ctx.fillRect(tank.x + 20, tank.y, 5, 30)
                ctx.fillRect(tank.x + 6, tank.y + 6, 13, 20)
                ctx.closePath()
                ctx.fillStyle = tank.color[1]
                ctx.arc(tank.x + 12.5, tank.y + 15, 6, 0, Math.PI * 2)
                ctx.fill()
                break;
            case 1:
            case 3:
                ctx.fillStyle = tank.color[0];
                ctx.fillRect(tank.x, tank.y, 30, 5)
                ctx.fillRect(tank.x, tank.y + 20, 30, 5)
                ctx.fillRect(tank.x + 5, tank.y + 6, 20, 13)
                ctx.closePath()
                ctx.fillStyle = tank.color[1]
                ctx.arc(tank.x + 15, tank.y + 12.5, 6, 0, Math.PI * 2)
                ctx.fill()
                break;

        }if (tank.direct == 0) {
            ctx.beginPath()
            ctx.strokeStyle = tank.color[0]
            ctx.moveTo(tank.x + 12.5, tank.y + 15);
            ctx.lineTo(tank.x + 12.5, tank.y);
            ctx.lineWidth = '2'
            ctx.closePath()
            ctx.stroke()
        } else if (tank.direct == 1) {
            ctx.beginPath()
            ctx.strokeStyle = tank.color[0]
            ctx.moveTo(tank.x + 15, tank.y + 12.5);
            ctx.lineTo(tank.x + 30, tank.y + 12.5);
            ctx.lineWidth = '2'
            ctx.closePath()
            ctx.stroke()
        } else if (tank.direct == 2) {
            ctx.beginPath()
            ctx.strokeStyle = tank.color[0]
            ctx.moveTo(tank.x + 12.5, tank.y + 15);
            ctx.lineTo(tank.x + 12.5, tank.y + 30);
            ctx.lineWidth = '2'
            ctx.closePath()
            ctx.stroke()
        } else if (tank.direct == 3) {
            ctx.beginPath()
            ctx.strokeStyle = tank.color[0]
            ctx.moveTo(tank.x + 15, tank.y + 12.5);
            ctx.lineTo(tank.x, tank.y + 12.5);
            ctx.lineWidth = '2'
            ctx.closePath()
            ctx.stroke()
        }
    }

    // 绘制坦克子弹
    function drawBullet(bullet) {
        ctx.fillStyle = bullet.color[0]
        ctx.beginPath()
        switch (bullet.direct) {
            case 0:
                ctx.fillRect(bullet.x + 11.5, bullet.y, 2, 2)
                break;
            case 1:
                ctx.fillRect(bullet.x + 30, bullet.y + 11.5, 2, 2)
                break;
            case 2:
                ctx.fillRect(bullet.x + 11.5, bullet.y + 30, 2, 2)
                break;
            case 3:
                ctx.fillRect(bullet.x, bullet.y + 11.5, 2, 2)
                break;
            default:
                break;
        }
        ctx.closePath()
    }



    // 控制英雄坦克移动以及射击功能
    function getCommand(tank) {
        window.onkeydown = function (e) {
            switch (e.keyCode) {
                case 38:
                    tank.direct = 0
                    if (tank.y > 0) {
                        tank.moveUp()
                    } else {
                        return
                    }
                    break;
                case 39:
                    tank.direct = 1
                    if (tank.x < 400 - 30) {
                        tank.moveRight()
                    } else {
                        return
                    }
                    break;
                case 40:
                    tank.direct = 2
                    if (tank.y < 500 - 30) {
                        tank.moveDown()
                    } else {
                        return
                    }
                    break;
                case 37:
                    tank.direct = 3
                    if (tank.x > 0) {
                        tank.moveLeft()
                    } else {
                        return
                    }
                    break;
                case 74:
                    if (heroShotState) {
                        heroShotState = false
                        tank.shotBullet()
                        let heroTimer = setTimeout(() => {
                            heroShotState = true
                            clearTimeout(heroTimer)
                        }, 500)
                    }
                    break;
                default:
                    break;
            }
        }

    }
    getCommand(hero)

    // 敌方坦克
    function Emeny(x, y, direct, color, speed) {
        Tank.call(this, x, y, direct, color, speed)
        this.bulletArr = []
        this.state = true
        this.shotBullet = function () {
            var bullet = new Bullet(this.x, this.y, this.direct, this.color, 2)
            this.bulletArr.push(bullet)
        }
        this.changeDirect = function () {
            if (this.x < 30) this.direct = 1
            if (this.x > 400 - 50) this.direct = 3
            if (this.y < 50) this.direct = 2
            if (this.y > 500 - 50) this.direct = 0
        }
    }
    var emenyArr = new Array()
    for (var i = 0; i < 3; i++) {
        var emeny = new Emeny((i + 1) * 60, (i + 1) * 100, i, emenyColor, 1.5)
        emenyArr.push(emeny)
    }

    // 敌方坦克动作
    function enemyMove() {
        for (var i = 0; i < emenyArr.length; i++) {
            drawTank(emenyArr[i])
            emenyArr[i].changeDirect()  //碰撞边界
            switch (emenyArr[i].direct) {
                case 0:
                    emenyArr[i].moveUp()
                    break;
                case 1:
                    emenyArr[i].moveRight()
                    break;
                case 2:
                    emenyArr[i].moveDown()
                    break;
                case 3:
                    emenyArr[i].moveLeft()
                    break;

                default:
                    break;
            }
            if (emenyArr[i].state) {
                emenyArr[i].state = false
                emenyArr[i].shotBullet()
            }
            for (var j = 0; j < (emenyArr[i].bulletArr).length; j++) {
                drawBullet(emenyArr[i].bulletArr[j])
                if (emenyArr[i].bulletArr[j].x < 0 || emenyArr[i].bulletArr[j].x > 400
                    || emenyArr[i].bulletArr[j].y < 0 || emenyArr[i].bulletArr[j].y > 500) {
                    emenyArr[i].bulletArr.splice(j, 1)
                    emenyArr[i].state = true
                }
                if (emenyArr[i].bulletArr.length > 0) {
                    emenyArr[i].bulletArr[j].run()
                }
            }

        }
    }

    // 刷新地图方法
    function flashMap() {
        ctx.clearRect(0, 0, 400, 500)
        // 英雄坦克
        drawTank(hero)

        // 敌方坦克
        enemyMove()

        // 英雄子弹
        if (heroBulletArr) {
            for (var i = 0; i < heroBulletArr.length; i++) {
                drawBullet(heroBulletArr[i])
                heroBulletArr[i].run()
            }
        }
    }

    setInterval(() => {
        flashMap()
    }, 50)
}