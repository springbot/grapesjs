module.exports = {
  run(editor) {
    const panels = editor.Panels;
    if (panels) {
      panels.getPanel('options-hidden').set('visible', true);
    }
  },

  stop(editor) {
    const panels = editor.Panels;
    if (panels) {
      panels.getPanel('options-hidden').set('visible', false);
    }
  }
};
