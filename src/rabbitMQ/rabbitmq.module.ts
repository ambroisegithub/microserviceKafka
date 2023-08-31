// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { RabbitMQService } from './rabbitmq.service';
// import { RabbitMQController } from './rabbitmq.controller';
// import { RabbitMQEntity } from './rabbitmq.entity'; // Import your RabbitMQ entity
// import { AmqpConnection } from '@nestjs-plus/rabbitmq';
// import { EventBridgeService } from '../shared-events.ts/event-bridge.service';
// import { ProducerService } from '../kafka/producer/producer.service';
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mongodb',
//       url: 'mongodb+srv://muhayimana21:TzMxGpuOBTtlY7l9@cluster0.rrx4dxi.mongodb.net/test?retryWrites=true&w=majority', // Your MongoDB URL
//       entities: [RabbitMQEntity], // Add your RabbitMQ entity here
//       synchronize: true, // This is just for development, set to false in production
//     }),
//   ],
//   controllers: [RabbitMQController],
//   providers: [
//     RabbitMQService,
//     AmqpConnection,
//     EventBridgeService,
//     ProducerService,
//   ],
// })
// export class RabbitMQModule {}
