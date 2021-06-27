const aliases = (prefix = 'src') => ({
  actions: `${prefix}/actions`,
  images: `${prefix}/images`,
  javascripts: `${prefix}/javascripts`,
  pages: `${prefix}/pages`,
  reducers: `${prefix}/reducers`,
  store: `${prefix}/store`,
  styles: `${prefix}/styles`,
  'shared-components': `${prefix}/pages/shared-components`,
  'shared-containers': `${prefix}/pages/shared-containers`,
});

module.exports = aliases;
