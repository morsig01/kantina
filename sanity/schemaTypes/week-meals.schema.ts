import { defineType } from "sanity";

export const weekMeals = defineType({
  name: "weekMeals",
  type: "document",
  title: "Ukens måltider",
  fields: [
    {
      name: "weekNumber",
      type: "number",
      title: "Week Number",
      description: "Ukenummeret",
    },
    {
      name: "meals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              type: "string",
              title: "Dag",
                description: "Dag i uken",
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
              to: [{ type: "meals" }],
            },
          ],
        },
      ],
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
