module.exports = {
  extend: 'apostrophe-widgets',
  label: '3 Column',
  skipInitialModal: true,
  addFields: [
    {
      name: 'leftContent',
      type: 'area',
      label: 'Left Column',
      contextual: true
    },
    {
      name: 'centerContent',
      type: 'area',
      label: 'Center Column',
      contextual: true
    },
    {
      name: 'rightContent',
      type: 'area',
      label: 'Right Column',
      contextual: true
    },
    {
      name: 'textAlignment',
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
      name: 'verticalAlignment',
      type: 'select',
      label: 'Vertical Alignment',
      help: 'Choose the vertical alignment of the two columns.',
      required: false,
      choices: [
        {
          label: 'Top (Default)',
          value: ''
        },
        {
          label: 'Center',
          value: 'd-flex align-items-center'
        }
      ]
    }
  ]
};
