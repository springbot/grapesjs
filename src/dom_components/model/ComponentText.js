import Component from './Component';

export default Component.extend({
  defaults: {
    ...Component.prototype.defaults,
    type: 'text',
    droppable: false,
    editable: true,
    traits: [
      {
        type: 'select', // Type of the trait
        label: 'Type', // The label you will see in Settings
        name: 'type', // The name of the attribute/property to use on component
        options: [
          { id: 'text', name: 'Text' },
          { id: 'email', name: 'Email' },
          { id: 'password', name: 'Password' },
          { id: 'number', name: 'Number' }
        ]
      },
      {
        type: 'checkbox',
        name: 'required'
      }
    ]
  },

  toHTML() {
    return Component.prototype.toHTML.apply(this, arguments);
  }
});
