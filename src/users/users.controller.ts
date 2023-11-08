import { User } from './../../node_modules/.prisma/client/index.d';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() userData: { name: string; email: string },
  ): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.users();
  }

  @Patch()
  async updateUser(
    @Body('where') where: { id: number },
    @Body('data') data: { name: string; email: string },
  ): Promise<User> {
    console.log(where);
    console.log(data);
    return this.usersService.updateUser({ where, data });
  }

  @Delete()
  async deleteUser(@Body() where: { id: number }): Promise<User | null> {
    return this.usersService.deleteUser(where);
  }
}
