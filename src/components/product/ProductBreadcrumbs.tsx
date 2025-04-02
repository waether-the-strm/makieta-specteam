import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductBreadcrumbsProps {
  category: string;
  name: string;
}

const ProductBreadcrumbs = ({ category, name }: ProductBreadcrumbsProps) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
      <Link to="/" className="hover:text-white transition-colors">
        Oferta
      </Link>
      <ChevronRight size={16} />
      <Link
        to={`/category/${category.toLowerCase()}`}
        className="hover:text-white transition-colors"
      >
        {category}
      </Link>
      <ChevronRight size={16} />
      <span className="text-orange-500 font-semibold">{name}</span>
    </div>
  );
};

export default ProductBreadcrumbs;
