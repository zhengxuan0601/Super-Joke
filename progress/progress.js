/**
 * 
 * @param {*} id 
 * @param {*} startX 
 */
function Progress(id, startX) {
   this.oDiv = document.getElementById(id);
   this.startX = startX;
   this.outB = '';
   this.p = '';
   this.randomX = Math.random()*(70 - 50) + 50;
   this.state = true;
   this.init = function () {
      this.outB = document.createElement('div');
      this.outB.className = 'outB';
      this.p = document.createElement('p');
      var main = document.createElement('div');
      main.className = 'main';
      this.outB.appendChild(main);
      this.oDiv.append(this.outB);
      this.oDiv.append(this.p);
      this.changeW();
      this.changeNum();
   }

   // 获取随机数的方法
   this.getRandom = function (x, y) {
      return (Math.random()*(y - x) + x);
   }

   // 改变宽度的方法
   this.changeW = function () {
      this.outB.style.width = this.startX + '%';
   }

   // 进度条具体数字改变方法
   this.changeNum = function () {
      this.p.innerText = Math.floor(this.startX) + '%';
      if (Math.floor(this.startX) == 100) {
         this.p.innerText = '已完成'
      }
   }

   // 初始移动的方法
   this.firstMove = function (delay) {
      if (!this.state) { return };
      let timer = setTimeout(() => {
         if (this.startX < this.randomX) {
            var dif = this.getRandom(0.3, 0.5);
            this.startX = this.startX + dif;
            this.firstMove(this.getRandom(30, 200));
         } else if (this.startX > this.randomX && this.startX < this.randomX + 10) {
            var dif = 0.2;
            this.startX = this.startX + dif;
            this.firstMove(this.getRandom(200, 300));
         } else if (this.startX < 92){
            var dif = this.getRandom(0.1, 0.5);
            this.startX = this.startX + dif;
            this.firstMove(this.getRandom(30, 200));
         } else {
            var dif = 0.1;
            if (this.startX < 100) {
               this.startX = this.startX + dif;
            } else {
               this.startX = 100;
            }
            this.firstMove(this.getRandom(200, 300));
         }
         this.changeW();
         this.changeNum();
         clearTimeout(timer);
      }, delay)
   }

   // 回调函数之后移动的方法
   this.lastMove = function () {
      this.state = false;
      var timer = setInterval(() => {
         this.startX += 1;
         if (this.startX > 100) {
            this.startX = 100;
            clearInterval(timer);
         }
         this.changeNum();
         this.changeW();
      },100)
   }
}
