import { ApiExtraModels, ApiProperty, PartialType } from '@nestjs/swagger';
import { Data, DataType } from 'src/schemas/data.schema';
import { IsString, IsOptional } from 'class-validator';

@ApiExtraModels(Data)
export class CreateDataDto extends PartialType(Data) {
  @IsString()
  @ApiProperty({ example: 'My Name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'A description' })
  description?: string;

  @IsString()
  @ApiProperty({ example: 'STAT' })
  type: DataType;

  @IsOptional()
  @ApiProperty()
  data?: any;
}
