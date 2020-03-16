/**
 * 移动端设配js
 * 以iphone6为标准, 定义1rem = 20px
 */
const calculateClientREM = () => {
  const [CLIENTW, BASICCLIENTW, BASICFONTREM] = [window.innerWidth, 375, 20]
  let HTMLFONTSIZE = CLIENTW / BASICCLIENTW * BASICFONTREM
  let HTML = document.getElementsByTagName('html')[0]
  HTML.style.fontSize = `${HTMLFONTSIZE}px`
  window.onresize = calculateClientREM
}

export { calculateClientREM }