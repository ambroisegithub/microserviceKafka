// import { Injectable } from '@nestjs/common';
// import { ProducerService } from '../kafka/producer/producer.service';
// import { RabbitMQService } from '../rabbitMQ/rabbitmq.service';

// @Injectable()
// export class EventBridgeService {
//   constructor(
//     private readonly kafkaService: ProducerService,
//     private readonly rabbitMQService: RabbitMQService,
//   ) {}

//   async emitToKafka(topic: string, message: any): Promise<void> {
//     const record = {
//       topic,
//       messages: [{ value: JSON.stringify(message) }],
//     };
//     await this.kafkaService.produce(record);
//   }

//   async emitToRabbitMQ(queue: string, message: any): Promise<void> {
//     await this.rabbitMQService.sendMessage(queue, message);
//   }
// }
