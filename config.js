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

    APOS_MONGODB_URI: str({ devDefault: undefined }),
    APOS_S3_BUCKET: str({ devDefault: undefined }),
    APOS_S3_KEY: str({ devDefault: undefined }),
    APOS_S3_REGION: str({ devDefault: undefined }),
    APOS_S3_SECRET: str({ devDefault: undefined })
  },
  {
    dotEnvPath: path.join(__dirname, '.env'),
    strict: false
  }
);

module.exports = config;

Object.assign(envTarget, config);
