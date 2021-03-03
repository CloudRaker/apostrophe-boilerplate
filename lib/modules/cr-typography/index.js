const toolbarOptions = ['Styles', 'Link', 'Unlink', 'Anchor', 'Bold', 'Underline', 'BulletedList', 'Superscript', 'TextColor', 'JustifyLeft', 'JustifyCenter', 'Table'];
const standardOptions = {
  controls: {position: 'bottom-right'},
  toolbar: toolbarOptions,
  styles: [
    {name: 'Title (h1)', element: 'h1', attributes: {'class': 'title'}},
    {name: 'Subtitle (h2)', element: 'h2', attributes: {'class': 'subtitle'}},
    {name: 'Small Subtitle (h3)', element: 'h3', attributes: {'class': 'small-subtitle'}},
    {name: 'Body Text (p)', element: 'p', attributes: {'class': 'paragraph'}},
    {name: 'Bulleted List', element: 'ul', attributes: {'class': 'bulleted-list'}}
  ]
};

module.exports = {
  extend: 'apostrophe-module',
  alias: 'typo',
  label: 'Typography',
  toolbarOptions,
  standardOptions,
  construct: function (self, options) {
    self.addHelpers({
      standard: standardOptions
    });
  }
};
