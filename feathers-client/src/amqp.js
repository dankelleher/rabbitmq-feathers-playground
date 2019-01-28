const amqp = require('amqplib');

const ex = 'dummy-server';

const config = {
  url: 'amqp://localhost',
  streams: [
    {
      exchange: {
        name: 'dummy-server',
        type: 'fanout',
        durable: false
      },
      queue: {
        name: 'my-task-queue',
        action: {
          service: 'receiver',
          method: 'create'
        }
      }
    }
  ]
};

async function configure(app) {
  function consume(message, service, method) {
    const content = JSON.parse(message.content);
    console.log(" [x] %s: ", JSON.stringify(content.data));

    app.service(service)[method](content.data);
  }

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  config.streams.forEach(async stream => {
    channel.assertExchange(stream.exchange.name, 'fanout', {durable: stream.exchange.durable});

    const queue = await channel.assertQueue(stream.queue.name, {exclusive: false});

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'my-task-queue');
    channel.bindQueue(queue.queue, ex);

    channel.consume(queue.queue, message => consume(message, stream.queue.action.service, stream.queue.action.method), {noAck: true});
  });
}

module.exports = configure;
