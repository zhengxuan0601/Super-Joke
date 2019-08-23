/**
 * 
 * @param {*} start 
 * @param {*} end 
 * @param {*} target 
 */
function Parabola(start, end, target, callback) {
   this.start = start;
   this.end = end;
   this.difX = this.end.X - this.start.X;  //起始点和终点横坐标之间的距离
   this.difY = this.end.Y - this.start.Y;  //起始点和终点纵坐标之间的距离
   this.target = target; //需要运动的目标元素
   this.callback = callback;
   // 横纵坐标轴上刻度 ：px = 1 : 100
   // 设定起始点坐标为(0,0), 最高点横坐标与终点横坐标相差100px,抛物线方程为 y = a*x*x + b*x
   this.a = -this.difY / (this.difX * (200 - this.difX)) * 100;
   this.b = ((this.difX - 100) * 2 * -this.difY) / ((this.difX - 200) * this.difX);
   this.X = 0;
   this.y = 0;
   this.v = (this.difX) / 50; //此次运动在1s的时候完成，v为横坐标的速度
   this.fly = function () {
      let timer = setTimeout(() => {
         this.X += (this.v * 0.03);
         this.Y = this.a * Math.pow(this.X, 2) + this.b * this.X;
         this.target.style.transform = `translate(${this.X * 100}px, -${this.Y * 100}px)`;
         clearTimeout(timer);
         if (this.X * 100 - 10 < this.difX) {
            this.fly();
         } else {
            this.callback();
         }
      },30)
   }
}