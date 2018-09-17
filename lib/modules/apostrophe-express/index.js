const config = require('../../../config');

module.exports = {
    session: {
        secret: config['APOS_SESSION_SECRET']
    },
    address: config['ADDRESS'],
    port: config['PORT']
};
