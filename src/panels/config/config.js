var swv = 'sw-visibility';
var expt = 'export-template';
var osm = 'open-sm';
var otm = 'open-tm';
var ola = 'open-layers';
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
          id: osm,
          icon: 'fas fa-paint-brush',
          command: osm,
          active: true,
          togglable: 0,
          attributes: { title: 'Open Style Manager' }
        },
        {
          id: otm,
          icon: 'fas fa-cog',
          command: otm,
          togglable: 0,
          attributes: { title: 'Settings' }
        },
        {
          id: ola,
          icon: 'fas fa-bars',
          command: ola,
          togglable: 0,
          attributes: { title: 'Open Layer Manager' }
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
