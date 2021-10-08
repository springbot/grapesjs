import Backbone from 'backbone';
const InputNumber = require('domain_abstract/ui/InputNumber');
const PropertyView = require('./PropertyView');
const $ = Backbone.$;
let timeout;

module.exports = PropertyView.extend({
  templateInput() {
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    const icon = this.model.get('icon');
    const textLabel = this.model.get('textLabel');
    let iconEl = '';
    switch (icon) {
      case '':
      case undefined:
        iconEl = `<div>${textLabel ? textLabel : ''}</div>`;
        break;
      case 'border-width':
        iconEl = `<i class="fal fa-horizontal-rule fa-fw"></i>
                  <i class="far fa-horizontal-rule fa-fw"></i>
                  <i class="fas fa-horizontal-rule fa-fw"></i>`;
        break;
      default:
        iconEl = `<i class="${icon}"></i>`;
        break;
    }

    return `<div class="${ppfx}field ${ppfx}field-integer">
      <div class="${pfx}icon">
        ${iconEl}
      </div>
    </div>`;
  },

  init() {
    const model = this.model;
    this.listenTo(model, 'change:unit', this.modelValueChanged);
    this.listenTo(model, 'el:change', this.elementUpdated);
    this.listenTo(model, 'change:units', this.render);
  },

  setValue(value) {
    const parsed = this.model.parseValue(value);
    value = `${parsed.value}${parsed.unit}`;
    this.inputInst.setValue(value, { silent: 1 });
  },

  onRender() {
    const ppfx = this.ppfx;

    if (!this.input) {
      const input = this.model.input;
      input.ppfx = ppfx;
      input.render();
      const fields = this.el.querySelector(`.${ppfx}field`);
      fields.appendChild(input.el.children[0]);
      this.$input = input.inputEl;
      this.unit = input.unitEl;
      this.$unit = $(this.unit);
      this.input = this.$input.get(0);
      this.inputInst = input;
    }
  },

  clearCached() {
    PropertyView.prototype.clearCached.apply(this, arguments);
    this.unit = null;
    this.$unit = null;
  }
});
