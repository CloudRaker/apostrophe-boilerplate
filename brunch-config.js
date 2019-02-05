// See http://brunch.io for documentation.

exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^(?!src)/,
      'js/site.js': /^src/
    }
  },
  stylesheets: { joinTo: { 'css/site.css': /^src/ } }
};

exports.paths = {
  public: 'lib/modules/apostrophe-assets/public',
  watched: ['src']
};

exports.plugins = {
  babel: {
    'presets': [
      ['@babel/preset-env', { 'useBuiltIns': 'entry' }]
    ]
  },
  sass: {
    precision: 8
  }
};

exports.modules = {
  autoRequire: {
    'js/site.js': ['src/js/initialize.js']
  }
};

exports.server = {
  path: 'index.js'
};


const logger = require('loggy');
let cachedStyleReloader;
let isSubsequentCompile = false;

function getOrCreateStyleReloader() {
  if (cachedStyleReloader) {
    return cachedStyleReloader;
  }
  const serverLoader = require('./index');
  const aposRoot = serverLoader.aposRoot;
  if (aposRoot) {
    const aposAssets = aposRoot.modules['apostrophe-assets'];

    return cachedStyleReloader = require('util').promisify(
      cb => {
        aposAssets.generation = `CR_DEV_${ Date.now() }`;
        return aposAssets.buildLessMasters(cb);
      }
    );
  }
  return () => Promise.resolve();
}

exports.hooks = {
  onCompile(generatedFiles, changedAssets) {
    if (isSubsequentCompile && generatedFiles.some(f => f.path.endsWith('.css'))) {
      logger.info('Reloading styles...');
      const styleReloader = getOrCreateStyleReloader();
      return styleReloader();
    } else {
      isSubsequentCompile = true;
      return Promise.resolve();
    }
  }
};
