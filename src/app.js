var $ = require('jquery');
var Backbone = require('backbone');
var Mn = require('backbone.marionette');
// var Promise = require("bluebird");
var Page  = require('./view/page');


$(document).ready(function(){
    var App = Mn.Application.extend({
        region:'#main',
        onStart: function() {
            this.showPage();
        },
        showPage:function(){
            this.getRegion('main').show(new Page());
        },
    });
    var myApp = new App();
    myApp.start();
});
