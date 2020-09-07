$(function () {
    var layer = layui.layer
    var form = layui.form

    getUserInfo()

    // 退出功能
    $('#btnOut').on('click', function () {
        layer.confirm('确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })


})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 在本地存储中得到token
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败');
            }
            renderAvatar(res.data)
        }
        
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }
}