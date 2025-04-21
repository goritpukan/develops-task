import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { GetRecipesDto } from './dto/get-recipes.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(@Query() query: GetRecipesDto) {
    return this.recipeService.getRecipes(query);
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(+id);
  }
}
