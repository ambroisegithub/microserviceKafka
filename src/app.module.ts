import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from './kafka/kafka.module';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity'; // Import the User entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'microservicekafka',
      port: parseInt(process.env.DB_PORT, 10),
      entities: [User], // Use the imported User entity here
      synchronize: true,
    }),
    KafkaModule,
    EmployeeModule,
    UserModule,
  ],
})
export class AppModule {}
