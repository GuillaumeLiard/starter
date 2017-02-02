var Mn = require('backbone.marionette');
var templates = require('./../utils/templates.js');
var Behavior1 = require('./../behaviors/behavior1');
var Behavior2 = require('./../behaviors/behavior2');

module.exports = Mn.View.extend({
    behaviors:[Behavior1,Behavior2],
    template:templates.page,
    className:"page"
});
