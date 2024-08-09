import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { CreateProfileActivityDto } from 'src/features/profile-activities/dto/create-profile-activity.dto';

export class UpdateMeActivityDto extends PartialType(CreateProfileActivityDto) {
  @ApiProperty({ required: false })
  @IsEmpty()
  mission?: any;

  @ApiProperty({ required: false })
  @IsEmpty()
  character: any;
}
