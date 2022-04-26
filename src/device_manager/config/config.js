export default {
  // The device `id` to select on start, if not indicated, the first available from `devices` will be used.
  default: null,

  // Default devices
  devices: [
    {
      id: 'desktop',
      name: 'Desktop',
      width: '',
      iconName: 'far fa-desktop',
    },
    {
      id: 'tablet',
      name: 'Tablet',
      width: '768px',
      widthMedia: '992px',
      iconName: 'far fa-tablet-alt',
    },
    {
      id: 'mobilePortrait',
      name: 'Mobile portrait',
      width: '320px',
      widthMedia: '480px',
      iconName: 'far fa-mobile-alt',
    },
  ],
};
