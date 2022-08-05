
// 生成颜色值
export const mix = (color1, color2, weight) => {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  let r1 = parseInt(color1.substring(1, 3), 16);
  let g1 = parseInt(color1.substring(3, 5), 16);
  let b1 = parseInt(color1.substring(5, 7), 16);
  let r2 = parseInt(color2.substring(1, 3), 16);
  let g2 = parseInt(color2.substring(3, 5), 16);
  let b2 = parseInt(color2.substring(5, 7), 16);
  let r = Math.round(r1 * (1 - weight) + r2 * weight);
  let g = Math.round(g1 * (1 - weight) + g2 * weight);
  let b = Math.round(b1 * (1 - weight) + b2 * weight);
  r = ("0" + (r || 0).toString(16)).slice(-2);
  g = ("0" + (g || 0).toString(16)).slice(-2);
  b = ("0" + (b || 0).toString(16)).slice(-2);
  return "#" + r + g + b;
}

// 区分开发生产环境
export const devPro = (dev, pro) => {
  return import.meta.env?.MODE === 'development' ? dev : pro
}

// 浏览器的各种存储
export const storage = (name, key, value) => {
  if (key === 'remove') {
    return window[name].removeItem(value)
  } else if (key === 'clear') {
    return window[name].clear()
  } else if (value) {
    return window[name].setItem(`dinert-${key}`, JSON.stringify(value))
  } else {
    return JSON.parse(window[name].getItem(`dinert-${key}`))
  }
}

// 首字母大写
export const firstUpperCase = (str) => {
  str = String(str)
  return str.replace(/^\S/, s => s.toUpperCase())
}

// 重写判断类型
export const type = type => {
  return Object.prototype.toString
    .call(type)
    .split(' ')[1]
    .split(']')[0]
    .toLocaleLowerCase()
}