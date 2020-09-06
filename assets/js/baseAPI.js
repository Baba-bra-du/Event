// 每次调用$.get()  $.post() 和$.ajax()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

    // 地址中有my的皆为有权的访问 
    // 统一为有权限的接口  设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 不管成功失败都会执行complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            // 1.强制清空本地 token
            localStorage.removeItem('token');
            // 2.强制跳转到登录界面
            location.href('/login.html');
        }
    }


})