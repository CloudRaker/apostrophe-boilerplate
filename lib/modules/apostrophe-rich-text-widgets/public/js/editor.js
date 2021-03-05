apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function (self, options) {

    self.beforeCkeditorInline = function () {
      self.config.extraPlugins = 'list,indent,indentlist,panelbutton,colorbutton,justify,table';

      // Limit to brand colors
      self.config.colorButton_colors = '000000,FFFFFF';
      self.config.colorButton_enableAuto = false;
      self.config.colorButton_enableMore = false;

      // Allow super/sub script which are disabled by default.
      self.config.removeButtons = '';
      self.config.removePlugins = 'tabletools,contextmenu';
    };
  }
});
