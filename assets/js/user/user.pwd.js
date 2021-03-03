$(function () {
    let form = layui.form
    let layer = layui.layer
    // 密码框校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (val) {
            if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同'
        },
        rePwd: function (val) {
            if (val !== $('[name=newPwd]').val()) return '前后密码不一致'
        }
    })


    // 提交修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
            }
        });
    });
})