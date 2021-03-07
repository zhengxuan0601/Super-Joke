// 空白数据的占位符
const PLACEHOLDER = '--'
// 时期格式
const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'
const FORMAT_DATE = 'YYYY-MM-DD'
const FORMAT_MONTH = 'YYYY-MM'
const FORMAT_TIME = 'HH:mm:ss'
const FORMAT_HHMM = 'HH:mm'
const FORMAT_DATETIME_GCF = 'yyyy-MM-dd HH:mm:ss'
const FORMAT_DATE_GCF = 'yyyy-MM-dd'
const FORMAT_MONTH_GCF = 'yyyy-MM'
// 表单校验规则
const RULE_REQUIRED = {
  required: true,
  message: '此项为必填项',
  trigger: 'blur'
}
const RULE_REQUIRED_APPCODE = {
  type: 'number',
  required: true,
  message: '此项为必填项',
  trigger: 'blur'
}
const RULE_MINLENGTH_NUMBER = {
  pattern: /^\d{3}$/,
  required: true,
  message: '只能输入3位纯数字',
  trigger: 'blur'
}
const RULE_MUSTSELECT = {
  required: true,
  message: '请选择一项',
  trigger: 'blur'
}
const RULE_MUSTSELECT_NUMBER = {
  required: true,
  validator: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请选择一项'))
    } else {
      return callback()
    }
  },
  trigger: 'change'
}
const RULE_MUSTSELECT_ARRAY = {
  required: true,
  message: '请选择一项',
  type: 'array',
  trigger: 'change'
}
const RULE_INVALIDINPUT = {
  pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
  message: '此项需为字母开头，由字母、数字、下划线组成',
  trigger: 'blur'
}
const RULE_INVALIDSMALLINPUT = {
  pattern: /^[a-z][a-z0-9_]*$/,
  message: '此项需为小写字母开头，由小写字母、数字、下划线组成',
  trigger: 'blur'
}
const RULE_PASSWORD = {
  pattern: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@+._#$%^&*? ]).*$/,
  message: '需至少包含以下4种字符：大、小写字母、数字、特殊字符, 长度大于等于8位',
  trigger: 'blur'
}
const RULE_CORRECTINPUT = {
  pattern: /^[a-zA-Z0-9_]*$/,
  message: '此项仅允许输入字母、数字、下划线',
  trigger: 'blur'
}
// 不允许输入大写字母
const RULE_CORRECTLOWERLETTER = {
  pattern: /^[a-z0-9_]*$/,
  message: '此项仅允许输入小写字母、数字、下划线',
  trigger: 'blur'
}
// 不允许输入大写字母
const RULE_LETTERFIRST = {
  pattern: /^[a-zA-Z][a-z0-9_]*$/,
  message: '此项仅允许输入小写字母、数字、下划线, 且必须由字母开头',
  trigger: 'blur'
}
const RULE_SPECIALPARAMS = {
  pattern: /^((?![\\、@#$%^&*]).)*$/,
  message: '不能包含\\、@#$%^&*',
  trigger: 'blur'
}
const RULE_POSITIVEINTEGERONLY = {
  pattern: /^[1-9]\d*$/,
  message: '必须输入正整数',
  trigger: 'blur'
}
const RULE_INTEGERONLY = {
  pattern: /^[0-9]\d*$/,
  message: '必须输入整数',
  trigger: 'blur'
}
const RULE_LT10LETTERS = {
  max: 10,
  message: '最多不超过10个字',
  trigger: 'blur'
}
const RULE_LT32LETTERS = {
  max: 32,
  message: '最多不超过32个字',
  trigger: 'blur'
}
const RULE_LT64LETTERS = {
  max: 64,
  message: '最多不超过64个字',
  trigger: 'blur'
}
const RULE_LT200LETTERS = {
  max: 200,
  message: '最多不超过200个字',
  trigger: 'blur'
}
const RULE_LT127LETTERS = {
  max: 127,
  message: '最多不超过127个字',
  trigger: 'blur'
}
const RULE_NUM0TO4096 = {
  pattern: /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-3][0-9][0-9][0-9]|40[0-8][0-9]|409[0-6])$/,
  message: '请输入0到4096的数字',
  trigger: 'blur'
}
const RULE_LT4LETTERS = {
  min: 1,
  message: '此项为必填项',
  trigger: 'blur'
}
// 浮点数校验
const RULE_FLOAT = {
  pattern: /^(?:[0-9][0-9]*(?:\.[0-9]+)?|0\.(?!0+$)[0-9]+)$/,
  // pattern: /^(-\d+(\.\d+)?)|(0+(\.0+)?)$/,
  message: '请输入正确的浮点数或整数',
  trigger: 'blur'
}
const RULE_INCORRECTIDCARD = {
  pattern: /(^\d{15}$)|(^\d{17}(\d|X|x)$)/,
  message: '身份证格式错误',
  trigger: 'blur'
}
const RULE_INCORRECTEMAIL = {
  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  message: '请输入正确的邮箱',
  trigger: 'blur'
}
const RULE_INCORRECTIP = {
  required: true,
  pattern: /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/,
  message: 'IP格式错误',
  trigger: 'blur'
}
const RULE_INCORRECTPORT = {
  required: true,
  pattern: /(^[1-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/,
  message: '端口号必须为数字且应在1-65535之间',
  trigger: 'blur'
}
const RULE_CHINESE = {
  required: true,
  pattern: /[\u4e00-\u9fa5]/,
  message: '必须输入中文',
  trigger: 'blur'
}
const RULE_ENGLISH = {
  required: true,
  pattern: /^[^\u4e00-\u9fa5]+$/,
  message: '不能输入中文',
  trigger: 'blur'
}
const RULE_URLPATH = {
  required: true,
  pattern: /^\/[^\\]*$/,
  message: '以"/"开头且不含"\\"',
  trigger: 'blur'
}
const RULE_NOTOVER60 = {
  required: true,
  pattern: /^([1-9]|[1-5][0-9]|60)$/,
  message: '输入值必须为0-60的整数',
  trigger: 'blur'
}
const RULE_HTTPURL = {
  required: true,
  pattern: /^((https|http|ftp|rtsp|mms)?:\/\/)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
  message: '请输入正确的路径',
  trigger: 'blur'
}
// 是否
const YES_OR_NO = {
  '0': '否',
  '1': '是'
}
// 性别
const SEX = {
  '0': '未知',
  '1': '男',
  '2': '女'
}
// 年龄
const AGE = {
  '0': '未知',
  '1': '少年',
  '2': '青年',
  '3': '中年',
  '4': '老年'
}
// 微笑
const SMILE = {
  '0': '未知',
  '1': '不微笑',
  '2': '微笑'
}
// 戴眼镜
const GLASS = {
  '0': '未知',
  '1': '不戴眼镜',
  '2': '戴眼镜'
}

export {
  PLACEHOLDER,
  FORMAT_DATETIME,
  FORMAT_DATE,
  FORMAT_TIME,
  FORMAT_MONTH,
  FORMAT_HHMM,
  FORMAT_DATETIME_GCF,
  FORMAT_DATE_GCF,
  FORMAT_MONTH_GCF,
  RULE_PASSWORD,
  RULE_REQUIRED,
  RULE_MUSTSELECT_NUMBER,
  RULE_MUSTSELECT,
  RULE_MUSTSELECT_ARRAY,
  RULE_INVALIDINPUT,
  RULE_INVALIDSMALLINPUT,
  RULE_CORRECTINPUT,
  RULE_POSITIVEINTEGERONLY,
  RULE_LT10LETTERS,
  RULE_LT32LETTERS,
  RULE_LT64LETTERS,
  RULE_LT200LETTERS,
  RULE_LT127LETTERS,
  RULE_NUM0TO4096,
  RULE_INTEGERONLY,
  RULE_INCORRECTIDCARD,
  RULE_INCORRECTIP,
  RULE_INCORRECTPORT,
  RULE_SPECIALPARAMS,
  YES_OR_NO,
  SEX,
  AGE,
  SMILE,
  GLASS,
  RULE_CHINESE,
  RULE_ENGLISH,
  RULE_URLPATH,
  RULE_NOTOVER60,
  RULE_FLOAT,
  RULE_LETTERFIRST,
  RULE_CORRECTLOWERLETTER,
  RULE_REQUIRED_APPCODE,
  RULE_MINLENGTH_NUMBER,
  RULE_LT4LETTERS,
  RULE_INCORRECTEMAIL,
  RULE_HTTPURL
}
