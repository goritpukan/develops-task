import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      RecipeModule,
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
