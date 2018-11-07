import * as fetchJsonp from 'fetch-jsonp';

export function getJson(url, params, headers) {
    const host = getGwHost();
    const regex = /(http|https)/gi;
    if (!regex.test(url)) {
        url = host + url;
    }
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => {
            let value = params[key];
            var isJson = typeof(value) == 'object' &&
                Object.prototype.toString.call(value).toLowerCase() == '[object object]' && !value.length;
            let isArray = Array.isArray(value);
            if (isJson || isArray) {
                value = JSON.stringify(value);
            }
            paramsArray.push(key + '=' + value);
        });
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    
    return new Promise(function (resolve, reject) {
        if (url.indexOf('\/\/') === 0 && url.indexOf('127.0.0.1') == -1) {
            // jsonp 请求,解决跨域问题
            fetchJsonp.default(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log(response.status);
                        reject({
                            code: -1,
                            message: '出错啦'
                        })
                    }
                })
                .then((response) => {
                    commonValidation(resolve, reject, response);
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        code: -1,
                        message: '出错啦'
                    });
                });
        } else {
            fetch(url, {
                method: 'GET',
                headers: headers
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status);
                    reject({
                        code: -1,
                        message: '出错啦'
                    })
                }
            })
                .then((response) => {
                    commonValidation(resolve, reject, response)
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        code: -1,
                        message: '出错啦'
                    });
                })
        }
    })
}

/**
 * 统一校验
 * @param resolve
 * @param reject
 * @param response
 */
function commonValidation (resolve, reject, response ) {
    // 未登录时跳转登录
    if (response && response.code == -1) {
        // location.href = window.location.origin + '/#/login';
        console.log('未登录')
    } else {
        resolve(response);
    }
}

function  getGwHost() {
    if (process.env.NODE_ENV == 'production') {
        return '//zgbgw.m.jd.com';
    }
    return '//zgbgwb.m.jd.com';
}