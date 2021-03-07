/**
  * 1、星期天为第一天
  * 2、星期一为第一天
  * @param { String } dateType 上述类型区分 ch - 星期一为第一天， en - 星期天为第一天
 */

class Calendar {
  constructor (dateType) {
    this.Y = new Date().getFullYear()
    this.M = new Date().getMonth() + 1
    this.D = new Date().getDate()
    this.Week = new Date().getDay()
    this.everyMonthList = []
    this.dateType = dateType || 'en'
  }

  /**
   * 计算当前月1号为星期几
   * @return { Number } 当前月1号为周几
   */
  calculateFirstDateWeek () {
    let nowWeek = new Date(this.Y, this.M - 1, 1).getDay()
    return nowWeek
  }

  /**
   * 获取每一个月展示的天数, 固定展示6行共42天，该月天数不足则从上个月或者下个月取
   * 1、星期天为第一天
   * 2、星期一为第一天
   */
  getMonthEveryList () {
    let thisFirstWeekdays = this.calculateFirstDateWeek()
    let lastNumder = 0
    if (this.dateType === 'en') {
      lastNumder = thisFirstWeekdays === 7 ? 0 : thisFirstWeekdays
    } else if (this.dateType === 'ch') {
      lastNumder = thisFirstWeekdays - 1
    }
    // 获取上个月和本月的天数
    let lastM = this.M - 1 === 0 ? 12 : this.M - 1
    let lastMTotal = this.getCurrentMonthDays(lastM)
    let currentMTotal = this.getCurrentMonthDays(this.M)
    let nextNumber = 42 - lastNumder - currentMTotal
    let everyMonthList = []
    for (let i = lastNumder - 1; i >= 0; i--) {
      everyMonthList.push({ date: lastMTotal - i, virtual: true })
    }
    for (let i = 1; i <= currentMTotal; i++) {
      if (this.Y === new Date().getFullYear() && this.M === new Date().getMonth() + 1 && new Date().getDate() === i) {
        everyMonthList.push({ date: i, active: true })
      } else if (this.M === 6 && i === 1) {
        everyMonthList.push({ date: i, birthday: true })
      } else {
        everyMonthList.push({ date: i })
      }
    }
    for (let i = 1; i <= nextNumber; i++) {
      everyMonthList.push({ date: i, virtual: true })
    }
    this.everyMonthList = everyMonthList
  }

  /**
   * 更新当前月
   * @param { String } updateType 更新月份类型 prev - 上一个月， next - 下一个月
   */
  updateCurrentMonth (updateType) {
    updateType === 'prev' && this.M--
    updateType === 'next' && this.M++
    if (this.M === 0) {
      this.M = 12
      this.Y--
    }
    if (this.M === 13) {
      this.M = 1
      this.Y++
    }
    this.getMonthEveryList()
  }

  /**
   * 更新年份获取不同年份下日历信息
   * @param { String } updateType 更新月份类型 prev - 去年， next - 明年
   */
  updateCurrentYear (updateType) {
    updateType === 'prev' && this.Y--
    updateType === 'next' && this.Y++
    this.getMonthEveryList()
  }

  /**
   * 获取当前月总天数
   */
  getCurrentMonthDays (M) {
    switch (M) {
      case 1:
        return 31
      case 2:
        if (this.isRunYear() === 366) {
          return 29
        } else {
          return 28
        }
      case 3:
        return 31
      case 4:
        return 30
      case 5:
        return 31
      case 6:
        return 30
      case 7:
        return 31
      case 8:
        return 31
      case 9:
        return 30
      case 10:
        return 31
      case 11:
        return 30
      case 12:
        return 31
    }
  }

  /**
   * 判断当年是否为闰年
   */
  isRunYear () {
    if ((this.Y % 4 === 0 && this.Y % 100 !== 0) || this.Y % 400 === 0) {
      return 366
    } else {
      return 365
    }
  }
}

export default Calendar
