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
          {title: "Melk", value: "melk"},
          {title: "Egg", value: "egg"},
          {title: "Soya", value: "soya"},
          {title: "Nøtter", value: "nætter"},
          {title: "Peanøtter", value: "peanøtter"},
          {title: "Fisk", value: "fisk"},
          {title: "Skalldyr", value: "skalldyr"},
          {title: "Sennep", value: "sennep"},
          {title: "Selleri", value: "selleri"},
          {title: "Sesam", value: "sesam"},
        ]
      }
    }
  ]
})