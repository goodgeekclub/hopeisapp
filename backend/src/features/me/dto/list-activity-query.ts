import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ActivityStatus } from 'src/schemas/profile-activity.schema';

export class ListActivityQuery {
  @ApiProperty()
  @IsOptional()
  @IsEnum(ActivityStatus)
  status?: ActivityStatus;
}
