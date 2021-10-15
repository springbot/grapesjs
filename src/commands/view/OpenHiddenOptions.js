var Backbone = require('backbone');
const $ = Backbone.$;

module.exports = {
  run(editor, sender) {
    const panels = editor.Panels;
    if (panels) {
      panels.getPanel('options-hidden').set('visible', true);
      this.setupDeactivate(editor, sender);
    }
  },

  setupDeactivate(editor, sender) {
    editor.once('component:selected', () => this.autoDeactivate(sender));
    setTimeout(() => {
      $('body').one('click', () => this.autoDeactivate(sender));
    }, 100);
  },

  autoDeactivate(sender) {
    $('body').off('click');
    sender.set('active', false);
  },

  stop(editor) {
    const panels = editor.Panels;
    if (panels) {
      panels.getPanel('options-hidden').set('visible', false);
    }
  }
};
