module.exports = {
     apps: [ { 
        name: 'aplpacino REST API',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: { NODE_ENV: 'production' },
        env_production: { NODE_ENV: 'production' } 
    } ] };