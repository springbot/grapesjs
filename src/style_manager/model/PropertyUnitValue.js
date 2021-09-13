import { isUndefined } from 'underscore';
import Property from './Property';
import Input from 'domain_abstract/ui/Input';
import { hasWin } from 'utils/mixins';

export default Property.extend({
  defaults: {
    ...Property.prototype.defaults,
    value: '0px',
    valid: true
  },

  initialize(props = {}, opts = {}) {
    Property.callParentInit(Property, this, props, opts);
    this.input = hasWin() && new Input({ model: this });

    Property.callInit(this, props, opts);
  },

  clearValue(opts = {}) {
    this.set({ value: undefined }, opts);
    return this;
  },

  parseValue(val, property) {
    const parsed = Property.prototype.parseValue.apply(this, arguments);
    this.set('valid', CSS.supports(this.get('property'), parsed.value));

    return parsed;
  },

  getFullValue() {
    let value = this.get('value');
    value = !isUndefined(value) ? value : '';
    value = `${value}`;
    this.set('valid', CSS.supports(this.get('property'), value));
    return Property.prototype.getFullValue.apply(this, [value]);
  }
});
