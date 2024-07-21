import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { ApiTags } from '@nestjs/swagger';
import { DataInterceptor } from './data.interceptor';
import { DataType } from 'src/schemas/data.schema';
import { CreateQuizDto } from './dto/quiz/create-quiz.dto';
import { UpdateQuizDto } from './dto/quiz/update-quiz.dto';

@ApiTags('Data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  // @Post()
  // create(@Body() createDataDto: CreateDataDto) {
  //   return this.dataService.create(createDataDto);
  // }

  @Get()
  findAll(@Query('type') type: DataType) {
    return this.dataService.findAll(type);
  }

  @Get('missions|stats|quizes')
  findAllByType(@Req() req) {
    const paths = req.originalUrl.split('/').filter((p: string) => !!p);
    const type: DataType = DataType[paths[1]];
    return this.dataService.findAll(type);
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(id);
  }

  @Post('quizes')
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.dataService.create(createQuizDto);
  }

  @Patch('quizes/:id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.dataService.update(id, updateQuizDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
  //   return this.dataService.update(id, updateDataDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
