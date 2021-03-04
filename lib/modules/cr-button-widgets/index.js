module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Button',
  alias: 'buttons',
  construct(self, options) {
    self.addHelpers({
      propsForButton(button) {
        if (button && button.buttonType === 'fileLink' && button._file) {
          const file = button._file;
          const attachment = file.attachment;

          return attachment.extension === 'pdf'
            ? 'target="_blank"'
            : `download="${ file.title }.${ attachment.extension }"`;
        }

        return '';
      }
    });
  },
  addFields: [
    {
      name: 'text',
      type: 'string',
      label: 'Text',
      help: 'Enter the text that will appear on the button',
      required: true
    },
    {
      name: 'buttonType',
      type: 'select',
      label: 'Type',
      help: 'Select a button type below',
      choices: [
        {
          label: 'File Link',
          value: 'fileLink',
          showFields: ['_file']
        },
        {
          label: 'Page Link',
          value: 'pageLink',
          showFields: ['_page']
        },
        {
          label: 'External Link',
          value: 'externalLink',
          showFields: ['externalLink']
        }
      ]
    },
    {
      name: 'externalLink',
      type: 'url',
      label: 'External Link',
      help: 'Links to another site',
    },
    {
      name: '_page',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      label: 'Page Link',
      help: 'Links to another page on the site',
      idField: 'pageId',
      filters: {
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          tags: 1
        }
      }
    },
    {
      name: '_file',
      type: 'joinByOne',
      withType: 'apostrophe-file',
      label: 'File Link',
      help: 'Links to a document uploaded on the CMS',
      idField: 'docId',
      filters: {
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          tags: 1,
          attachment: 1
        }
      }
    },
    {
      name: 'arrow',
      type: 'boolean',
      label: 'Show arrow',
      def: true
    }
  ]
};
