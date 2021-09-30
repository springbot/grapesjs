import Backbone from 'backbone';
const StyleManager = require('style_manager');
const $ = Backbone.$;

module.exports = {
  run(em, sender) {
    this.sender = sender;
    this.em = em;
    if (!this.$tmCn || !this.smCn) {
      this.prepareTm();
      this.prepareSm();
      this.listenTo(this.target, 'component:toggled', this.toggleManagers);
    }
    this.toggleManagers();
  },
  prepareTm() {
    const em = this.em;
    const config = em.Config;
    const pfx = config.stylePrefix;
    const tm = em.TraitManager;
    var panelC;

    if (!this.$tmCn) {
      var tmView = tm.getTraitsViewer();
      var confTm = tm.getConfig();
      this.$tmCn = $('<div></div>');
      this.$tmCn2 = $('<div></div>');
      this.$tmCn.append(this.$tmCn2);
      this.$tmHeader = $('<div>').append(
        `<div class="${confTm.stylePrefix}header">${confTm.textNoElement}</div>`
      );
      this.$tmCn.append(this.$tmHeader);
      this.$tmCn2.append(
        `<div class="${pfx}traits-label">${confTm.labelContainer}</div>`
      );
      this.$tmCn2.append(tmView.render().el);
      var panels = em.Panels;

      if (!panels.getPanel('views-container'))
        panelC = panels.addPanel({ id: 'views-container' });
      else panelC = panels.getPanel('views-container');

      panelC
        .set('appendContent', this.$tmCn.get(0))
        .trigger('change:appendContent');

      this.target = em.getModel();
      this.listenTo(this.target, 'component:toggled', this.toggleTm);
    }
  },

  prepareSm() {
    if (!this.$smCn) {
      const em = this.em;
      var config = em.getConfig(),
        panels = em.Panels;
      // Main container
      this.$smCn = $('<div></div>');
      // Secondary container
      this.$smCn2 = $('<div></div>');
      this.$smCn.append(this.$smCn2);

      // Device Manager
      var dvm = em.DeviceManager;
      if (dvm && config.showDevices) {
        var devicePanel = panels.addPanel({ id: 'devices-c' });
        devicePanel
          .set('appendContent', dvm.render())
          .trigger('change:appendContent');
      }

      // Class Manager container
      var clm = em.SelectorManager;
      if (clm) this.$smCn2.append(clm.render([]));

      this.$smCn2.append(em.StyleManager.render());
      var smConfig = em.StyleManager.getConfig();
      const pfx = smConfig.stylePrefix;
      // Create header
      this.$smHeader = $(
        `<div class="${pfx}header">${smConfig.textNoElement}</div>`
      );
      this.$smCn.append(this.$smHeader);

      // Create panel if not exists
      if (!panels.getPanel('views-container'))
        this.panel = panels.addPanel({ id: 'views-container' });
      else this.panel = panels.getPanel('views-container');

      // Add all containers to the panel
      this.panel
        .set('appendContent', this.$smCn)
        .trigger('change:appendContent');
    }
  },

  toggleManagers() {
    const sender = this.sender;
    if (sender && sender.get && !sender.get('active')) return;

    if (this.target.getSelectedAll().length === 1) {
      this.$tmCn2.show();
      this.$smCn2.show();
      this.$tmHeader.hide();
      this.$smHeader.hide();
    } else {
      this.$tmCn2.hide();
      this.$smCn2.hide();
      this.$tmHeader.show();
      this.$smHeader.show();
    }
  },

  stop() {
    this.$tmCn2 && this.$tmCn2.hide();
    this.$tmHeader && this.$tmHeader.hide();
    this.$smCn2 && this.$smCn2.hide();
    this.$smHeader && this.$smHeader.hide();
  }
};
