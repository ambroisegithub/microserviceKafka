// import { Injectable } from '@nestjs/common';
// import { AmqpConnection } from '@nestjs-plus/rabbitmq';

// @Injectable()
// export class RabbitMQService {
//   constructor(private readonly amqpConnection: AmqpConnection) {}

//   async sendMessage(queue: string, message: any): Promise<void> {
//     const exchange = ''; // Provide the appropriate exchange if needed
//     const routingKey = queue; // Use the queue as the routing key
//     const content = JSON.stringify(message);
//     const options = { persistent: true }; // Customize options as needed

//     await this.amqpConnection.publish(exchange, routingKey, content, options);
//   }
// }
