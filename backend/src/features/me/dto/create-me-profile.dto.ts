import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsMongoId } from 'class-validator';

export class CreateMeProfileDto {
  @IsEmpty()
  @ApiProperty({ description: 'Forbidden to override firebaseId' })
  firebaseId?: string;

  @IsMongoId()
  @ApiProperty()
  quizResultId: string;
}
