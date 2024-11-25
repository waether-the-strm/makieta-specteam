import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  price: string;
  image: string;
}

export default function CategoryCard({
  title,
  subtitle,
  price,
  image,
}: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 grayscale hover:filter-none"
        />
        <div className="absolute inset-0 bg-slate-900 mix-blend-hard-light opacity-60 hover:opacity-0 transition-opacity duration-500"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{subtitle}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold">{price}</span>
          <button className="flex items-center space-x-2 text-slate-900 hover:text-blue-600 transition-colors">
            <span>Zobacz więcej</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
