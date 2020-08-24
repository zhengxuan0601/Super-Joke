/**
 * 创建websocket实例 可断线重连
 * @method createSocket
 * @param {String} url socket路径
 * @param {Object} handlers socket各路回调 对象包含onopen, onmessage, onclose, onerror函数
 * @return {WebSocket} websocket实例
 */
const createSocket = function (url, handlers) {
  const { onopen, onmessage, onclose, onerror } = handlers
  let retries = 0
  let sock = null

  function socket (url) {
    sock = new WebSocket(url)

    sock.onopen = function () {
      retries = 0
      typeof onopen === 'function' && onopen(sock)
    }

    sock.onerror = function () {
      typeof onerror === 'function' && onerror()
    }

    sock.onclose = function () {
      typeof onclose === 'function' && onclose()
      sock = null // After 10 retries stop trying

      if (retries <= 10) {
        // eslint-disable-next-line no-mixed-operators, no-restricted-properties
        let retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100
        retries += 1
        setTimeout(function () {
          socket(url)
        }, retryInMs)
      }
    }

    sock.onmessage = function (e) {
      // This assumes that all data sent via the websocket is JSON.
      if (e.data.indexOf('{') > -1) {
        let msg = e.data.split(' (From')[0]
        typeof onmessage === 'function' && onmessage(msg)
      }
    }
  }
  socket(url)
  return sock
}
export default createSocket
