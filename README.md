# RabbitMQ Feathers playground

Before all examples:

```
docker-compose up -d
```

## Simple Example

To run the simple example: 

*Example 1*

```
cd simple-example
yarn
node src/send
node src/receive
```

*Example 2*

```
cd simple-example
yarn
node src/receiveTask & 
node src/newTask
```

## Feathers Example

This example simulates the processing of "Tasks" in feathers apps.
The producer (server) sends events to a RabbitMQ exchange.
The consumers (clients) connect to a queue and bind that queue to the exchange.
Each client will then consume one 'task' from that queue in round-robin format.

Shell 1 (Producer):

```
cd feathers-server
yarn
yarn dev
```

Shell 2 (Consumer  1)
```
cd feathers-client
yarn
PORT=4040 yarn dev
```

Shell 3 (Consumer  2)
```
cd feathers-client
yarn
PORT=5050 yarn dev
```

Trigger events in the producer with:

```
curl --request POST \
  --url http://localhost:3030/dummy \
  --header 'content-type: application/json' \
  --data '{
	"hello": "world"
}'
``` 

Check receipt of jobs in the consumers by looking at their log outputs

View all received events (in all clients) with:

`http://localhost:4040/receiver`

or

`http://localhost:5050/receiver`

## Configuration

The magic in the feathers example happens in amqp.js. This contains the configuration
of incoming events to feathers services (TODO move to config.json) and the glue code, 
initialising the exchange and queues and connecting amqp to feathers services. 