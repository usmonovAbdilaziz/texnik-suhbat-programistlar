import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

export const writeData = (file, data) => {
  const filePath = join(`src/question/${file}`);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const readData = (file) => {
  const filePath = join(`src/question/${file}`);
  return JSON.parse(readFileSync(filePath, "utf-8"));
};
