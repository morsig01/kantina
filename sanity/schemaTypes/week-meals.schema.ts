import { defineType } from "sanity";

export const weekMeals = defineType({
  name: "weekMeals",
  type: "document",
  title: "Ukemeny",
  fields: [
    {
      name: "weekNumber",
      type: "number",
      title: "Ukenummer",
    },
    {
      name: "meals",
      type: "array",
      title: "Måltider",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              type: "string",
              title: "Dag",
              options: {
                list: [
                  "Mandag",
                  "Tirsdag",
                  "Onsdag",
                  "Torsdag",
                  "Fredag",
                ],
              },
            },
            {
              name: "meal",
              type: "reference",
              title: "Måltid",
              to: [{ type: "meals" }],
            },
          ],
        },
      ],
    },
    {
      name: "specialMeal",
      type: "reference",
      title: "Ukens spesial",
      to: [{ type: "meals" }],
      options: {
        filter: 'isSpecial == true'
      }
    },
  ],
  preview: {
    select: {
      title: "weekNumber",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: `Uke ${title}`,
      };
    },
  },
});
