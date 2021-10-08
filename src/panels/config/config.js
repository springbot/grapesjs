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
          className: 'far fa-square',
          command: swv,
          context: swv,
          attributes: { title: 'View components' }
        },
        {
          id: prv,
          className: 'far fa-eye',
          command: prv,
          context: prv,
          attributes: { title: 'Preview' }
        },
        {
          id: ful,
          className: 'far fa-arrows-alt',
          command: ful,
          context: ful,
          attributes: { title: 'Fullscreen' }
        },
        {
          id: expt,
          className: 'far fa-code',
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
          className: 'fas fa-paint-brush',
          command: oms,
          active: true,
          togglable: 0,
          attributes: { title: 'Open Style Manager' }
        },
        {
          id: obl,
          className: 'fas fa-th-large',
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
