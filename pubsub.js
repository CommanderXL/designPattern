/**
 * 1. 首先指定好谁充当发布者(比如售楼处)
 * 2. 给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者(售楼处的花名册)
 * 3. 最后发布消息,发布者会遍历这个缓存列表,依次触发里面存放的订阅者回调函数(遍历花名册,依次发短信)
 */



var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        var key = [].shift.call(arguments),
            fns = this.clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key];

        if(!fns) {
            return false;
        }

        if(!fn) {
            fns && (fns.length = 0);
        } else {
            for(var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if(_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    }
}


var installEvent = function (obj) {
    for (var key in event) {
        obj[key] = event[key];
    }
}


var salesOffices = {};

installEvent(salesOffices);

var fn1, fn2;


salesOffices.listen('squareMeter88', fn1 = function (price) {
    console.log('小红：价格= ' + price);
});

salesOffices.listen('squareMeter88', fn2 = function (price) {
    console.log('小明：价格= ' + price);
});


//salesOffices.trigger('squareMeter88', 200000000);

salesOffices.remove('squareMeter88', fn1);  //删除小红的订阅事件


salesOffices.trigger('squareMeter88', 3000000000);


//推模型和拉模型
