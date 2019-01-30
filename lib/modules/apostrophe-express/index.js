const _ = require('lodash');
const config = require('../../../config');

const reqProtocol = (config.isProduction ? 'https' : 'http') + '://';

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
  },
  construct(self, options) {
    self.addAbsoluteUrlsToReq = function (req) {
      req.baseUrl = (self.apos.baseUrl || self.options.baseUrl || (reqProtocol + req.get('Host')));
      req.baseUrlWithPrefix = req.baseUrl + self.apos.prefix;
      req.absoluteUrl = req.baseUrlWithPrefix + req.url;
      _.defaults(req.data, _.pick(req, 'baseUrl', 'baseUrlWithPrefix', 'absoluteUrl'));
    };
  }
};
