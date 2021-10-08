import Backbone from 'backbone';

module.exports = Backbone.View.extend({
  template: _.template(`
  <div class="<%= pfx %>traits-title" data-traits-label>
    <div class="<%= pfx %>icon">
      <i class="far fa-sliders-h"></i>
    </div>
    <%= labelContainer %>
    <i id="<%= pfx %>caret" class="fas fa-caret-down"></i>
  </div>
  `),

  events: {
    'click [data-traits-label]': 'toggleOpen'
  },

  initialize(options) {
    this.config = options.config || {};
    this.em = this.config.em;
    this.pfx = this.config.stylePrefix || '';
    this.ppfx = this.config.pStylePrefix || '';
    this.model = options.model;
  },

  forceClose() {
    this.model.set('open', false);
  },

  toggleOpen() {
    this.model.set('open', !this.model.get('open'));
  },

  render() {
    this.$el.empty();
    this.$el.html(
      this.template({
        pfx: this.pfx,
        labelContainer: this.config.labelContainer
      })
    );
    return this;
  }
});
