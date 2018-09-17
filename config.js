'use strict';
const path = require('path');
const envalid = require('envalid');
const { host, port, str } = envalid;

module.exports = envalid.cleanEnv(
    process.env,
    {
        ADDRESS: host({ devDefault: 'localhost', default: '0.0.0.0' }),
        PORT: port({ devDefault: 3000 }),

        APOS_SESSION_SECRET: str({ devDefault: 'CHANGEME' })
    },
    {
        dotEnvPath: path.join(__dirname, '.env'),
        strict: true
    }
);
