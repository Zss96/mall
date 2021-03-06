export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


export function formatDate(date, format){
    let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    };
    if(/(y+)/.test(format))
      format = format.replace(RegExp.$1, date.getFullYear() + "").substr(4 - RegExp.$1.length);
    for(let k in o) {
      if(new RegExp(`(${k})`).test(format))
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return format;
  }
