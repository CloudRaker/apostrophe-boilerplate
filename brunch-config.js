// See http://brunch.io for documentation.
const path = require('path');
const globby = require('globby');

const modulesRoot = path.resolve(__dirname, 'lib', 'modules');
const outputRoot = path.resolve(modulesRoot, 'apostrophe-assets', 'public');

const jsFilePattern = path.join(modulesRoot, '**', 'src', '**', '*.js');

const jsSources = globby.sync(jsFilePattern).map(x => path.relative(__dirname, x));

const jsSourceDirs = [...(new Set(jsSources.map(x => path.dirname(x))))];

const perModuleJsTargets = jsSources.reduce(
  (acc, source) => {
    const targetFile = path.relative(
      outputRoot,
      source.replace('/src/', '/public/')
    );

    acc[targetFile] = source;
    return acc;
  },
  {}
);

exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^node_modules/,
      'js/site.js': /^src/,
      ...perModuleJsTargets
    }
  },
  stylesheets: {
    joinTo: {
      'css/site.css': /^src/
    }
  }
};

exports.paths = {
  public: outputRoot,
  watched: [
    'src',
    ...jsSourceDirs
  ]
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
  path: 'brunch-server.js'
};


const logger = require('loggy');
let cachedStyleReloader;
let isSubsequentCompile = false;

function getOrCreateStyleReloader() {
  if (cachedStyleReloader) {
    return cachedStyleReloader;
  }
  const serverLoader = require('./brunch-server');
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
