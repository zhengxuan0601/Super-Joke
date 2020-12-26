module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    "quotes": [2, "single"], //单引号
    "no-irregular-whitespace": 2, //不规则的空白不允许
    "no-trailing-spaces": 2, //一行结束后面有空格就发出警告
    "comma-dangle": 2, //对象字面量项尾不能有逗号
    "no-mixed-spaces-and-tabs": [2, "smart-tabs"], //禁止混用tab和空格
    "no-extra-boolean-cast": 2, //禁止不必要的bool转换
    "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
    "no-const-assign": 2, //禁止修改const声明的变量
    "eqeqeq": 2, // 必须使用全等
    "semi":["error","never"],
    "no-multi-spaces": 2, // 不能用多余的空格
    "key-spacing": [1, {  // 对象字面量中冒号的前后空格
      "beforeColon": false,
      "afterColon": true
    }],
    "no-multiple-empty-lines": [2, {"max": 2}], //空行最多不能超过两行
    "curly": ["error", "all"], //强制使用花括号的风格
    "no-empty": 2, //不允许出现空的代码块
    "comma-style": [2, "last"], //逗号风格
    "brace-style": [1, "1tbs"],//大括号风格
    "comma-spacing": 2,//逗号前后的空格
    "space-before-function-paren": 2 // 方法名后是否强制添加一个空格
  }
};