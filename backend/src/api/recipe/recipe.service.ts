import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GetRecipesDto } from './dto/get-recipes.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecipeService {
  private readonly baseRecipeUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const url = this.configService.get<string>('RECIPE_BASE_URL');
    if (!url) {
      throw new Error('Missing RECIPE_BASE_URL in configuration');
    }
    this.baseRecipeUrl = url;
  }

  async getRecipes(query: GetRecipesDto) {
    try {
      const isEmpty = Object.values(query).every(
        (value) => value === undefined,
      );
      const endpoint = isEmpty ? 'search.php?s=' : 'filter.php';
      const url = `${this.baseRecipeUrl}${endpoint}`;
      const response = await lastValueFrom(
        this.httpService.get(url, {
          params: query,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch recipes');
    }
  }

  async getRecipeById(id: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseRecipeUrl}/lookup.php?i=${id}`),
      );
      if (!response.data?.meals || response.data.meals.length === 0) {
        throw new NotFoundException(`Recipe with ID ${id} not found`);
      }
      return response.data.meals[0];
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch recipes');
    }
  }
}
