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
import { UpdateMyomDto } from './dto/update-myom.dto';
import { AllExceptionsFilter } from 'util/catch-everything.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from 'util/get-current-user.decorator';
import { IUser } from 'src/interfaces_enums';

@UseFilters(AllExceptionsFilter)
@Controller('myom')
export class MyomsController {
  constructor(private readonly myomsService: MyomsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMyomDto: CreateMyomDto) {
    return this.myomsService.create(createMyomDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@GetCurrentUser() user: IUser) {
    return this.myomsService.findAll(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMyomDto: UpdateMyomDto,
    @GetCurrentUser() user: IUser,
  ) {
    return this.myomsService.update(id, updateMyomDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUser() user: IUser) {
    return this.myomsService.remove(id, user);
  }
}
