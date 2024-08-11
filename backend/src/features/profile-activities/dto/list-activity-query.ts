import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ActivityStatus } from 'src/schemas/profile-activity.schema';

export class ListActivityQuery {
  @ApiProperty({ required: false, example: ActivityStatus.PENDING })
  @IsOptional()
  // @IsEnum(ActivityStatus)
  status?: string;

  @ApiProperty({ required: false, example: '2024-08-10' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
