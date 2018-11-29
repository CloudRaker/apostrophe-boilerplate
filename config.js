'use strict';
const path = require('path');
const { cleanEnv, host, port, str } = require('envalid');

const envTarget = process.env;

const config = cleanEnv(
  envTarget,
  {
    ADDRESS: host({ devDefault: 'localhost', default: '0.0.0.0' }),
    PORT: port({ devDefault: 3000 }),

    APOS_SESSION_SECRET: str({ devDefault: 'CHANGEME' }),

    APOS_MONGODB_URI: str({ devDefault: '' }),
    APOS_S3_BUCKET: str({ default: '' }),
    APOS_S3_KEY: str({ default: '' }),
    APOS_S3_REGION: str({ default: '' }),
    APOS_S3_SECRET: str({ default: '' })
  },
  {
    dotEnvPath: process.env['CONFIG_FILE'] || path.join(__dirname, '.env'),
    strict: false
  }
);

module.exports = config;

Object.assign(envTarget, config);
