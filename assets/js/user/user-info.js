$(function () {
    let form = layui.form
    let layer = layui.layer
    // 表单验证
    form.verify({
        nickname: function (val) {
            if (val.length > 6) return '昵称长度必须要在1~6位之间'
        }
    })

    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {

                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                // jq方法
                // $('.layui-form [name="username"]').val(res.data.username)
                // $('.layui-form [name="nickname"]').val(res.data.nickname)
                // $('.layui-form [name="email"]').val(res.data.email)
                // layui方法  快速为表单赋值
                form.val('form-userInfo', res.data)
            }
        });
    }
    // 重置按钮
    $('#btn-reset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    });

    // 提交修改按钮
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                // 重新加载用户信息
                window.parent.getUserInfo()
            }
        });
    });

})