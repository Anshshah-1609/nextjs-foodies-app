"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { saveMeal } = require("./meals");

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

// need to accept 2 params because useFormState will pass 2 arguments
export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  console.log(meal, "new Meal");

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input!",
    };
  }

  await saveMeal(meal);
  // revalidate paths from caches
  // 2nd argument "layout" -> all the nested paths also revalidated
  //              "page" -> only specific path revalidated not all the nested routes
  revalidatePath("/meals");
  redirect("/meals");
};
