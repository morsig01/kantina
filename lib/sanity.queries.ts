import { groq } from "next-sanity";

export const getAllWeeksQuery = groq`
  *[_type == "weekMeals"] | order(weekNumber asc) {
    weekNumber
  }
`;

export const getWeeklyMealsQuery = groq`
  *[_type == "weekMeals" && weekNumber == $weekNumber][0] {
    weekNumber,
    "meals": meals[] {
      day,
      "meal": meal-> {
        title,
        price,
        "imageUrl": image.asset->url,  
        image,
        allergens
      }
    } | order(day asc)
  }
`;
