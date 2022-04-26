import { View } from 'backbone';
import html from 'utils/html';

export default class CategoryView extends View {
  template({ pfx, label, icon }) {
    return html`
      <div class="${pfx}title">
        <div class="${pfx}icon"><div class="${icon}"></div></div>
        <div class="${pfx}label">${label}</div>
        <div class="${pfx}caret"><div class="fas fa-caret-down"></div></div>
      </div>
      <div class="${pfx}blocks-c"></div>
    `;
  }

  attributes() {
    return this.model.get('attributes');
  }

  initialize(o = {}, config = {}) {
    this.config = config;
    const pfx = config.pStylePrefix || '';
    this.em = config.em;
    this.pfx = pfx;
    this.iconClass = `${pfx}caret-icon`;
    this.activeClass = `${pfx}open`;
    this.className = `${pfx}block-category`;
    this.events = {};
    this.events[`click .${pfx}title`] = 'toggle';
    this.listenTo(this.model, 'change:open', this.updateVisibility);
    this.delegateEvents();
    this.model.view = this;
  }

  updateVisibility() {
    if (this.model.get('open')) this.open();
    else this.close();
  }

  open() {
    this.$el.addClass(this.activeClass);
    this.getBlocksEl().style.display = '';
  }

  close() {
    this.$el.removeClass(this.activeClass);
    this.getBlocksEl().style.display = 'none';
  }

  toggle() {
    var model = this.model;
    model.set('open', !model.get('open'));
  }

  getIconEl() {
    if (!this.iconEl) {
      this.iconEl = this.el.querySelector('.' + this.iconClass);
    }

    return this.iconEl;
  }

  getBlocksEl() {
    if (!this.blocksEl) {
      this.blocksEl = this.el.querySelector('.' + this.pfx + 'blocks-c');
    }

    return this.blocksEl;
  }

  append(el) {
    this.getBlocksEl().appendChild(el);
  }

  render() {
    const { em, el, $el, model, pfx, config } = this;
    const label = em.t(`blockManager.categories.${model.id}`) || model.get('label');
    const icon = config.categoryIcons[model.id];
    el.innerHTML = this.template({ pfx, label, icon });
    $el.addClass(this.className);
    $el.css({ order: model.get('order') });
    this.updateVisibility();
    return this;
  }
}
