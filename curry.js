const cost = (function() {
    var args = [];
    return () => {
        if(arguments.length === 0) {
            var money = 0;
            for(let i = 0; i < args.length; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();


//函数的uncurrying化有什么作用呢?
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}

var push = Array.prototype.push.uncurrying();

(function() {
    push(arguments, 4);
    console.log(arguments);
})(1, 2, 3);

//函数节流
var throttle = function(fn ,interval) {
    var __self = fn,
        timer,
        firstTime = true;
        
    return function() {
        var args = arguments,
            __me = this;    //window
            
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

window.onresize = throttle(function() {
    console.log(1);
}, 500);