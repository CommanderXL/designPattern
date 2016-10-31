var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return function (src) {
        imgNode.src = src;
    }
})();


var proxyImage = (function () {
    var img = new Image();

    //实际图片加载成功后,替换掉占位图片
    img.onload = function () {
        myImage(this.src);
    }

    return function (src) {
        //相当于一个占位图片
        myImage('/usr/images/loading.gif');
        img.src = src;
    }
})();

proxyImage('http://imgcache.qq.com/music/oodjmmwtcczadswforg.jpg');


/**
 * 代理函数用来收集一段时间内的请求,最后一次性的发送给服务器
 */
var synchronousFile = function (id) {
    console.log('开始同步文件, id为: ' + id);
}

var proxySynchronousFile = (function () {
    var cache = [],     //保存一段时间内需要同步的ID
        timer;          //定时器


    return function (id) {
        cache.push(id);
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            synchronousFile(cache.join(','));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        }, 2000);

    }
})();

var checkbox = document.getElementsByTagName('input');

for(var i = 0, c; c = checkbox[i++];) {
    c.onclick = function() {
        if(this.checked === true) {
            proxySynchronousFile(this.id);
        } 
    }
}