import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IProduct } from 'modules/database/interfaces/product';

export class SaveValidator implements IProduct {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public name: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public amount: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public value: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public demandId?: number;
}
