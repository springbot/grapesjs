import Backbone from 'backbone';
import html from 'utils/html';

const $ = Backbone.$;

export default Backbone.View.extend({
  template({ pfx, labelContainer }) {
    return html`
      <div class="${pfx}title-icon"><div class="far fa-sliders-h"></div></div>
      <div class="${pfx}title-label">${labelContainer}</div>
      <div class="${pfx}title-caret"><div class="fas fa-caret-down"></div></div>
    `;
  },

  events: { 'click [data-traits-label]': 'toggle' },

  initialize(options) {
    this.config = options.config || {};
    this.em = this.config.em;
    this.pfx = this.config.stylePrefix || '';
    this.ppfx = this.config.pStylePrefix || '';
    this.model = options.model;
    this.listenTo(this.model, 'change:open', this.updateOpen);
  },

  updateOpen() {
    const { $el, pfx, em } = this;
    if (this.model.get('open')) {
      $el.addClass('open');
      this.el.nextElementSibling.style.display = '';
      em.attributes.StyleManager.getSectors().each(t => t.setOpen(false));
    } else {
      $el.removeClass('open');
      this.el.nextElementSibling.style.display = 'none';
    }
  },

  toggle() {
    const { model, em } = this;
    const open = !model.get('open');
    this.model.set('open', open);
  },

  render() {
    const { pfx, $el, config } = this;
    $el.empty();
    $el.html(this.template({ pfx, labelContainer: config.labelContainer }));
    $el.attr('class', `${pfx}title open`);
    $el.attr('data-traits-label', '');
    return this;
  },
});
