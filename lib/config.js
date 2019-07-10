'use strict';
const path = require('path');
const envalid = require('envalid');
const { str, host, port } = envalid;

const dotEnvPath = process.env['CONFIG_FILE'] || path.join(path.dirname(require.main.filename), '.env');

const config = envalid.cleanEnv(
  process.env,
  {
    ADDRESS: host({ devDefault: 'localhost', default: '0.0.0.0' }),
    PORT: port({ devDefault: 3000 }),

    SESSION_SECRET: str({ devDefault: 'CHANGEME' }),

    APOS_MONGODB_URI: str({ devDefault: '' }),
    APOS_S3_BUCKET: str({ devDefault: '' }),
    APOS_S3_KEY: str({ devDefault: '' }),
    APOS_S3_REGION: str({ devDefault: '' }),
    APOS_S3_SECRET: str({ devDefault: '' }),

    REDISCLOUD_URL: str({ default: '' })
  },
  {
    dotEnvPath: dotEnvPath,
    strict: true
  }
);

module.exports = config;

// 3rd party libs will read process.env, not this file.
// Make sure the loaded env vars are also included in process.env
Object.assign(process.env, config);
