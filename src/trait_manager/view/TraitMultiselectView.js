const TraitView = require('./TraitView');
const $ = require('backbone').$;

module.exports = TraitView.extend({
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

  renderSelected() {
    if (!this.$selectedContainer) {
      this.$selectedContainer = $(`<div class="gjs-selected-options"></div>`);
      this.$container.append(this.$selectedContainer);
    } else {
      while (this.$selectedContainer.get(0).firstChild) {
        this.$selectedContainer
          .get(0)
          .removeChild(this.$selectedContainer.get(0).firstChild);
      }
    }
    this.getFormattedSelected().forEach(option => {
      const btn = document.createElement('div');
      btn.value = option.value;
      btn.className = 'gjs-selected-option';
      btn.innerHTML = `${option.name} <i class="far fa-times-circle"></i>`;
      btn.onclick = () => this.removeFromSelected(option.value);

      this.$selectedContainer.append(btn);
    });
    return this.$selectedContainer;
  },

  renderSelect() {
    if (!this.$select) {
      this.$select = $('<select></select>');
      this.$select.appendTo(this.$container);
    } else {
      while (this.$select.get(0).firstChild) {
        this.$select.get(0).removeChild(this.$select.get(0).firstChild);
      }
    }
    this.$select.append($('<option value="-999" selected></option>'));
    this.getCurrentOptions().forEach(option => {
      let opt = $(
        `<option class="option" value="${option.value}"${option.attrs}>${
          option.name
        }</option>`
      );
      this.$select.append(opt);
    });
  },

  /**
   * Returns input element
   * @return {HTMLElement}
   * @private
   */
  getInputEl() {
    this.$container = $('<div></div>');
    this.renderSelect();
    this.renderSelected();

    return this.$container.get(0);
  },

  removeFromSelected(value) {
    this.model.setValueFromInput(this.getSelected().filter(s => s != value));
    this.renderSelect();
    this.renderSelected();
  },

  onChange(e) {
    const selected = this.getSelected();
    if (e.srcElement.value != -999 && !selected.includes(e.srcElement.value)) {
      selected.push(e.srcElement.value);
    }
    this.model.setValueFromInput(selected);
    this.renderSelect();
    this.renderSelected();
  }
});
