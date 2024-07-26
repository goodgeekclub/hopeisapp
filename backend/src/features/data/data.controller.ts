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
  UseGuards,
} from '@nestjs/common';
import { DataService } from './data.service';
import { ApiTags } from '@nestjs/swagger';
import { DataInterceptor } from './data.interceptor';
import { DataType } from 'src/schemas/data.schema';
import { CreateQuizDto } from './dto/quiz/create-quiz.dto';
import { UpdateQuizDto } from './dto/quiz/update-quiz.dto';
import { CreateMissionDto } from './dto/mission/create-mission.dto';
import { UpdateMissionDto } from './dto/mission/update-mission.dto';
import { UpdateCharacterDto } from './dto/character/update-character.dto';
import { CreateCharacterDto } from './dto/character/create-character.dto';
import { Admin, AuthGuard, Public } from 'src/auth/auth.guard';

@Admin()
@UseGuards(AuthGuard)
@ApiTags('Data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Public()
  @Get()
  findAll(@Query('type') type: DataType) {
    return this.dataService.findAll(type);
  }

  @Public()
  @Get('missions|stats|quizes|characters')
  findAllByType(@Req() req) {
    const paths = req.originalUrl.split('/').filter((p: string) => !!p);
    const type: DataType = DataType[paths[1]];
    return this.dataService.findAll(type);
  }

  @Public()
  @Get(':id')
  @UseInterceptors(DataInterceptor)
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(id);
  }

  @Post('quizes')
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.dataService.create(createQuizDto);
  }

  @Patch('quizes/:id')
  updateQuiz(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.dataService.update(id, updateQuizDto);
  }

  @Post('missions')
  createMission(@Body() createMissionDto: CreateMissionDto) {
    return this.dataService.create(createMissionDto);
  }

  @Patch('missions/:id')
  updateMission(@Param('id') id: string, @Body() updateMission: UpdateMissionDto) {
    return this.dataService.update(id, updateMission);
  }

  @Post('characters')
  createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
    return this.dataService.create(createCharacterDto);
  }

  @Patch('characters/:id')
  updateCharacter(@Param('id') id: string, @Body() updateCharacter: UpdateCharacterDto) {
    return this.dataService.update(id, updateCharacter);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
