import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';
import { useState } from "react";

const ProductItem = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-white border-2">
      <div className="relative group overflow-hidden aspect-[4/3] ">
        <img
          src={
            imageError
              ? "https://via.placeholder.com/400x300?text=Image+Unavailable"
              : product.thumbnail
          }
          alt={product.title}
          onError={() => setImageError(true)}
          className="object-cover transition-transform duration-300 group-hover:scale-105 m-auto"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow text-xs text-gray-700 font-semibold">
          ${product.price}
        </div>
      </div>
       <hr className="border mt-4 text-white"/>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-teal-500 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-white line-clamp-2">{product.description}</p>

        <Link to={`/product/${product.id}`}>
          <button className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300">
            <Eye size={18} />
            <span className="text-sm font-medium">View</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
