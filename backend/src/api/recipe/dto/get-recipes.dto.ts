import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetRecipesDto {
  @Expose({ name: 'ingredient' })
  @IsOptional()
  @IsString()
  i?: string;

  @Expose({ name: 'country' })
  @IsOptional()
  @IsString()
  a?: string;

  @Expose({ name: 'category' })
  @IsOptional()
  @IsString()
  c?: string;
}
