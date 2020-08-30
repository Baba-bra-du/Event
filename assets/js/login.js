$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide()
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer
    // 通过form.verify({})自定义校验规则
    form.verify({
        // 定义了一个pwd
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的值
            // 还需要拿到密码框中的值
            // 然后进行一次等于的判断
            // 如果判断失败 则return一个提示消息
            var pwd = $('.reg-box [name="password"]').val() //通过属性选择器拿到密码框中的值
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })

    // 监听表单注册事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认的提交行为
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 发起ajax的post请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            // 调用点击行为
            $('#link_login').click()

        })

    })

    // 监听表单登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 快速获取表单内容
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功')
                // 将扥估成功得到的token字符串,保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转后台主页
                location.href = '/index.html'
            }
        })
    })

})