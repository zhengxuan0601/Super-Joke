/**
 * 
 * @param {*} start {X: "" Y: ""}
 * @param {*} end  {X: "" Y: ""}
 * @param {*} target  运动目标物体
 * @param {*} callback  运动完成的回调函数
 * 此次运动距离按照1：100缩放;
 * 抛物线方程公式 y = a*x*x + b*x + c;
 */
function Parabola(start, end, target, callback) {

   this.difX = (end.X - start.X) / 100;  //初始目标与结束目标水平方向距离
   this.difY = (end.Y - start.Y) / 100;  //初始目标与结束目标水平方向距离
   this.target = target;
   this.callback = callback;
   this.time = 0.5; // 完成此次运动所需要的时间, 默认为0.5s;
   this.speed = this.difX / this.time; // 横向运动的速度
   this.x = 0;
   this.y = 0;
   /*
   结束目标点的纵坐标在初始目标的上方时,即抛物线的开口方向乡下,即 a < 0;
   初始目标点坐标始终为(0,0),即c = 0;
   此次抛物线的最高点横坐标为0.8 * this.difX, 即 -2a / b = 0.8 * this.difX;
   */
   if (this.difY < 0) {
      // 由抛物线公式可求出抛物线的a 和 b;
      this.a = (5 * this.difY) / (3 * Math.pow(this.difX, 2));
      this.b = (-8 * this.difY) / (3 * this.difX);
   } else if (this.difY > 0) {
      // 抛物线终点位置在初始位置下方
      this.a = (-5 * this.difY) / (3 * Math.pow(this.difX,2));
      this.b = (2 * this.difY) / (3 * this.difX);
   }
}

// 飞行的方法
Parabola.prototype.fly = function () {
   let timer = setTimeout(() => {
      this.moveUp();
      // 由于此次比例按照1：100, 所以在移动的时候this.x 和 this.y 需要 * 100;
      clearTimeout(timer);
   },30)
}

// 在抛物线运动轨迹向上的情况下运动路径
Parabola.prototype.moveUp = function () {
   // 结束点在初始点右侧
   if(this.difX > 0) {
      this.x += (this.speed * 0.03);
      this.y = (this.a * Math.pow(this.x, 2) + this.b * this.x);
      this.move(this.x * 100, -this.y * 100);
      if (this.x < this.difX) {
         this.fly();
      } else {
         this.callback();
      }
   } else if (this.difX < 0) { //结束点在左侧
      this.x += (this.speed * 0.03);
      this.y = (-this.a * Math.pow(this.x, 2) - this.b * this.x);
      this.move(this.x * 100, this.y * 100);
      if (this.x > this.difX) {
         this.fly();
      } else {
         this.callback();
      }
   }
}

// 移动的方法
Parabola.prototype.move = function (x, y) {
   this.target.style.transform = `translate(${x}px, ${y}px)`;
}