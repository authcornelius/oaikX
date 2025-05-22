import React from "react";
import { Image as RNImage } from "react-native";

// Import images
import LandImage from "@/assets/images/land.png";
import ApartmentImage from "@/assets/images/land.png";
import EventCenterImage from "@/assets/images/land.png";
import HotelImage from "@/assets/images/land.png";
import CategoryList from "./categoryList";

// Define the category type
export interface Category {
  id: string;
  name: string;
  image: any; // ImageSourcePropType
}

// Export the categories array
export const categories: Category[] = [
  { id: "1", name: "Land", image: LandImage },
  { id: "2", name: "Apartment", image: ApartmentImage },
  { id: "3", name: "Event Center", image: EventCenterImage },
  { id: "4", name: "Hotel", image: HotelImage },
];

// If you want to create a component that renders the categories
interface CategoriesProps {
  onCategoryPress: (id: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryPress }) => {
  return (
    <CategoryList categories={categories} onCategoryPress={onCategoryPress} />
  );
};

export default Categories;
