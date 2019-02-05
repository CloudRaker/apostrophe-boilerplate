const _ = require('lodash');
const config = require('../../../config');

module.exports = {
  session: {
    // If this still says `undefined`, set a real secret!
    secret: config.SESSION_SECRET,
    store: {
      name: 'connect-redis',
      options: {
        url: config.REDISCLOUD_URL
      }
    }
  }
};
