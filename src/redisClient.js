const config = require('./config');
const redis = require('redis');

let client = null;

function getConnectedClient() {
    return new Promise((resolve, reject) => {
        if (client === null) {
            client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

            client.on('connect', () => {
                console.log('Redis client connected');
                resolve(client);
            });
            client.on('error', (err) => {
                console.log('Something went wrong ' + err);
                reject(err);
            });
        }
        else {
            resolve(client);
        }
    });
}

module.exports = {
    getConnectedClient,
}