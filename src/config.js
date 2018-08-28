const nconf = require('nconf');

const config = nconf
    .argv()
    .env()
    .defaults({
        REDIS_PORT: 6379,
        REDIS_HOST: '127.0.0.1',
        API_PORT: 3000,
        RABBIT_HOST: '127.0.0.1',
        RABBIT_USER: 'rabbit',
        RABBIT_PASS: '1234rabbitpass'
    });


module.exports = {
    REDIS_HOST: config.get('REDIS_HOST'),
    REDIS_PORT: config.get('REDIS_PORT'),
    API_PORT: config.get('API_PORT'),
    RABBIT_HOST: config.get('RABBIT_HOST'),
    RABBIT_USER: config.get('RABBIT_USER'),
    RABBIT_PASS: config.get('RABBIT_PASS'),
};