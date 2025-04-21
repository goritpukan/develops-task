import { IsOptional, IsString } from 'class-validator';

export class GetRecipesDto {
  @IsOptional()
  @IsString()
  i?: string;

  @IsOptional()
  @IsString()
  a?: string;

  @IsOptional()
  @IsString()
  c?: string;
}
