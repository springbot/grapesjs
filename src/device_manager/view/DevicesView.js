import _ from 'underscore';
import Backbone from 'backbone';

module.exports = Backbone.View.extend({
  template: _.template(`
    <div class="<%= ppfx %>device-label"><%= deviceLabel %></div>
    <div class="<%= ppfx %>field <%= ppfx %>select">
      <span id="<%= ppfx %>input-holder">
        <div class="<%= ppfx %>devices"></div>
      </span>
    </div>
    <button style="display:none" class="<%= ppfx %>add-trasp">+</button>`),

  events: {
    change: 'updateDevice'
  },

  initialize(o) {
    this.config = o.config || {};
    this.em = this.config.em;
    this.ppfx = this.config.pStylePrefix || '';
    this.events['click .' + this.ppfx + 'add-trasp'] = this.startAdd;
    this.listenTo(this.em, 'change:device', this.updateSelect);
    this.delegateEvents();
  },

  /**
   * Start adding new device
   * @return {[type]} [description]
   * @private
   */
  startAdd() {},

  /**
   * Update device of the editor
   * @private
   */
  updateDevice(e) {
    var em = this.em;
    if (em) {
      var val = e.target ? e.target.value : '';
      em.set('device', val);
    }
  },

  /**
   * Update select value on device update
   * @private
   */
  updateSelect() {
    var em = this.em;
    var devEl = this.devicesEl;
    if (em && em.getDeviceModel && devEl) {
      var device = em.getDeviceModel();
      var name = device ? device.get('name') : '';
      devEl.find(`input[value="${name}"]`).checked = true;
    }
  },

  /**
   * Return devices options
   * @return {string} String of options
   * @private
   */
  getOptions() {
    var result = '';
    this.collection.each(device => {
      const { id, className } = device;
      result +=
        `<div class="${this.ppfx}radio-item">` +
        `<input id="${id}" class="${
          this.ppfx
        }radio" type="radio" name="device" value="${device.get('name')}"` +
        `${device.get('active') ? ' checked' : ''}>` +
        `<label class="${
          this.ppfx
        }radio-item-label ${className}" for="${id}" title="${device.get(
          'name'
        )}"></label>` +
        `</div>`;
    });
    return result;
  },

  render() {
    var pfx = this.ppfx;
    this.$el.html(
      this.template({
        ppfx: pfx,
        deviceLabel: this.config.deviceLabel
      })
    );
    this.devicesEl = this.$el.find('.' + pfx + 'devices');
    this.devicesEl.append(this.getOptions());
    this.el.className = pfx + 'devices-c';
    return this;
  }
});
