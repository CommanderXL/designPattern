const renderMap = (map) => {
    if(map.show instanceof Function) {
        map.show();
    }
}

renderMap(googleMap);
renderMap(baiduMap);

const objectFactory = (...args) => {
    let obj = new Object(),
        Constructor = [].shift.call(...args);
        
        obj.__proto__ = Constructor.prototype;
        var ret = Constructor.apply(obj, ...args);
        
        return typeof ret === 'object' ? ret : obj;
}


let Type = {};

for(let i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (type => {
        Type['is' + type] = (obj) => {
            return Object.prototype.toString.call(obj) === `[object ${type}]`;
        }        
    })(type);
}


const getSingle = (fn) => {
    let ret;
    return () => {
        return ret || (ret = fn.apply(this, arguments))
    }
}

const getScript = () => {
    return document.createElement('script');
}
