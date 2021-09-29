module.exports = {
  run(editor, sender) {
    editor.runCommand('open-tm');
    editor.runCommand('open-sm');
  }
};
