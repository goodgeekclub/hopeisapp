import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { UpdateProfileDto } from 'src/features/profiles/dto/update-profile.dto';

export class UpdateMeProfileDto extends UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsEmpty()
  firebaseId?: string;
}
