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
            'at/:module/:action(/*condition)': 'load'
        },
        home: function() {
            this.load('modules', 'home', 'home');
        },
        // 按照at/module/action(/conditions)格式的請求自動加載模塊
        load: function(target, moduleName, actionName, conditions) {
            if(moduleName === actionName){
                actionName = '';
            }
            // 将参数字符串'a:123/b:456'转换为json对象{a:123, b:456}
            var param = {};
            if(conditions && conditions.indexOf(':') > -1) {
                conditions.replace(/(\w+)\s*:\s*([\w-]+)/g, function(matched, key, value) {
                    key && (param[key] = value);
                });
            } else {
                param = conditions;
            }
            // 加载module目录下对应的模块
            var module_path = [target, moduleName, actionName].join('/');
            module_path = _.trim(module_path, '/');
            require([module_path], function(cb) {
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
        Collections: {},
        initialize: function() {
            new autoRouter();
            Backbone.history.start();
        }  
    };
})(window);

exports.run = App.initialize;


