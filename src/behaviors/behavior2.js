var Mn = require('backbone.marionette');
var Backbone = require('backbone');

var page = Backbone.Radio.channel('page');
module.exports = Mn.Behavior.extend({
    onRender: function() {
        page.trigger('show:item',5);
    },
});
