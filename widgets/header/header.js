var Backbone = require('backbone');

App.Views.Header = Backbone.View.extend({
    el: '#header',
    template: require('./header.tpl.jade'),
    initialize: function() {
        this.header_json = __inline('./header.json');
    },
    render: function() {
        var html = this.template(this.header_json);
        this.$el.html(html);
        return this;
    }
});
