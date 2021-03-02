$(function () {
    // 为 注册账户链接注册点击事件
    $('.login-box a').on('click', function () {
        // console.log(111);
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('.reg-box a').on('click', function () {
        // console.log(111);
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 导出form
    let form = layui.form
    // 导出layer
    let layer = layui.layer

    // 表单验证
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            let pass = $('.reg-box [name="password"]').val()
            if (pass !== value) {
                return "密码不一致"
            }
        }
    })

    // 注册表单事件
    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('.reg-box [name="title"]').val(),
            password: $('.reg-box [name="password"]').val(),
        }
        $.post("/api/reguser",
            data,
            function (res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg('注册成功');
                $('#link-login').click()
            },

        );
    });
    // 登录事件
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        console.log(this);
        console.log($(this).serialize());
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    });
})