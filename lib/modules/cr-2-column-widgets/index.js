module.exports = {
  extend: 'apostrophe-widgets',
  label: '2 Column',
  arrangeFields: [
    {
      name: 'general',
      label: 'General',
      fields: ['topPadding', 'noGutters']
    },
    {
      name: 'alignment',
      label: 'Alignment',
      fields: ['alignment', 'verticalAlignment']
    }
  ],
  addFields: [
    {
      name: 'leftContent',
      type: 'area',
      label: 'Left Column',
      contextual: true
    },
    {
      name: 'rightContent',
      type: 'area',
      label: 'Right Column',
      contextual: true
    },
    {
      name: 'verticalAlignment',
      type: 'select',
      label: 'Vertical Alignment',
      help: 'Choose the vertical alignment of the two columns.',
      required: false,
      choices: [
        {
          label: 'Top (Default)',
          value: 'unset'
        },
        {
          label: 'Center',
          value: 'center'
        }
      ]
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
          value: 'text-center'
        }
      ]
    },
    {
      name: 'noGutters',
      type: 'boolean',
      label: 'Full width',
      help: 'Make content span the full width of the screen?',
      required: false,
      def: false
    },
    {
      name: 'topPadding',
      type: 'boolean',
      label: 'Top Padding',
      help: 'Include white space on top of the content?',
      def: true
    }
  ]
};
