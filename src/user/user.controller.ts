import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Uids } from 'src/decorator/uids.decorator';

import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { SuperUserGuard } from 'src/guards/super-user.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  //http://localhost:3000/user/:id
  @UseGuards(AuthGuard, SuperUserGuard)
  @Uids(1)
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>): Promise<User> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.service.delete(id);
  }
}
