import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../state/reducer/productSlice";

// Base URL for media files - update this to match your backend setup
const MEDIA_BASE_URL = "http://127.0.0.1:8000";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // Fetch products from GraphQL API when component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  // Helper function to format image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If the image path is already a full URL, return it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If the path doesn't start with a slash, add one
    if (!imagePath.startsWith('/')) {
      imagePath = '/' + imagePath;
    }
    
    // If the path doesn't start with /media, add it
    if (!imagePath.startsWith('/media')) {
      imagePath = '/media' + imagePath;
    }
    
    // Combine the base URL with the properly formatted path
    return `${MEDIA_BASE_URL}${imagePath}`;
  };

  // Extract unique categories from the actual products
  const categories = ["All"];
  if (products && products.length > 0) {
    const uniqueCategories = [
      ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
    ];
    categories.push(...uniqueCategories);
  }

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category?.name === activeCategory);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          Products ({filteredProducts.length})
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Browse through our collection of premium products.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar - Only show if we have products */}
      {products.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-indigo-600 animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No products
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No products have been added yet.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative p-4 bg-gray-100 flex items-center justify-center h-48">
                {product.productImage ? (
                  <img
                    src={getImageUrl(product.productImage)}
                    alt={product.name}
                    className="object-contain h-full w-full"
                    onError={(e) => {
                      console.error(`Failed to load image: ${e.target.src}`);
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-400">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-gray-900 font-medium text-sm mb-1 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  {product.category?.name && (
                    <span className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-1 text-xs font-medium">
                      {product.category.name}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2 min-h-[32px]">
                  {product.description}
                </p>

                {/* Certificate Badge - if available */}
                {product.isoFound && (
                  <div className="mt-2">
                    <div className="inline-flex items-center text-xs text-green-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                      </svg>
                      ISO Certified
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded text-xs font-medium transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results for Filter */}
      {!loading && products.length > 0 && filteredProducts.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No products found in this category.</p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
          >
            View all products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;