// 每次调用$.get()  $.post() 和$.ajax()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url='http://ajax.frontend.itheima.net'+options.url
    console.log(options.url);
    
})