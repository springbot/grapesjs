import { View } from 'backbone';
import html from 'utils/html';

export default class DevicesView extends View {
  template({ ppfx, label }) {
    return html`
      <div class="${ppfx}device-label">${label}</div>
      <div class="${ppfx}field ${ppfx}field-radio">
        <div class="${ppfx}radio-items ${ppfx}devices"></div>
      </div>
      <button style="display:none" class="${ppfx}add-trasp">+</button>
    `;
  }

  events() {
    return {
      change: 'updateDevice',
    };
  }

  initialize(o) {
    this.config = o.config || {};
    this.em = this.config.em;
    this.ppfx = this.config.pStylePrefix || '';
    this.events['click .' + this.ppfx + 'add-trasp'] = this.startAdd;
    this.listenTo(this.em, 'change:device', this.updateSelect);
    this.delegateEvents();
  }

  /**
   * Start adding new device
   * @return {[type]} [description]
   * @private
   */
  startAdd() {}

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
  }

  /**
   * Update select value on device update
   * @private
   */
  updateSelect() {
    var em = this.em;
    var devEl = this.devicesEl;
    if (em && em.getDeviceModel && devEl) {
      var device = em.getDeviceModel();
      var name = device ? device.get('id') : '';
      devEl.find(`input[value="${name}"]`).checked = true;
    }
  }

  /**
   * Return devices options
   * @return {string} String of options
   * @private
   */
  getOptions() {
    const { collection, em, ppfx } = this;
    let result = '';

    collection.each(device => {
      const { name, id, iconName } = device.attributes;
      const label = (em && em.t && em.t(`deviceManager.devices.${id}`)) || name;
      const inputId = `${device.cid}-device`;
      const checked = em.get('device') === id ? ' checked' : '';
      result += `
      <div class="${ppfx}radio-item">
        <input id="${inputId}" type="radio" name="device" value="${id}"${checked}>
        <label class="${ppfx}radio-item-label ${iconName}" for="${inputId}" title="${label}"></label>
      </div>
      `;
    });

    return result;
  }

  render() {
    const { em, ppfx, $el, el } = this;
    const label = em && em.t && em.t('deviceManager.device');
    $el.html(this.template({ ppfx, label }));
    this.devicesEl = $el.find(`.${ppfx}devices`);
    this.devicesEl.append(this.getOptions());
    this.devicesEl.val(em.get('device'));
    el.className = `${ppfx}devices-c`;
    return this;
  }
}
