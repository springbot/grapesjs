import _ from 'underscore';
import Backbone from 'backbone';

module.exports = Backbone.View.extend({
  template: _.template(`
  <div class="<%= pfx %>title">
  <i class="<%= icon %> <%= pfx %>category-icon"></i>
  <%= label %>
  <i class="<%= pfx %>caret"></i>
  </div>
  <div class="<%= pfx %>blocks-c"></div>
  `),

  events: {},

  initialize(o = {}, config = {}) {
    this.config = config;
    const pfx = this.config.pStylePrefix || '';
    this.pfx = pfx;
    this.caretU = 'fas fa-caret-up';
    this.caretD = 'fas fa-caret-down';
    this.iconClass = `${pfx}caret`;
    this.activeClass = `${pfx}open`;
    this.className = `${pfx}block-category`;
    this.events[`click .${pfx}title`] = 'toggle';
    this.listenTo(this.model, 'change:open', this.updateVisibility);
    this.delegateEvents();
  },

  updateVisibility() {
    if (this.model.get('open')) this.open();
    else this.close();
  },

  open() {
    this.el.className = `${this.className} ${this.activeClass}`;
    this.getIconEl().className = `${this.iconClass} ${this.caretD}`;
    this.getBlocksEl().style.display = '';
  },

  close() {
    this.el.className = this.className;
    this.getIconEl().className = `${this.iconClass} ${this.caretD}`;
    this.getBlocksEl().style.display = 'none';
  },

  toggle() {
    var model = this.model;
    model.set('open', !model.get('open'));
  },

  getIconEl() {
    if (!this.iconEl) {
      this.iconEl = this.el.querySelector('.' + this.iconClass);
    }

    return this.iconEl;
  },

  getBlocksEl() {
    if (!this.blocksEl) {
      this.blocksEl = this.el.querySelector('.' + this.pfx + 'blocks-c');
    }

    return this.blocksEl;
  },

  append(el) {
    this.getBlocksEl().appendChild(el);
  },

  render() {
    this.el.innerHTML = this.template({
      icon: this.model.get('icon'),
      pfx: this.pfx,
      label: this.model.get('label')
    });
    this.el.className = this.className;
    this.$el.css({ order: this.model.get('order') });
    this.updateVisibility();
    return this;
  }
});
