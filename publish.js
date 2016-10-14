(function(window) {
    var subscriber,
        publisher;
    subscriber = (function() {
        var Subscriber = {
            on: function(e, cb) {
                publisher.add({
                    event: e,
                    callback: cb
                });
            }
        };

        return {
            on: Subscriber.on.bind(Subscriber)
        }
    })();

    publisher = (function() {
        var Publisher = {
            eventObj: {},
            pulish: function(e, data) {
                var cb = this.eventObj[e];
                if(cb && typeof cb === 'function') {
                    cb(data);
                } else {
                    console.log('This method requires a function');
                }
            },
            add: function(obj) {
                this.eventObj[obj.event] = obj.callback;
            }
        }

        return {
            publish: Publisher.pulish.bind(Publisher),
            add: Publisher.add.bind(Publisher)
        }
    })();

})(window);






subscriber.on('test', function(data) {
    console.log(data);
});

publisher.publish('test', '123');

publisher.publish('ddd', '123');
