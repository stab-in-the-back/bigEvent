// 每一次调用ajax请求都会运行 ajaxPrefilter()函数
// ajaxPrefilter能获取ajax配置项




$.ajaxPrefilter(function (positions) {
    // 拼接url路径
    positions.url = 'http://ajax.frontend.itheima.net' + positions.url
    // console.log(positions.url);

    // 设置请求头
    if (positions.url.indexOf('/my/') !== -1) {
        positions.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 控制用户访问权限 全局挂载complete
    positions.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})

// 屏蔽enter事件
document.onkeydown = function (e) {
    if (e.keyCode == 13) return false
}