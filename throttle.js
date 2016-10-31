

//核心的思想还是通过一个包装函数，接收需要延迟执行的函数fn，然后返回一个函数，这个函数可以接收其他的参数，用以给fn调用。
//在返回的函数中进行节流的操作

//节流函数一般用以哪些触发很频繁的操作当中


//传入的fn定义方式,是全局定义,还是作为对象的属性来调用?
function throttle(fn, interval) {
    var __self = fn,    //保留对原函数的引用
        timer,          //定时器
        firstTime = true;   //是否是第一次调用
    return function() {
        var __me = this,    //保留对调用对象的引用
            args = arguments;
        
        if(firstTime) {         //如果是第一个调用，不需要延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        
        if(timer) {             //如果定时器还在，说明前一次的延迟执行还没有完成
            return false;
        }
        
        timer = setTimeout(function() {     //延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    }
}

//对window.onsize进行节流,连续触发的过程中会间隔500ms
window.onsize = throttle(function() {
    console.log(123);
}, 500);