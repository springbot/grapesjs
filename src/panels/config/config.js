var swv = 'sw-visibility';
var expt = 'export-template';
var oms = 'open-managers';
var obl = 'open-blocks';
var ful = 'fullscreen';
var prv = 'preview';

module.exports = {
  stylePrefix: 'pn-',

  // Default panels fa-sliders for features
  defaults: [
    {
      id: 'commands',
      buttons: [{}]
    },
    {
      id: 'options',
      buttons: [
        {
          active: true,
          id: swv,
          icon: 'far fa-square',
          command: swv,
          context: swv,
          attributes: { title: 'View components' }
        },
        {
          id: prv,
          icon: 'far fa-eye',
          command: prv,
          context: prv,
          attributes: { title: 'Preview' }
        },
        {
          id: ful,
          icon: 'far fa-arrows-alt',
          command: ful,
          context: ful,
          attributes: { title: 'Fullscreen' }
        },
        {
          id: expt,
          icon: 'far fa-code',
          command: expt,
          attributes: { title: 'View code' }
        }
      ]
    },
    {
      id: 'views',
      buttons: [
        {
          id: oms,
          icon: 'fas fa-paint-brush',
          command: oms,
          active: true,
          togglable: 0,
          attributes: { title: 'Open Style Manager' }
        },
        {
          id: obl,
          icon: 'fas fa-th-large',
          command: obl,
          togglable: 0,
          attributes: { title: 'Open Blocks' }
        }
      ]
    }
  ],

  // Editor model
  em: null,

  // Delay before show children buttons (in milliseconds)
  delayBtnsShow: 300
};
