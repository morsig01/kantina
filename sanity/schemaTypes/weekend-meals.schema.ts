import { defineType } from "sanity";

export const weekendMeals = defineType({
  name: "weekendMeals",
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
              title: "Day",
              description: "Dag i uken",
              options: {
                list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
