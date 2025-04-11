import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MEDIA_BASE_URL = "http://127.0.0.1:8000";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${MEDIA_BASE_URL}/graphql/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            query: `
              query GetProductById($id: Int!) {
                productById(id: $id) {
                  id
                  name
                  description
                  productImage
                  isoFound
                  certificateNumber
                  issuer
                  trustScore
                  finalVerdict
                  createdAt
                  category {
                    name
                  }
                }
              }
            `,
            variables: { id: parseInt(id) }, // ensure id is passed as number
          }),
        });
  
        const result = await res.json();
        if (result.errors) throw new Error(result.errors[0].message);
        setProduct(result.data.productById);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchProduct();
    }
  }, [id]);
  

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    if (!path.startsWith("/")) path = `/${path}`;
    if (!path.startsWith("/media")) path = `/media${path}`;
    return `${MEDIA_BASE_URL}${path}`;
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:underline text-sm"
      >
        ← Back to products
      </button>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg p-4">
          {product.productImage ? (
            <img
              src={getImageUrl(product.productImage)}
              alt={product.name}
              className="object-contain w-full h-96"
              onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
            />
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.category?.name && (
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
              {product.category.name}
            </span>
          )}

          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Product ID:</span>
              <span className="text-gray-900">{product.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Added on:</span>
              <span className="text-gray-900">
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
            {product.finalVerdict && (
              <div className="flex justify-between">
                <span className="text-gray-500">Final Verdict:</span>
                <span
                  className={`font-semibold ${
                    product.finalVerdict === "VALID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.finalVerdict}
                </span>
              </div>
            )}
          </div>

          {product.isoFound && (
            <div className="mt-8 border border-green-200 bg-green-50 p-4 rounded">
              <h3 className="font-medium text-green-700 mb-2">ISO Certified</h3>
              <ul className="text-sm text-green-800 space-y-1">
                {product.certificateNumber && (
                  <li>Certificate #: {product.certificateNumber}</li>
                )}
                {product.issuer && <li>Issuer: {product.issuer}</li>}
                {product.trustScore !== undefined && (
                  <li>Trust Score: {product.trustScore}/100</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
