import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsMongoId } from 'class-validator';

export class CreateMeProfileDto {
  @IsEmpty()
  @ApiProperty({
    required: false,
    description: 'Forbidden to override firebaseId',
  })
  firebaseId?: string;

  @IsMongoId()
  @ApiProperty({ example: 'abcde' })
  quizResultId: string;
}
