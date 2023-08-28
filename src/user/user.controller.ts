import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.userService.create(email, password);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.userService.update(id, email, password);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
