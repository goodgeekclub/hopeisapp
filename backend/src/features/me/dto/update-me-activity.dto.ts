import { PartialType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { CreateProfileActivityDto } from 'src/features/profile-activities/dto/create-profile-activity.dto';

export class UpdateMeActivityDto extends PartialType(CreateProfileActivityDto) {
  // @IsEmpty()
  // profile?: any;

  @IsEmpty()
  mission?: any;

  @IsEmpty()
  character: any;
}
