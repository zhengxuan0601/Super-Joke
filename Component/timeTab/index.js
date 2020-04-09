function Calendar(id) {
   this.oDiv = document.getElementById(id);
   // 获取当前时间 年、月、日
   this.Y = new Date().getFullYear();
   this.M = new Date().getMonth() + 1;
   this.D = new Date().getDate();
   this.Week = new Date().getDay();
   this.init = function () {
      this.oDiv.innerHTML = ''
      this.createSelect();
      this.createWeek();
      this.createDay();
      document.getElementsByClassName('prevM')[0].onclick = () => {
         this.getPrevMonth() ;   
      };
      document.getElementsByClassName('nextM')[0].onclick = () => {
         this.getNextMonth();
      };
      document.getElementsByClassName('prevY')[0].onclick = () => {
         this.getPrevYear();
      };
      document.getElementsByClassName('nextY')[0].onclick = () => {
         this.getNextYear();
      };
   }
   // 创建上方筛选日期模块
   this.createSelect = function () {
      var YandM = document.createElement('div')
      YandM.className = 'YandM';
      var YandMHtml = `<div>
                           <span class='prevY font_family icon-first'></span>
                           <span class='prevM font_family icon-prev'></span>
                        </div>
                        <div>
                           <span class='time'>${this.Y}年${this.M}月${this.D}日</span>
                        </div>
                        <div>
                           <span class='nextM font_family icon-next'></span>
                           <span class='nextY font_family icon-last'></span>
                        </div>`;
      YandM.innerHTML = YandMHtml;
      this.oDiv.appendChild(YandM);
   }

   // 创建周
   this.createWeek = function () {
      var week = document.createElement('div');
      week.className = 'week';
      var weekHtml = `<ul>
                     <li>一</li>
                     <li>二</li>
                     <li>三</li>
                     <li>四</li>
                     <li>五</li>
                     <li class='weekend'>六</li>
                     <li class='weekend'>日</li>
                  </ul>`;
      week.innerHTML = weekHtml;
      this.oDiv.appendChild(week)
   }

   // 创建具体时间
   this.createDay = function () {
      var day = document.createElement('div');
      day.className = 'day';
      // 计算这个月一号是星期几
      var firstD = this.Week - (this.D % 7 -1);
      if (firstD > 0) {
         firstD = this.Week - (this.D % 7 -1);
      } else {
         firstD = this.Week - (this.D % 7 -1) + 7;
      }
      var dayL = this.getDayLength(this.M); //这个月的天数
      var pravDayL = ''; //上个月的天数
      if ((this.M - 1) > 0) {
         pravDayL = this.getDayLength(this.M - 1);
      } else {
         pravDayL = 31;
      }
      // 补上上个月剩余天数
      var prevDayHtml = '';
      for (var i = pravDayL - (firstD - 1) + 1; i <= pravDayL ; i++) {
         prevDayHtml += `<li class='grey'>${i}</li>`;
      };
      
      // 这个月所有天数
      var dayHtml = '';
      for (var i = 1; i <= dayL; i++) {
         if ((i + 1 + (firstD - 1)) % 7 == 0 || (i + (firstD - 1)) % 7 == 0) {
            if (i == this.D) {
               dayHtml += `<li class='weekend nowday'>${i}</li>`;
            } else {
               dayHtml += `<li class='weekend'>${i}</li>`;
            }
         } else {
            if (i == this.D) {
               dayHtml += `<li class='nowday'>${i}</li>`;
            } else {
               dayHtml += `<li>${i}</li>`;
            }
         }
      }

      // 补上下个月的天数
      var allD = dayL + (firstD - 1)
      var nextDayNum = null;
      for (var i = 0; i < 7; i++) {
         if ((allD + i) % 7 ==0) {
            nextDayNum = i;
         }
      }
      var nextHtml = '';
      for (var i = 1; i <= nextDayNum; i++) {
         nextHtml += `<li class='grey'>${i}</li>`;
      }
      day.innerHTML = `<ul>${prevDayHtml}${dayHtml}${nextHtml}</ul>`;
      this.oDiv.appendChild(day)
   }
}

// 原型
// 判断此月有几天
Calendar.prototype.getDayLength = function (m) {
   switch (m) {
      case 1:
         return 31;
      case 2:
         if (this.Y % 4 == 0 && this.Y % 100 != 0 || this.Y % 400 ==0) {
            return 29;
         } else {
            return 28;
         }
      case 3:
         return 31;
      case 4:
         return 30;
      case 5:
         return 31;
      case 6:
         return 30;
      case 7:
         return 31;
      case 8:
         return 31;
      case 9:
         return 30
      case 10:
         return 31;
      case 11:
         return 30;
      case 12:
         return 31;

      default:
         return 28
         break;
   }
}

// 点击上一个月的方法
Calendar.prototype.getPrevMonth = function () {
   if (this.M > 1) {
      this.M --
   } else {
      this.Y --
      this.M = 12
   }
   this.Week = this.Week - this.getDayLength(this.M) % 7
   if (this.Week > 0) {
      this.Week = this.Week
   } else {
      this.Week = this.Week + 7
   }
   this.init()
}

// 点击下一个月方法
Calendar.prototype.getNextMonth = function () {
   if (this.M < 12) {
      this.M ++;
      this.Week = this.Week + this.getDayLength(this.M - 1) % 7;
   } else {
      this.Y ++;
      this.M = 1;
      this.Week = this.Week + this.getDayLength(this.M) % 7;
   }
   if (this.Week > 7) {
      this.Week = this.Week - 7;
   } else {
      this.Week = this.Week;
   }
   this.init();
}

// 点击上一年
Calendar.prototype.getPrevYear = function () {
   this.Y --;
   this.Week = this.Week - this.isRun() % 7;
   if (this.Week > 0) {
      this.Week = this.Week;
   } else {
      this.Week = this.Week + 7;
   }
   this.init();
}

// 点击下一年
Calendar.prototype.getNextYear = function () {
   if (this.M < 3) {
      this.Y = this.Y;
      this.Week = this.Week + this.isRun() % 7;
      this.Y ++;
   } else {
      this.Y ++;
      this.Week = this.Week + this.isRun() % 7;
   }
   if (this.Week > 7) {
      this.Week = this.Week - 7;
   } else {
      this.Week = this.Week;
   }
   this.init();
}

// 判断是否为闰年
Calendar.prototype.isRun = function () {
   if (this.Y % 4 == 0 && this.Y % 100 != 0 || this.Y % 400 ==0) {
      return 366;
   } else {
      return 365;
   }
}

var calendar = new Calendar('timeTab');
calendar.init();