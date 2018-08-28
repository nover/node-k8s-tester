require('./rabbit');

const server = require('./server');

server.start()
    .then((srv) => {
        console.log('server started', srv.info);
    })
    .catch((err) => {
        console.error('error during start', err);

        throw err;
    });