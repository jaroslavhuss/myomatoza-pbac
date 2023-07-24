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

@UseFilters(AllExceptionsFilter)
@Controller('myom')
export class MyomsController {
  constructor(private readonly myomsService: MyomsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMyomDto: CreateMyomDto) {
    return this.myomsService.create(createMyomDto);
  }

  @Get()
  findAll() {
    return this.myomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyomDto: UpdateMyomDto) {
    return this.myomsService.update(+id, updateMyomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myomsService.remove(+id);
  }
}
