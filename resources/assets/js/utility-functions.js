export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const objValueFromDot = (obj, dots) => {
  if (!dots) {
    return null
  }

  let parts = dots.split('.')
  let newObj = obj[parts[0]] ? obj[parts[0]] : null

  if (!newObj) {
    return null
  }

  if (parts.length == 1) {
    return newObj
  } else {
    parts.shift()

    return objValueFromDot(newObj, parts.join('.'))
  }
}
