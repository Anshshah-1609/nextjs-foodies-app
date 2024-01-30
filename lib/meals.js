import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Failed to fetch meals!");

  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug) => {
  // '?' will add dynamic values inside SQL query

  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export const saveMeal = async (meal) => {
  // Generate slug for meal
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const basePath = `images/${fileName}`;
  console.log({ fileName, basePath }, "--- fileName & basePath ----");

  const stream = fs.createWriteStream(`public/${basePath}`);
  const bufferedImg = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImg), (error) => {
    if (error) {
      throw Error("Saving image failed!");
    }
  });

  meal.image = `/${basePath}`;

  db.prepare(
    `
    INSERT INTO meals 
       (title, summary, instructions, creator, creator_email, image, slug)
       values (
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,
          @image,
          @slug
       )
  `
  ).run(meal);
};
