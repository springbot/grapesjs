const TraitView = require('./TraitView');
const $ = require('backbone').$;

module.exports = TraitView.extend({
  events: {
    change: 'onChange',
    'click .gjs-selected-option': 'removeFromSelected'
  },
  initialize(o) {
    TraitView.prototype.initialize.apply(this, arguments);
    const { ppfx, inputhClass, fieldClass, model } = this;
    this.listenTo(model, 'change:options', this.render);
    this.tmpl = `<div class="${fieldClass}">
      <div class="${inputhClass}" style="min-height: 32px;"></div>
      <div class="${ppfx}sel-arrow">
        <div class="${ppfx}d-s-arrow">
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
    </div>`;
  },

  formatOptions(options) {
    return options.map(option => {
      let attrs = '';
      let name, value, style;

      if (typeof option === 'string') {
        name = option;
        value = option;
      } else {
        name = option.name ? option.name : option.value;
        value = `${
          option.value === undefined ? option.id : option.value
        }`.replace(/"/g, '&quot;');
        style = option.style ? option.style.replace(/"/g, '&quot;') : '';
        attrs += style ? ` style="${style}"` : '';
      }
      return { name: name, value: value, attrs: attrs };
    });
  },

  // returns array of selected
  getSelected() {
    return this.model.getTargetValue() || this.model.get('value');
  },

  getFormattedSelected() {
    return this.formatOptions(this.getSelected());
  },

  getCurrentOptions() {
    const options = this.model.get('options') || [];
    const selected = this.getSelected();
    return this.formatOptions(options).filter(
      option => !selected.includes(option.value)
    );
  },

  selectedEl() {
    const selectedContainer = $(`<div class="gjs-selected-options"></div>`);
    this.getFormattedSelected().forEach(option => {
      const btn = document.createElement('div');
      btn.value = option.value;
      btn.className = 'gjs-selected-option';
      btn.innerHTML = `${option.name} <i class="far fa-times-circle"></i>`;

      selectedContainer.append(btn);
    });
    return selectedContainer;
  },

  /**
   * Returns input element
   * @return {HTMLElement}
   * @private
   */
  getInputEl() {
    const { model } = this;

    this.$container = $('<div></div>');
    this.$input = $('<select></select>');
    this.$input.appendTo(this.$container);

    this.$container.append(this.selectedEl());
    this.$input.append($('<option value="-999" selected></option>'));
    this.getCurrentOptions().forEach(option => {
      let opt = $(
        `<option class="option" value="${option.value}"${option.attrs}>${
          option.name
        }</option>`
      );
      this.$input.append(opt);
    });

    return this.$container.get(0);
  },

  removeFromSelected(event) {
    const value = event.target.value;
    this.model.set('value', this.getSelected().filter(s => s != value));
    this.render();
  },

  onChange(e) {
    const selected = this.getSelected();
    if (e.srcElement.value != -999 && !selected.includes(e.srcElement.value)) {
      selected.push(e.srcElement.value);
    }
    this.model.set('value', selected);
    this.render();
  }
});
