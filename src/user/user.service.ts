import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { ProducerService } from '../kafka/producer/producer.service';
import { Consumer, Kafka, EachMessagePayload } from 'kafkajs';

@Injectable()
export class UserService {
  private consumer: Consumer;

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly producerService: ProducerService,
  ) {
    this.initializeConsumers();
  }

  private async initializeConsumers() {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    });

    this.consumer = kafka.consumer({ groupId: 'user-consumer' });

    await this.consumer.connect();

    // Subscribe to the relevant topics
    await this.consumer.subscribe({ topic: 'create-user' });
    await this.consumer.subscribe({ topic: 'update-user' });
    await this.consumer.subscribe({ topic: 'delete-user' });
    await this.consumer.subscribe({ topic: 'get-all-users' });
    await this.consumer.subscribe({ topic: 'get-user' });

    // Start consuming messages
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { topic, message } = payload;
        const user = JSON.parse(message.value.toString());

        // Process the message and display user information based on the topic
        switch (topic) {
          case 'create-user':
            console.log('User created:', user);
            break;
          case 'update-user':
            console.log('User updated:', user);
            break;
          case 'delete-user':
            console.log('User deleted:', user);
            break;
          case 'get-all-users':
            console.log('All users:', user);
            break;
          case 'get-user':
            console.log('User details:', user);
            break;
          default:
            console.log('Unknown topic:', topic);
            break;
        }
      },
    });
  }

  async create(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    await this.connection.transaction(async (manager) => {
      await manager.save(user);
    });
    await this.producerService.produce({
      topic: 'create-user',
      messages: [{ value: JSON.stringify(user) }],
    });
    console.log('Creating user:', user);
    return user;
  }

  async findAll(): Promise<User[]> {
    await this.producerService.produce({
      topic: 'get-all-users',
      messages: [],
    });
    const users = await this.connection.transaction(async (manager) => {
      return manager.find(User);
    });
    console.log('All users:', users);
    return users;
  }

  async findById(id: number): Promise<User> {
    await this.producerService.produce({
      topic: 'get-user',
      messages: [{ value: JSON.stringify({ id }) }],
    });
    const user = await this.connection.transaction(async (manager) => {
      return manager.findOne(User, { where: { id } });
    });
    console.log('User details:', user);
    return user;
  }

  async update(id: number, email: string, password: string): Promise<User> {
    const updatedUser = await this.connection.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id } });
      if (!user) {
        throw new Error(`User with id ${id} not found.`);
      }
      user.email = email;
      user.password = password;
      return manager.save(user);
    });
    await this.producerService.produce({
      topic: 'update-user',
      messages: [{ value: JSON.stringify(updatedUser) }],
    });
    console.log('User updated:', updatedUser);
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.connection.transaction(async (manager) => {
      await manager.delete(User, id);
    });
    await this.producerService.produce({
      topic: 'delete-user',
      messages: [{ value: JSON.stringify({ id }) }],
    });
    console.log(`User with id ${id} deleted.`);
  }
}
