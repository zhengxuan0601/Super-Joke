function Tab (id, tabclass) {
   /**
    * @id tab页id
    * @tabL tab的个数
    * @odivLeft tab出去当前的位置
    * @difX 手指滑动的间距
    */
   this.id = id;
   this.tabclass = tabclass;
   this.oDiv = document.getElementById(this.id);
   this.tab = document.getElementsByClassName(this.tabclass)[0].children[0];
   this.span = document.getElementsByClassName(this.tabclass)[0].children[1]
   this.tabIdx = 0;
   this.coU = this.oDiv.children[1].children[0];
   this.tabL = this.tab.children.length;
   this.coU.style.width = (this.tabL * 100) + 'vw';
   this.startX = 0;
   this.endX = 0;
   this.difX = 0;
   this.odivLeft = 0;

   // 手指触屏动作及滑动事件
   this.coU.ontouchstart = (ev) => {
      this.fnDown(ev)
   }
   this.fnDown = function (ev) {
      let e = ev || event
      this.startX = e.touches[0].clientX
      document.ontouchmove = (ev) => {
         this.fnMove(ev)
      }
      document.ontouchend = (ev) => {
         this.fnUp(ev)
      }
   }

   this.fnMove = function (ev) {
      let e = ev || event
      this.endX = e.touches[0].clientX
   }

   this.fnUp = function () {
      this.difX = this.endX - this.startX
      this.odivMove(this.difX)
   }

   // tab页移动效果
   this.odivMove = function (x) {
      if (x < -20) {
         if (this.odivLeft <= -1 * this.tabL + 1) {return}
         this.moveLeft(1)
      } else if (x > 20) {
         if (this.odivLeft > -1) {return}
         this.moveRight(1)
      }
      
   }
}

// tab切换class active改变
Tab.prototype.init = function () {
   // tab点击效果
   for (let i = 0; i < this.tabL; i++) {
      this.tab.children[i].onclick = () => {
         let difNum = this.tabIdx - i
         if (difNum < 0) {
            this.moveLeft(-1 * difNum)
         } else {
            this.moveRight(difNum)
         }
         if (this.tabIdx)
         this.tabIdx = i
      }
   }
   for (let i = 0; i < this.tabL; i++) {
      this.tab.children[i].className = ''
      this.tab.children[this.tabIdx].className = 'active'
   }
   this.span.style.left = (this.tabIdx) * (100 / this.tabL) + ((100 / this.tabL - parseFloat(this.span.style.width)) / 2) + '%'
}

// tab moveleft
Tab.prototype.moveLeft = function (x) {
   this.coU.style.marginLeft = (this.odivLeft - x) * 100 + 'vw'
   this.odivLeft = this.odivLeft - x
   this.tabIdx += x
   this.init()
}

// tab moveright
Tab.prototype.moveRight = function (x) {
   this.coU.style.marginLeft = (this.odivLeft + x) *100 + 'vw'
   this.odivLeft = this.odivLeft + x
   this.tabIdx -= x
   this.init()
}