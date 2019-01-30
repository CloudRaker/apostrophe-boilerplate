'use strict';
const path = require('path');
const envalid = require('envalid');
const { str, host, port } = envalid;

const config = envalid.cleanEnv(
  process.env,
  {
    ADDRESS: host({ devDefault: 'localhost', default: '0.0.0.0' }),
    PORT: port({ devDefault: 3000 }),

    SENDGRID_API_KEY: str({ devDefault: '' }),
    SENDGRID_NEWSLETTER_LIST_ID: str({ devDefault: '' }),

    SESSION_SECRET: str({ devDefault: 'CHANGEME' }),

    APOS_MONGODB_URI: str({ devDefault: '' }),
    APOS_S3_BUCKET: str({ devDefault: '' }),
    APOS_S3_KEY: str({ devDefault: '' }),
    APOS_S3_REGION: str({ devDefault: '' }),
    APOS_S3_SECRET: str({ devDefault: '' }),

    REDISCLOUD_URL: str({ devDefault: '' })
  },
  {
    dotEnvPath: path.join(__dirname, '.env'),
    strict: true
  }
);

module.exports = config;

Object.assign(process.env, config);
