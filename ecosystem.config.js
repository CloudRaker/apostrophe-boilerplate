const projectName = require('./package.json').name;

const deployPath = `/srv/${projectName}`;

module.exports = {
  apps: [
    {
      name: projectName,
      script: 'app.js',
      env_prod: {
        NODE_ENV: 'production',
        CONFIG_FILE: `${deployPath}/shared/.env`,
        HOST: 'localhost'
      }
    }
  ],
  deploy: {
    production: {
      user: 'cloudraker',
      host: 'apos.raker.cloud',
      ref: 'origin/master',
      repo: `git@github.com:CloudRaker/${projectName}.git`,
      path: deployPath,
      'post-deploy': 'NODE_ENV=production yarn --prod && pm2 reload ecosystem.config.js --env prod;',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
