import Component from './Component';

export default class ComponentText extends Component {}

ComponentText.prototype.defaults = {
  ...Component.getDefaults(),
  type: 'text',
  droppable: false,
  editable: true,
  traits: [
    {
      name: 'icon',
      type: 'button',
      labelButton: '<span class="far fa-eye"></span><span>Hello</span>',
    },
    {
      name: 'noicon',
      type: 'button',
      text: 'ahhhh',
    },
    {
      name: 'noicon2',
      type: 'button',
      text: 'ahhhh',
      full: true,
    },
    {
      name: 'testing1',
      iconName: 'far fa-eye',
      type: 'checkbox',
    },
    {
      name: 'testing2',
      type: 'checkbox',
    },
    {
      type: 'select',
      label: 'sel',
      name: 'sel',
      options: [
        { id: 'a', name: 'Option A' },
        { id: 'b', name: 'Option B' },
      ],
    },
    {
      type: 'select',
      label: 'sel icon',
      name: 'seli',
      iconName: 'far fa-eye',
      options: [
        { id: 'a', name: 'Option A' },
        { id: 'b', name: 'Option B' },
      ],
    },

    {
      type: 'text',
      label: 'awawa',
      placeholder: 'placeholder',
      name: 'txt',
      iconName: 'far fa-eye',
    },
  ],
};
