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
  ],
});
