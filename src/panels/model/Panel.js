var Backbone = require('backbone');
var Buttons = require('./Buttons');

module.exports = Backbone.Model.extend({
  defaults: {
    id: '',
    content: '',
    visible: true,
    buttons: [],
    attributes: {},
    autoHide: false
  },

  initialize(options) {
    this.btn = this.get('buttons') || [];
    this.buttons = new Buttons(this.btn);
    this.set('buttons', this.buttons);
  }
});
