// import { Controller, Post, Body } from '@nestjs/common';
// import { EventBridgeService } from '../shared-events.ts/event-bridge.service'; // Import the correct path for EventBridgeService

// @Controller('rabbitmq')
// export class RabbitMQController {
//   constructor(private readonly eventBridgeService: EventBridgeService) {}

//   @Post('send-message')
//   async sendMessage(@Body() message: any): Promise<string> {
//     await this.eventBridgeService.emitToRabbitMQ('test-queue', message);
//     return 'Message sent to RabbitMQ';
//   }
// }
