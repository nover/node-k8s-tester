const amqp = require('amqplib/callback_api');
const config = require('./config');


amqp.connect(`amqp://${config.RABBIT_USER}:${config.RABBIT_PASS}@${config.RABBIT_HOST}`, function (err, conn) {
    if (err) return console.error(err);
    conn.createChannel(function (err, ch) {
        if (err) return console.error(err);

        const q = 'hello';

        ch.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, Buffer.from('Hello World!'));
        console.log(" [x] Sent message");

        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });

        setTimeout(function () { conn.close(); }, 1500);
    });
});