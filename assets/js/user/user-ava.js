$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传图片
    $('#btn-upImg').on('click', function () {
        $('#file').click()
    })
    // 替换裁剪图片
    $("#file").on('change', function (e) {
        // 获取用户选择的照片
        // console.log(e.target);
        let file = e.target.files
        if (file.length == 0) return layer.msg('请选择照片！')
        // console.log(file);
        // 拿到用户选择的文件
        file = e.target.files[0]
        // 将文件转化为路径
        let imgURl = URL.createObjectURL(file)
        // 重更新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    });
    // 点击确定将头像上传到服务器
    $('#btn-upload').on('click', function () {
        // console.log('e');
        // 拿到裁剪后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status !== 0) return layer.msg('更换头像失败')
                window.parent.getUserInfo()
                layer.msg('更换头像成功')
            }
        });
    });
})





