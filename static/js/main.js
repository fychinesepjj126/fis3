(function (exports, undefined) {
    // Expose global variable
    exports.jQuery = exports.$ = require('jquery');
    exports.underscore = exports._ = require('underscore');
    
    // Init plugins
    exports._.str = require('underscore/underscore.string');
    exports._.mixin(exports._.str.exports());
    exports._.str.include('Underscore.string', 'string'); 
    
})(window);

// Define app
(function (exports, undefined){
    var Backbone = require('backbone');

    // 配置路由
    var autoRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home'
        },
        home: function() {
            var param = arguments;
            require(['modules/home'], function(cb) {
                if(cb) {
                    cb(param);
                } else {
                    console.error('模塊加載失敗！');
                }
            });
        }
    });

    // 全局变量App
    exports.App = {
        Models: {},  
        Views: {},  
        Events: {},
        Collections: {},
        initialize: function() {
            var router = new autoRouter();
            Backbone.history.start();
            //router.navigate("home", {trigger: true});
        }  
    };
})(window);

exports.run = App.initialize;


