module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Embedded Video',
  addFields: [
    {
      name: 'video',
      type: 'singleton',
      widgetType: 'apostrophe-video',
      required: true
    }
  ]
};
