import { defineType } from "sanity";

export const meals = defineType({
  name: "meals",
  type: "document",
  title: "Måltider",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Meal Name",
      description: "Navn på måltidet",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      description: "Pris på måltidet",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      description: "Bilde av måltidet",
    },
    {
      name: "allergens",
      type: "array",
      title: "Allergener",
      description: "Velg allergener i måltidet",
      of: [{
        type: "string"
      }],
      options: {
        list: [
          {title: "Hvetegluten", value: "gluten"},
          {title: "Melk", value: "milk"},
          {title: "Egg", value: "egg"},
          {title: "Soya", value: "soy"},
          {title: "Nøtter", value: "nuts"},
          {title: "Peanøtter", value: "peanuts"},
          {title: "Fisk", value: "fish"},
          {title: "Skalldyr", value: "shellfish"},
          {title: "Sennep", value: "mustard"},
          {title: "Selleri", value: "celery"},
          {title: "Sesam", value: "sesame"},
        ]
      }
    }
  ]
})