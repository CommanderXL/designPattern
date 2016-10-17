//stage: 3
//惰性加载
//事件绑定函数
var addEvent = function(elem, type, handlerr) {
    if(window.addEventListener) {   //浏览器嗅探
        addEvent = function(elem, type, handlerr) {
            elem.addEventListener(type, handler);
        }
    } else if(window.attachEvent) {
        addEvent = function() {
            elem.attachEvent('on' + type, handler);
        }
    }
    //事件绑定函数
    addEvent(elem, type, handler);
}


