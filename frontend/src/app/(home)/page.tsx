import { Suspense } from "react";
import RecipeListClient from "@/components/recipe-list-client/RecipeListClient";

export default function Page() {
  return (
    <Suspense>
      <RecipeListClient />
    </Suspense>
  );
}
