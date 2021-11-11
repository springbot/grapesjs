const DomainViews = require('domain_abstract/view/DomainViews');
const TraitView = require('./TraitView');
const TraitSelectView = require('./TraitSelectView');
const TraitCheckboxView = require('./TraitCheckboxView');
const TraitNumberView = require('./TraitNumberView');
const TraitColorView = require('./TraitColorView');
const TraitButtonView = require('./TraitButtonView');

module.exports = DomainViews.extend({
  itemView: TraitView,

  itemsView: {
    text: TraitView,
    number: TraitNumberView,
    select: TraitSelectView,
    checkbox: TraitCheckboxView,
    color: TraitColorView,
    button: TraitButtonView
  },

  initialize(o = {}) {
    const config = o.config || {};
    this.config = config;
    this.em = o.editor;
    this.managerLabel = o.managerLabel;
    this.pfx = config.stylePrefix || '';
    this.ppfx = config.pStylePrefix || '';
    this.className = this.pfx + 'traits';
    this.collection = o.collection;
    const toListen = 'component:toggled';
    this.listenTo(this.em, toListen, this.updatedCollection);
    this.listenTo(this.managerLabel.model, 'change:open', this.render);
  },

  /**
   * Update view collection
   * @private
   */
  updatedCollection() {
    const comp = this.em.getSelected();

    this.collection = comp ? comp.get('traits') : [];
    this.render();
  },

  initListeners() {
    this.listenTo(
      this.em.get('StyleManager').getSectors(),
      'change:open',
      model => {
        if (model.get('open')) {
          this.managerLabel.forceClose();
        }
      }
    );
  },

  render() {
    const ppfx = this.ppfx;
    const isOpen = this.managerLabel.model.get('open') ? 'open' : '';
    const isEmpty = !this.collection.length ? 'empty' : '';

    this.el.className = `${
      this.className
    } ${ppfx}one-bg ${ppfx}two-color ${isOpen} ${isEmpty}`;

    this.$el.empty();
    this.$el.append(this.managerLabel.render().el);

    var ManagerLabel = document.createElement('div');
    ManagerLabel.className = `${this.pfx}traits-container ${
      this.config.class ? this.config.class : ''
    }`;

    if (this.collection.length)
      this.collection.each(function(model) {
        this.add(model, ManagerLabel);
      }, this);

    this.$el.append(ManagerLabel);
    return this;
  }
});
