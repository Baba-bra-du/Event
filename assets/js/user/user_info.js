$(function () {
    var layer = layui.layer
    var form = layui.form
    // 自定义验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })


    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 获取表单值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        // 冲刺你渲染页面
        initUserInfo();
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('失败');
                }
                layer.msg('成功')
                window.parent.getUserInfo()
            }
        })
    })

})