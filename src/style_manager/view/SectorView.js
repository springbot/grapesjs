import { View } from 'common';
import html from 'utils/html';
import PropertiesView from './PropertiesView';

export default class SectorView extends View {
  template({ pfx, label, icon }) {
    const icons = this.em?.getConfig('icons');
    const iconCaret = icons?.caret || '';
    const clsPfx = `${pfx}sector-`;

    return html`
      <div class="${clsPfx}title" data-sector-title>
        <div class="${clsPfx}icon"><div class="${this.model.get('iconName')}"></div></div>
        <div class="${clsPfx}label">${label}</div>
        <div class="${clsPfx}caret"><div class="fas fa-caret-down"></div></div>
      </div>
    `;
  }

  events() {
    return {
      'click [data-sector-title]': 'toggle',
    };
  }

  initialize(o) {
    const config = o.config || {};
    const { model } = this;
    const { em } = config;
    this.config = config;
    this.em = em;
    this.pfx = config.stylePrefix || '';
    this.listenTo(model, 'destroy remove', this.remove);
    this.listenTo(model, 'change:open', this.updateOpen);
    this.listenTo(model, 'change:visible', this.updateVisibility);
  }

  updateOpen() {
    const { $el, model, pfx, em } = this;
    const isOpen = model.isOpen();
    $el[isOpen ? 'addClass' : 'removeClass'](`${pfx}open`);
    this.getPropertiesEl().style.display = isOpen ? '' : 'none';
    if (isOpen) {
      em.attributes.TraitManager.managerLabel.model.setOpen(false);
      model.collection.each(sector => sector != model && sector.setOpen(false));
    }
  }

  updateVisibility() {
    this.el.style.display = this.model.isVisible() ? '' : 'none';
  }

  getPropertiesEl() {
    const { $el, pfx } = this;
    return $el.find(`.${pfx}properties`).get(0);
  }

  toggle() {
    const { model } = this;
    const open = !model.get('open');
    model.setOpen(open);
  }

  renderProperties() {
    const { model, config } = this;
    const objs = model.get('properties');

    if (objs) {
      const view = new PropertiesView({ collection: objs, config });
      this.$el.append(view.render().el);
    }
  }

  render() {
    const { pfx, model, $el } = this;
    const id = model.getId();
    const label = model.getName();
    $el.html(this.template({ pfx, label }));
    this.renderProperties();
    $el.attr('class', `${pfx}sector ${pfx}sector__${id} no-select`);
    this.updateOpen();
    return this;
  }
}
