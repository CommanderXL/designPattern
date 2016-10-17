class Singleton {
    static getInstance(name) {
        if(!this.instance) {
            this.instance = new Singleton(name);
        }
        
        return this.instance;
    }
    constructor(name) {
        this.name = name;
        this.instance = null;
    }
    
    get getName() {
        return this.name;
    }
}


/*
最初单例模式
var CreateDiv = (function() {
    var instance;
    
    var CreateDiv = function(html) {
        //保证只有一个对象
        if(instance) {
            return instance;
        }
        //创建对象,并执行初始化的方法
        this.html = html;
        this.init();
        
        return instance = this;
    }
    
    CreateDiv.prototype.init = function() {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    
    return CreateDiv;
})();

var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');
console.log(a ===  b);
*/

/**
 * 代理单例模式
 *  */
/*
var CreateDiv = function(html) {
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}


var ProxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if(!instance) {
            return new CreateDiv(html);
        }
        return instance;
    } 
})();
*/





//fn中是创建单例的方法
//createDiv中是管理单例的方法
var createDiv = (function(fn) {
    var div;
    return function() {
        return div || (fn.apply(this, arguments));
    }
});
