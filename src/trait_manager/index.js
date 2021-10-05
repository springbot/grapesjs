import { defaults, isElement } from 'underscore';

const defaultOpts = require('./config/config');
const TraitsView = require('./view/TraitsView');
const ManagerLabel = require('./model/ManagerLabel');
const ManagerLabelView = require('./view/ManagerLabelView');

module.exports = () => {
  let c = {};
  let TraitsViewer;
  let managerLabel;

  return {
    TraitsView,

    /**
     * Name of the module
     * @type {String}
     * @private
     */
    name: 'TraitManager',

    /**
     * Get configuration object
     * @return {Object}
     * @private
     */
    getConfig() {
      return c;
    },

    /**
     * Initialize module. Automatically called with a new instance of the editor
     * @param {Object} config Configurations
     */
    init(config = {}) {
      c = config;
      defaults(c, defaultOpts);
      const ppfx = c.pStylePrefix;
      ppfx && (c.stylePrefix = `${ppfx}${c.stylePrefix}`);

      managerLabel = new ManagerLabelView({
        model: new ManagerLabel(),
        editor: c.em,
        config: c
      });

      TraitsViewer = new TraitsView({
        collection: [],
        editor: c.em,
        config: c,
        managerLabel: managerLabel
      });
      return this;
    },

    onLoad() {
      TraitsViewer.initListeners();
    },

    postRender() {
      const elTo = this.getConfig().appendTo;

      if (elTo) {
        const el = isElement(elTo) ? elTo : document.querySelector(elTo);
        el.appendChild(this.render());
      }
    },

    getManagerLabel() {
      return managerLabel.model;
    },

    /**
     *
     * Get Traits viewer
     * @private
     */
    getTraitsViewer() {
      return TraitsViewer;
    },

    /**
     * Add new trait type
     * @param {string} name Type name
     * @param {Object} methods Object representing the trait
     */
    addType(name, trait) {
      var itemView = TraitsViewer.itemView;
      TraitsViewer.itemsView[name] = itemView.extend(trait);
    },

    /**
     * Get trait type
     * @param {string} name Type name
     * @return {Object}
     */
    getType(name) {
      return TraitsViewer.itemsView[name];
    },

    render() {
      return TraitsViewer.render().el;
    }
  };
};
