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
          id: 'undo',
          className: 'fas fa-undo-alt',
          command: expt,
          attributes: { title: 'View code' }
        },
        {
          id: 'redo',
          className: 'fas fa-redo-alt',
          command: expt,
          attributes: { title: 'View code' }
        },
        {
          id: expt,
          className: 'far fa-save',
          command: expt,
          attributes: { title: 'View code' }
        },
        {
          id: 'show',
          className: 'far fa-ellipsis-v',
          command: 'open-hidden-options',
          constent: 'show-context',
          attributes: { title: 'More options' }
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
    },
    {
      id: 'options-hidden',
      visible: 0,
      autoHide: true,
      buttons: [
        {
          id: ful,
          className: 'far fa-expand',
          command: ful,
          context: ful,
          label: 'Expand view',
          attributes: { title: 'Fullscreen' }
        },
        {
          id: 'import-mjml',
          className: 'far fa-code',
          command: 'import-mjml',
          context: 'import-mjml',
          label: 'Import MJML',
          attributes: { title: 'Import MJML' }
        },
        {
          id: 'export-mjml',
          className: 'far fa-download',
          command: 'export-mjml',
          context: 'export-mjml',
          label: 'Export MJML',
          attributes: { title: 'Export MJML' }
        }
      ]
    }
  ],

  // Editor model
  em: null,

  // Delay before show children buttons (in milliseconds)
  delayBtnsShow: 300
};
