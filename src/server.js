const Hapi = require('hapi');
const config = require('./config');
const redis = require('./redisClient');

async function start() {
    const server = new Hapi.Server({
        port: config.API_PORT
    });

    server.route({
        method: 'get',
        path: '/redis/{key}',
        handler: async (req, h) => {
            const client = await redis.getConnectedClient();

            const value = await new Promise((resolve, reject) => {
                client.get(req.params.key, (err, val) => {
                    if (err) return reject(err);

                    resolve(val);
                });
            });

            return {
                [req.params.key]: value
            };
        }
    });
    server.route({
        method: 'POST',
        path: '/redis/',
        handler: async (req, h) => {
            const client = await redis.getConnectedClient();
            await client.set(req.payload.key, req.payload.value);

            return {
                [req.payload.key]: req.payload.value,
            };
        }
    });

    server.route({
        method: '*',
        path: '/{path*}',
        handler: (req, h) => {
            return {
                itis: 'alive'
            };
        }
    });

    await server.start();
    return server;
}

module.exports = {
    start,
}