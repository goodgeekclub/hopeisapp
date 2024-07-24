import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Data, DataType } from 'src/schemas/data.schema';
import {
  ValidateNested,
  IsObject,
  Equals,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDataDto } from '../create-data.dto';
import { Character } from 'src/models/character.model';

@ApiExtraModels(Data)
export class CreateCharacterDto  extends CreateDataDto {
  @Equals('CHARACTER')
  @ApiProperty({ example: 'CHARACTER' })
  type: DataType.characters;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Character)
  data: Character;
}
