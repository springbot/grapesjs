import Backbone from 'backbone';
const StyleManager = require('style_manager');
const $ = Backbone.$;

module.exports = {
  run(em, sender) {
    this.sender = sender;
    this.em = em;
    if (!this.$traitsMainContainer || !this.stylesContainer) {
      this.target = em.getModel();
      this.prepareTraitManager();
      this.prepareStyleManager();
      this.listenTo(this.target, 'component:toggled', this.toggleManagers);
    }
    this.toggleManagers();
  },

  prepareTraitManager() {
    const em = this.em;
    const config = em.Config;
    const pfx = config.stylePrefix;
    const traitManager = em.TraitManager;
    var panelC;

    if (this.$traitsMainContainer) {
      return;
    }

    var view = traitManager.getTraitsViewer();
    var traitsConfig = traitManager.getConfig();

    this.$traitsMainContainer = $('<div></div>');
    this.$traitsContainer = $('<div></div>');

    this.$traitsMainContainer.append(this.$traitsContainer);
    this.$traitsHeader = $(
      `<div class="${traitsConfig.stylePrefix}header">
        ${traitsConfig.textNoElement}
      </div>`
    );

    this.$traitsMainContainer.append(this.$traitsHeader);
    this.$traitsTitle = $(
      `<div class="${pfx}traits-label">
      <div class="${pfx}icon">
        <i class="far fa-sliders-h"></i>
      </div>
      ${traitsConfig.labelContainer}
      <i id="${pfx}caret" class="fas fa-caret-up"></i>
    </div>`
    );
    this.$traitsContainer.append(this.$traitsTitle);
    this.$traitsContainer.append(view.render().el);
    var panels = em.Panels;

    if (!panels.getPanel('views-container')) {
      panelC = panels.addPanel({ id: 'views-container' });
    } else {
      panelC = panels.getPanel('views-container');
    }

    panelC
      .set('appendContent', this.$traitsMainContainer.get(0))
      .trigger('change:appendContent');
  },

  prepareStyleManager() {
    if (this.$stylesMainContainer) {
      return;
    }

    const em = this.em;
    var config = em.getConfig(),
      panels = em.Panels;

    // Main container
    this.$stylesMainContainer = $('<div></div>');
    // Secondary container
    this.$stylesContainer = $('<div></div>');
    this.$stylesMainContainer.append(this.$stylesContainer);

    // Device Manager
    var dvm = em.DeviceManager;
    if (dvm && config.showDevices) {
      var devicePanel = panels.addPanel({ id: 'devices-c' });
      devicePanel
        .set('appendContent', dvm.render())
        .trigger('change:appendContent');
    }

    this.$stylesContainer.append(em.StyleManager.render());

    var stylesConfig = em.StyleManager.getConfig();
    const pfx = stylesConfig.stylePrefix;

    // Create header
    this.$stylesHeader = $(
      `<div class="${pfx}header">
        ${stylesConfig.textNoElement}
      </div>`
    );
    this.$stylesMainContainer.append(this.$stylesHeader);

    // Create panel if not exists
    if (!panels.getPanel('views-container'))
      this.panel = panels.addPanel({ id: 'views-container' });
    else this.panel = panels.getPanel('views-container');

    // Add all containers to the panel
    this.panel
      .set('appendContent', this.$stylesMainContainer)
      .trigger('change:appendContent');
  },

  toggleTraitManager() {
    this.$traitsContainer.hide();
  },

  toggleManagers() {
    const sender = this.sender;
    if (sender && sender.get && !sender.get('active')) {
      return;
    }

    if (this.target.getSelectedAll().length === 1) {
      this.$traitsContainer.show();
      this.$stylesContainer.show();
      this.$traitsHeader.hide();
      this.$stylesHeader.hide();
    } else {
      this.$traitsContainer.hide();
      this.$stylesContainer.hide();
      this.$traitsHeader.show();
      this.$stylesHeader.show();
    }
  },

  stop() {
    this.$traitsContainer && this.$traitsContainer.hide();
    this.$traitsHeader && this.$traitsHeader.hide();
    this.$stylesContainer && this.$stylesContainer.hide();
    this.$stylesHeader && this.$stylesHeader.hide();
  }
};
