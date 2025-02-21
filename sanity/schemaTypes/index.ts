import { type SchemaTypeDefinition } from 'sanity'
import { meals } from './meal.schema'
import { weekendMeals } from './weekend-meals.schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [meals, weekendMeals],
}
