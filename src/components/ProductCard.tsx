import { Info } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function ProductCard({
  title,
  description,
  image,
  category,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute top-2 right-2 bg-slate-900 text-white px-2 py-1 rounded text-sm">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <button className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition">
            Learn More
          </button>
          <Info className="h-5 w-5 text-gray-500 cursor-pointer hover:text-slate-900" />
        </div>
      </div>
    </div>
  );
}
