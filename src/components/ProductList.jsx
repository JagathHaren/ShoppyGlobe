import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import ProductItem from "./ProductItem";
import SkeletonCard from "./SkeletonCart";

const PRODUCTS_PER_PAGE = 6;

const ProductList = () => {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const products = data?.products || [];

  // Unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats];
  }, [products]);

  // Filter + sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "price-low") return a.price - b.price;
        if (sortOrder === "price-high") return b.price - a.price;
        if (sortOrder === "rating-high") return b.rating - a.rating;
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

  if (error) return <p className="text-red-500">Error loading products.</p>;

  return (
    <div className="mt-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1
          }}
          className="flex-1 px-4 py-2 bg-gray-800 border-2 border-white text-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-64 px-4 py-2 bg-gray-800  rounded-md border-2 border-white text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 bg-gray-800  rounded-md border-2 border-white text-white"
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
        </select>
      </div>

      {/* Products */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              } hover:bg-blue-300`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
