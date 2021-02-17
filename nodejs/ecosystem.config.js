module.exports = {
  apps : [{
    name: 'webhooks',
    script: 'node server.js',
    env: {
        'NODE_ENV': 'development',
        WEBHOOK_PORT: 3000,
    },
    'env_production': {
        'NODE_ENV': 'production',
        WEBHOOK_PORT: 5050,
    },
    'max_restarts': 3,
    'restart_delay': 4000,
    time: true,
    'exp_backoff_restart_delay': 100
  }],
};
