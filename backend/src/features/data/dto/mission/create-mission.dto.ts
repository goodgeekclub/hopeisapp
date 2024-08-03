import { Type } from 'class-transformer';
import { CreateDataDto } from '../create-data.dto';
import { Mission } from 'src/models/mission.model';
import { Equals, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DataType } from 'src/schemas';

export class CreateMissionDto extends CreateDataDto {
  @Equals('MISSION')
  @ApiProperty({ example: 'MISSION' })
  type: DataType.missions;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Mission)
  data: Mission;
}
