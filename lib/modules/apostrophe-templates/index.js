const path = require('path');

const appDir = path.dirname(require.main.filename);

module.exports = {
  // If a template is not found somewhere else, serve it from the top-level
  // `views/` folder of the project
  viewsFolderFallback: path.join(appDir, 'views')
};
