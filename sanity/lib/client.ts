import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const fetchWeeks = async (): Promise<number[]> => {
  const query = `*[_type in ["weekMeals", "weekendMeals"]]{weekNumber}`;
  const weeksData = await client.fetch(query);
  return weeksData.map((week: { weekNumber: number }) => week.weekNumber);
};

export const fetchWeekContent = async (week: number) => {
  const query = `{
    "weekMeals": *[_type == "weekMeals" && weekNumber == ${week}][0],
    "weekendMeals": *[_type == "weekendMeals" && weekNumber == ${week}][0]
  }`;
  return await client.fetch(query);
};
