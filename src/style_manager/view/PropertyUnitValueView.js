import Backbone from 'backbone';
import PropertyView from './PropertyView';

const $ = Backbone.$;

export default PropertyView.extend({
  templateInput() {
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    const icon = this.model.get('icon');
    const textLabel = this.model.get('textLabel');
    const iconEl = icon ? `<i class="${icon}"></i>` : `<div>${textLabel}</div>`;

    return `<div class="${ppfx}field ${ppfx}input">
      <div class="${pfx}icon">
        ${iconEl}
      </div>
    </div>`;
  },

  initialize(...args) {
    PropertyView.prototype.initialize.apply(this, args);
    const model = this.model;
    this.listenTo(model, 'change:valid', this.validityChanged);
    this.listenTo(model, 'el:change', this.elementUpdated);
  },

  validityChanged() {
    const ppfx = this.ppfx;
    const fields = this.el.querySelector(`.${ppfx}fields`);
    if (!fields) {
      return;
    }
    if (!this.model.get('valid')) {
      fields.style.boxShadow = 'inset 0 0 0 1px red';
    } else {
      fields.style.boxShadow = '';
    }
  },

  setValue(value) {
    const parsed = this.model.parseValue(value, this.property);
    value = `${parsed.value}`;
    this.inputInst.setValue(value, { silent: 1 });
  },

  onRender() {
    const ppfx = this.ppfx;
    const pfx = this.pfx;

    if (!this.input) {
      const input = this.model.input;
      input.ppfx = ppfx;
      input.render();
      const fields = this.el.querySelector(`.${ppfx}field`);
      fields.appendChild(input.el.children[0]);
      this.$input = input.inputEl;
      this.input = this.$input.get(0);
      this.inputInst = input;
    }
    const label = this.el.querySelector(`.${pfx}label`);
    if (label) {
      label.remove();
    }
  },

  clearCached() {
    PropertyView.prototype.clearCached.apply(this, arguments);
  }
});
