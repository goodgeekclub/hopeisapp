import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { ApiTags } from '@nestjs/swagger';
import { DataInterceptor } from './data.interceptor';

@ApiTags('Data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(@Body() createDataDto: CreateDataDto) {
    return this.dataService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
    return this.dataService.update(id, updateDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
