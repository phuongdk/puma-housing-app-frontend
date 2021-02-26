import { NewsCategory } from "./NewsCategory";

export type News = {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  imageName: string;
  createdAt: Date;
  category: NewsCategory;
};
