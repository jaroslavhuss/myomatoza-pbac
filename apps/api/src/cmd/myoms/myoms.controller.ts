import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { MyomsService } from './myoms.service';
import { CreateMyomDto } from './dto/create-myom.dto';
import { CreateEndoDto } from './dto/create-endo.dto';
import { UpdateMyomDto } from './dto/update-myom.dto';

import { AllExceptionsFilter } from 'util/catch-everything.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from 'util/get-current-user.decorator';
import { IUser } from 'src/interfaces_enums';

@UseFilters(AllExceptionsFilter)
@Controller()
export class MyomsController {
  constructor(private readonly myomsService: MyomsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('myom')
  create(@Body() createMyomDto: CreateMyomDto) {
    return this.myomsService.create(createMyomDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myom')
  findAll(@GetCurrentUser() user: IUser) {
    return this.myomsService.findAll(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('myom/:id')
  update(
    @Param('id') id: string,
    @Body() updateMyomDto: UpdateMyomDto,
    @GetCurrentUser() user: IUser,
  ) {
    return this.myomsService.update(id, updateMyomDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('myom/:id')
  remove(@Param('id') id: string, @GetCurrentUser() user: IUser) {
    return this.myomsService.remove(id, user);
  }

  //Endometriosis
  @UseGuards(AuthGuard('jwt'))
  @Post('endo')
  createEndo(@Body() createMyomDto: CreateEndoDto) {
    return this.myomsService.createEndo(createMyomDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('endo')
  findAllEndo(@GetCurrentUser() user: IUser) {
    return this.myomsService.findAllEndo(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('endo/:id')
  updateEndo(
    @Param('id') id: string,
    @Body() updateMyomDto: UpdateMyomDto,
    @GetCurrentUser() user: IUser,
  ) {
    return this.myomsService.updateEndo(id, updateMyomDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('endo/:id')
  removeEndo(@Param('id') id: string, @GetCurrentUser() user: IUser) {
    return this.myomsService.removeEndo(id, user);
  }
}
