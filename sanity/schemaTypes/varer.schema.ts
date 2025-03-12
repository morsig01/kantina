// ./schemas/vare.ts
import { defineField, defineType } from "sanity";

export const varer = defineType({
  name: "varer",
  title: "Varer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Frukt", value: "frukt" },
          { title: "Drikke", value: "drikke" },
          { title: "Is", value: "is" },
          { title: "Salat", value: "salat" },
          { title: "Annet", value: "annet" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Pris",
      type: "number",
      validation: (Rule) => Rule.min(0).required(),
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "favorite",
      title: "Favoritt",
      type: "boolean",
    }),
  ],
});