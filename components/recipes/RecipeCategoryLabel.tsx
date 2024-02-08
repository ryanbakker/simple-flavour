import { Apple, Banknote, Heart, Moon, Sandwich, Zap } from "lucide-react";

const RecipeCategoryLabel = ({ label }: { label: string }) => {
  if (label === "Dinner for 2") {
    return (
      <p className="category-label">
        <Heart size={20} /> {label}
      </p>
    );
  } else if (label === "Affordable") {
    return (
      <p className="category-label">
        <Banknote size={20} /> {label}
      </p>
    );
  } else if (label === "Lunch") {
    return (
      <p className="category-label">
        <Sandwich size={20} /> {label}
      </p>
    );
  } else if (label === "Dinner") {
    return (
      <p className="category-label">
        <Moon size={20} /> {label}
      </p>
    );
  } else if (label === "Fast") {
    return (
      <p className="category-label">
        <Zap size={20} /> {label}
      </p>
    );
  } else if (label === "Healthy") {
    return (
      <p className="category-label">
        <Apple size={20} /> {label}
      </p>
    );
  }
};

export default RecipeCategoryLabel;
