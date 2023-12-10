import { Tag } from "antd";

import { CategoryType } from "../../../shared/types/CategoryType";

interface CategoryColumnProps {
  category?: CategoryType;
}

const colors: string[] = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const CategoryColumn = ({ category }: CategoryColumnProps) => {
  if (!category) {
    return null;
  }

  const currentColor = colors[category.id] || colors[0];

  return <Tag color={currentColor}>{category.name}</Tag>;
};

export default CategoryColumn;
