var Mn = require('backbone.marionette');

module.exports = Mn.Behavior.extend({
    channelName:'page',
    radioEvents:{
        'show:item': 'showItem'
    },
    // ui:{
    //     lien:'.lien',
    // },
    // events:{
    //     'click @ui.lien': 'handleChoice'
    // },
    showItem:function(myItem){
        console.log("show item : " + myItem);
    },
    onRender: function() {
        console.log("page rendered");
    },
});
