$(function () {
    // 调用函数实现加载用户信息

    getUserInfo()

    // 实现退出功能
    let layer = layui.layer
    $('#btn-out').on('click', function () {
        // console.log(111);
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空token的值
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    });



})

// 加载用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",

        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layui.layer.msg(res.message)

            layui.layer.msg(res.message)
            renderAvatar(res.data)
        },

    });
}

// 渲染头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('.welcome').html('欢迎 &nbsp&nbsp' + name)
    if (user.user_pic == null) {
        $('.nav-img2').html(name[0]).show()
        $('.layui-nav-img').hide()
    } else {
        $('.nav-img2').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    }
}