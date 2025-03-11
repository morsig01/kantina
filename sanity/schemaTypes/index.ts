import { type SchemaTypeDefinition } from "sanity";
import { meals } from "./meal.schema";
import { weekMeals } from "./week-meals.schema";
import { vare } from "./varer.schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [meals, weekMeals, vare],
};
