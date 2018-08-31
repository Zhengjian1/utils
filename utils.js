// 获取地址栏参数
export const getUrlParame = (paramName) => {
    const urlParams = {};
    const url = window.location.href;
    const idx = url.indexOf('?');
    if (idx === -1) {
        return false;
    }
    let params = url.substring(url.indexOf('?') + 1);
    params = params.split('&');
    params.forEach((item) => {
        const param = item.split('=');
        urlParams[param[0]] = decodeURIComponent(param[1]);
    });
    if (paramName) {
        return urlParams[paramName];
    }
    return urlParams;
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
export const msToDate = (msec, format) => {
    const date = new Date(msec);
    let fmt = format;
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    const year = date.getFullYear().toString();
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, year.substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((item) => {
        if (new RegExp(`(${item})`).test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[item] : (`00${o[item]}`).substr(`${o[item]}`.length)
            );
        }
    });
    return fmt;
};

// 按需加载js
export const load = (path) => {
    const script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
};

// 获取目标元素与窗口的距离
export const getElOffset = (el) => {
    let ele = el;
    const offset = {
        left: ele.offsetLeft,
        top: ele.offsetTop
    };
    while (ele.offsetParent !== null) {
        ele = ele.offsetParent;
        offset.left += ele.offsetLeft;
        offset.top += ele.offsetTop;
    }
    return offset;
};

/*
 * @description 校验对象是否为空
 */
export const isEmptyObj = (obj) => {
    if (obj === undefined || obj === null || obj === '') return true;
    return Object.keys(obj).length === 0;
};


/**
 * js 抖动
 */
export const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(fn, delay);
    };
},
/**
 * js 节流
 */
export const throttle = (fn, delay) => {
    let lastCalledTime = +new Date();
    return function () {
        const nowTime = +new Date();
        if (nowTime - lastCalledTime >= delay) {
            fn();
            lastCalledTime = nowTime;
        }
    };
},

