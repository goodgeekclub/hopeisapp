import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsMongoId, IsSemVer } from 'class-validator';

export class CreateMeProfileDto {
  @IsEmpty()
  @ApiProperty({ description: 'Forbidden to override firebaseId'})
  firebaseId?: string;

  @IsMongoId()
  @ApiProperty()
  profileId: string;
}
