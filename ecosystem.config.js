module.exports = {
  apps: [
    {
      name: '${APOS_PROJECT}',
      script: 'app.js',
      env_prod: {
        NODE_ENV: 'production',
        CONFIG_FILE: '/srv/${APOS_PROJECT}/.env',
        HOST: 'localhost'
      }
    }
  ],
  deploy: {
    production: {
      user: 'cloudraker',
      host: 'apos.raker.cloud',
      ref: 'origin/master',
      repo: 'git@github.com:CloudRaker/${APOS_PROJECT}.git',
      path: '/srv/${APOS_PROJECT}',
      'post-deploy': 'NODE_ENV=production yarn --prod && pm2 reload ecosystem.config.js --env prod;',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
