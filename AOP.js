/*window.onload = function() {
    alert(1);
}*/

//保存对原函数的引用
//var _onload = window.onload || function() {};

/*window.onload = function() {
    _onload();
    alert(2);
}*/

Function.prototype.before = function(beforeFn) {
    var _self = this;   //this保存了原函数的引用
    return function() {
        beforeFn.apply(this, arguments);    //调用时this指向window
        //此外beforeFn和_self是接收相同的arguments函数，
        //因此beforeFn如果对arguments进行了改造, 那么_self函数接收到的arguments也发生了变化
        return _self.apply(this, arguments);
    }
}

Function.prototype.after = function(afterFn) {
    var _self = this;
    return function() {
        var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
}

var func = function() {console.log(1);};

//相当于递归调用

func = func.before(function() {
    console.log(3);
}).before(function() {
    console.log(2);
}).after(function() {
    console.log(2);
}).after(function() {
    console.log(3);
});

func();