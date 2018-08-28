const Hapi = require('hapi');

async function start() {
    const server = new Hapi.Server({
        port: 3000
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