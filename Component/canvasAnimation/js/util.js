var api = {
  // 获取指定范围随机数方法
  getRandom: function (start, end) {
    return Math.random() * (end - start) + start
  },

  // 定义颜色数组
  getColorList: ['#2080f7', '#0f0d39', '#c728cb', '#e8a3ea', '#f2d61f', '#622725', '#f40dc4', '#0df4c7'],

  // 生成随机id
  getRandomId: function () {
    var id = ''
    for (var i = 0; i < 24; i++) {
      if (i === 8 || i === 16 || i === 23) {
        id += 'n-c'
      }
      id += Math.floor(Math.random() * 10).toString(16)
    }
    return id
  }
}
