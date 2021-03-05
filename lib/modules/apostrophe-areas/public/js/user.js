'use strict';

apos.define('apostrophe-areas', {
  construct: function (self, options) {
    var superEnableCkeditor = self.enableCkeditor;
    self.enableCkeditor = function () {
      superEnableCkeditor();

      const pluginRoot = '/modules/my-apostrophe-areas/js/ckeditorPlugins/';
      const pluginList = [
                          'list','indent','indentlist',
                          'panelbutton','colorbutton',
                          'justify',
                          'table',
                        ];

      pluginList.forEach(function addPlugin(plugin) {
        CKEDITOR.plugins.addExternal(plugin, pluginRoot + plugin + '/', 'plugin.js');
      });

      CKEDITOR.config.coreStyles_bold = {
        element: 'b',
        overrides: 'strong'
      };

      CKEDITOR.config.coreStyles_bold = {
        element: 'span',
        attributes: {'class': 'text-bold'}
      };

      CKEDITOR.config.coreStyles_italic = {
        element: 'i',
        overrides: 'em'
      };
    };
  }
});
