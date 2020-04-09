function Tank(x, y, direct, color, speed) {
    this.x = x
    this.y = y
    this.direct = direct
    this.color = color
    this.speed = speed
    this.moveUp = function () {
        this.y -= this.speed
    }
    this.moveRight = function () {
        this.x += this.speed
    }
    this.moveDown = function () {
        this.y += this.speed
    }
    this.moveLeft = function () {
        this.x -= this.speed
    }
}

// 子弹构造函数
function Bullet(x, y, direct, color, speed) {
    this.x = x
    this.y = y
    this.direct = direct
    this.color = color
    this.speed = speed
    this.run = function () {
        switch (direct) {
            case 0:
                this.y -= this.speed
                break;
            case 1:
                this.x += this.speed
                break;
            case 2:
                this.y += this.speed
                break;
            case 3:
                this.x -= this.speed
                break;
            default:
                break;
        }
    }
}
