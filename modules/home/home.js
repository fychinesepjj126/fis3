var Backbone = require('backbone');
require('widgets/header');

App.Models.Home = Backbone.Model.extend({});
App.Collections.Home = Backbone.Collection.extend({
    model: App.Models.Home
});

App.Views.Home = Backbone.View.extend({
    el: '#content',
    initialize: function(c) {
        this.Collections = c;
    },
    render: function() {
        (new App.Views.Header()).render();
        var html = '';
        this.Collections.each(function(m) {
            html += '<div><a href="' + m.get('link') + '">' + m.get('name') + '</a></div>';
        });
        this.$el.html(html);
    }
})

return function() {
    //模拟数据
    var hc = new App.Collections.Home();
    hc.add([
        {'name': '加载模块A', 'link': '#at/m/a/name:moduleA/other:nothing'},
        {'name': '加载模块B', 'link': '#at/m/b'}
    ]);
    var home = new App.Views.Home(hc);
    home.render();
}