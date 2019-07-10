const config = require('../../config');

module.exports = {
  address: config['ADDRESS'],
  port: config['PORT'],
  csrf: {
    disableAnonSession: true
  },
  session: {
    secret: config['SESSION_SECRET'],
    ...determineSessionStorage()
  }
};

function determineSessionStorage() {
  const redisUrl = config['REDISCLOUD_URL'];

  if (!redisUrl) {
    return {};
  }

  return {
    store: {
      name: 'connect-redis',
      options: {
        url: redisUrl
      }
    }
  };
}
