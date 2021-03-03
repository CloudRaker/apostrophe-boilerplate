module.exports = {
  extend: 'apostrophe-widgets',
  label: '1 Column',
  arrangeFields: [
    {
      name: 'general',
      label: 'General',
      fields: ['alignment', 'noGutters', 'topPadding']
    }
  ],
  addFields: [
    {
      name: 'column',
      type: 'area',
      label: 'Column',
      contextual: true,
      options: {}
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Content Alignment',
      help: 'Choose the horizontal alignment of the content within the column.',
      required: false,
      choices: [
        {
          label: 'Left (Default)',
          value: ''
        },
        {
          label: 'Center',
          value: 'd-flex justify-content-center text-center'
        }
      ]
    },
    {
      name: 'topPadding',
      type: 'boolean',
      label: 'Top Padding',
      help: 'Include white space on top of the content?',
      def: true
    },
    {
      name: 'noGutters',
      type: 'boolean',
      label: 'Full width',
      help: 'Make content span the full width of the screen?',
      def: false
    }
  ]
};
