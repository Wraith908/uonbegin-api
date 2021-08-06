import { BadRequestException, Body, Controller, ClassSerializerInterceptor, Delete,
         Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get()
  async all(@Query('page') page: number = 1) {
    return await this.userService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234',12);

    const {role_id, ...data} = body;

    return this.userService.create({
      ...data,
      password,
      role: {id: role_id}
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({id}, ['role']);
  }

  @Put('info')
  async updateInfo(
    @Req() request: Request,
    @Body() body: UserUpdateDto
  ) {
    const id = await this.authService.userId(request);

    await this.userService.update(id, body);

    return this.userService.findOne({id});
  }

  //This is gonna need some extra work to get to
  @Put('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }
    const id = await this.authService.userId(request);

    const hashed = await bcrypt.hash(password,12);

    await this.userService.update(id, {
      password: hashed
    });

    return this.userService.findOne({id});
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto
  ) {

    const {role_id, ...data} = body;

    await this.userService.update(id,{
      ...data,
      role: {id: role_id}
    });

    return this.userService.findOne({id});
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

}
