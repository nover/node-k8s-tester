const nconf = require('nconf');

const config = nconf
    .argv()
    .env()
    .defaults({
        REDIS_PORT: 6379,
        REDIS_HOST: '127.0.0.1',
        'API_PORT': 3000
    });


module.exports = {
    REDIS_HOST: config.get('REDIS_HOST'),
    REDIS_PORT: config.get('REDIS_PORT'),
    API_PORT: config.get('API_PORT'),
};