/**
 * 
 * @param {Object} obj 
 */
function obServer (obj) {
  for (const key in obj) {
    let element = obj[key]
    let arr = new Set()
    Object.defineProperty(obj, key, {
      get: function () {
        window.__func && arr.add(window.__func)
        return element
      },
      set: function (val) {
        element = val
        arr.forEach(item => { item() })
      }
    })
  }
}

function autoFun (fn) {
  window.__func = fn
  fn()
  window.__func = null
}