const config = require('../../../config');

/**
 * Options are passed to https://www.npmjs.com/package/i18n
 */
module.exports = {
  beforeConstruct: function (self, options) {
    options.locales = ['en', 'fr'];
    options.defaultLocale = 'en';
    options.updateFiles = false;
    options.objectNotation = '|';
    options.autoReload = !config.isProd;
    options.cookie = null;
  }
};
