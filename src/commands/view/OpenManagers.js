import Backbone from 'backbone';
const $ = Backbone.$;

export default {
  run(em, sender) {
    this.em = em;
    em.runCommand('core:open-traits', { sender: sender });
    em.runCommand('core:open-styles', { sender: sender });
  },

  stop() {
    this.em.stopCommand('core:open-traits');
    this.em.stopCommand('core:open-styles');
  },
};
