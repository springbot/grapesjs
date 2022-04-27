import Backbone from 'backbone';
import html from 'utils/html';

const $ = Backbone.$;

export default Backbone.View.extend({
  template({ pfx }) {
    return html`
      <div class="${pfx}title-icon"><div class="far fa-sliders-h"></div></div>
      <div class="${pfx}title-label" data-label-text></div>
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
    this.listenTo(this.em, 'component:toggled', this.updateLabel);
  },

  updateOpen() {
    const { em, $el } = this;
    if (this.model.get('open')) {
      $el.addClass('open');
      em.attributes.StyleManager.getSectors().each(t => t.setOpen(false));
    } else {
      $el.removeClass('open');
    }
  },

  updateLabel() {
    const { em, $el, config } = this;
    const comp = em.getSelected();
    const traits = comp?.getTraits();
    const name = comp?.getName();
    const labelText = `${name}${config.titleLabelSuffix}`;
    if (traits?.length) {
      $el.find('[data-label-text]').text(labelText);
      $el.css('display', '');
    } else {
      $el.css('display', 'none');
    }
  },

  toggle() {
    const { model } = this;
    const open = !model.get('open');
    this.model.set('open', open);
  },

  render() {
    const { pfx, $el } = this;
    $el.empty();
    $el.html(this.template({ pfx }));
    $el.attr('class', `${pfx}title ${this.model.get('open') ? 'open' : ''}`);
    $el.attr('data-traits-label', '');
    return this;
  },
});
