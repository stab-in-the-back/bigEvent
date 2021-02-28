// 拼接url路径
$.ajaxPrefilter(function (positions) {
    positions.url = 'http://ajax.frontend.itheima.net' + positions.url
    // console.log(positions.url);
})