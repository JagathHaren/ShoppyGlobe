import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { ArrowBigLeft } from 'lucide-react';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-6 text-white">Loading product...</p>;
  if (error || !product) return <p className="text-red-500 text-center py-6">Product not found.</p>;

  return (
    <>
   <Link to="/">
   <ArrowBigLeft className="text-white"/>
   </Link>
    <div className="max-w-5xl mx-auto bg-gray-500 rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row border-2 border-white">
      <div className="w-full sm:w-1/2 h-64 sm:h-auto bg-gray-500">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full sm:w-1/2 p-6 flex flex-col justify-center space-y-4 bg-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-600">{product.title}</h2>
        <p className="text-white">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">${product.price}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
     </>
  );
};

export default ProductDetail;
