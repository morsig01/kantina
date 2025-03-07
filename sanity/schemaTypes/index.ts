import { type SchemaTypeDefinition } from 'sanity'
import { meals } from './meal.schema'
import { weekMeals } from './week-meals.schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [meals, weekMeals],
}
