import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ActivityStatus } from 'src/schemas/profile-activity.schema';

export class ListActivityQuery {
  @ApiProperty({ required: false, example: ActivityStatus.PENDING })
  @IsOptional()
  @IsEnum(ActivityStatus)
  status?: ActivityStatus;
}
