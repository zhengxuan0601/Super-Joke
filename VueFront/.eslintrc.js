module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-debugger": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
