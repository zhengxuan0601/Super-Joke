/**
 * @id
 * @flag 可以拖动的状态
 * @disX 距离左侧的距离 
 * @disY 距离顶部的距离
 */
function Drag(id, win) {
   this.oDiv = document.getElementById(id);
   this.oChild = this.oDiv.children[0]
   this.flag = false;
   this.disX = 0;
   this.disY = 0;
   this.winX = win.innerWidth;
   this.winY = win.innerHeight;
   this.oDiv.onmousedown = () => {
      this.dragDown()
   }
   this.dragDown = (ev) => {
      let _this = this;
      this.flag = true
      let oEvent = ev || event;
      this.disX = oEvent.clientX - _this.oDiv.offsetLeft;
      this.disY = oEvent.clientY - _this.oDiv.offsetTop;
      let W = this.oChild.clientWidth;
      let H = this.oChild.clientHeight;
      if (this.disY > H) {
         this.flag = false;
      }
      document.onmousemove = function (ev) {
         _this.dragFnMove(ev);
      };
      document.onmouseup = function (ev) {
         _this.dragUp(ev);
      };
   }

   this.dragFnMove = (ev) => {
      if (!this.flag) { return }
      let oEvent = ev || event;
      let left = oEvent.clientX - this.disX;
      let top = oEvent.clientY - this.disY;
      if (left < 0) left = 0;
      else if (left + this.oDiv.clientWidth > this.winX) left = this.winX - this.oDiv.clientWidth;
      if (top < 0) top = 0;
      else if (top + this.oDiv.clientHeight > this.winY) top = this.winY - this.oDiv.clientHeight;
      this.oDiv.style.left = left + 'px';
      this.oDiv.style.top = top + 'px';
   }

   this.dragUp = (ev) => {
      this.flag = false;
   }
}