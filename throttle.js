function throttle(fn, interval) {
    var __self = fn,
        timer,
        firstTime = true;
    return function() {
        var __me = this,
            args = arguments;
        
        if(firstTime) {
            __self.apply(__me, args);
            return firstTime = false;
        }
        
        if(timer) {
            return false;
        }
        
        timer = setTimeout(function() {
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