import { PartialType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { UpdateProfileDto } from 'src/features/profiles/dto/update-profile.dto';

export class UpdateMeProfileDto extends PartialType(UpdateProfileDto) {
  @IsEmpty()
  firebaseId?: string;
}
