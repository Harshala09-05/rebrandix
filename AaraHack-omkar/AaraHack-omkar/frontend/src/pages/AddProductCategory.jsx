import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  clearCategoryMessage,
} from "../state/reducer/categorySlice";
import {
  createProduct,
  clearProductMessage,
} from "../state/reducer/productSlice";

// Define the API URL
const GRAPHQL_API_URL = "http://127.0.0.1:8000/graphql/";

const AddProductCategory = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading: catLoading,
    success: catSuccess,
    error: catError,
  } = useSelector((state) => state.category);
  const {
    loading: prodLoading,
    success: prodSuccess,
    error: prodError,
  } = useSelector((state) => state.product);

  const [activeTab, setActiveTab] = useState("category");

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    // price: "",
    categoryId: "",
    // inventoryQuantity: "",
    // isPublished: true,
    image: null,
    isoCertificate: null,
  });

  // Add the missing certVerification state
  const [certVerification, setCertVerification] = useState({
    verified: false,
    loading: false,
    error: null,
    data: null
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;
    
    // Reset verification when a new certificate is uploaded
    if (name === "isoCertificate" && files[0]) {
      setCertVerification({
        verified: false,
        loading: false,
        error: null,
        data: null
      });
    }
    
    setProductForm({ ...productForm, [name]: val });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(categoryForm)).then(() => {
      setCategoryForm({ name: "", description: "" });
      dispatch(fetchCategories());
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    // Basic product information
    form.append("name", productForm.name);
    form.append("description", productForm.description);
    form.append("categoryId", productForm.categoryId);
    
    // File uploads - use the correct names as expected in the productSlice
    if (productForm.image) {
      form.append("productImage", productForm.image);
    }
    
    if (productForm.isoCertificate) {
      form.append("isoCertificate", productForm.isoCertificate);
    }
    
    // ISO certificate verification details
    if (certVerification.verified && certVerification.data) {
      form.append("isoFound", certVerification.data.iso9001Found ? "true" : "false");
      form.append("certificateNumber", certVerification.data.certificateNumber || "0");
      form.append("issuer", certVerification.data.issuer || "");
      form.append("trustScore", certVerification.data.trustScore?.toString() || "0");
      form.append("finalVerdict", certVerification.data.verdict || "");
    } else {
      // Default values for verification fields if not verified
      form.append("isoFound", "false");
      form.append("certificateNumber", "0");
      form.append("issuer", "");
      form.append("trustScore", "0");
      form.append("finalVerdict", "");
    }
  
    // For debugging
    console.log("Submitting product with form data:");
    for (let pair of form.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    
    try {
      // Dispatch product creation action
      await dispatch(createProduct(form)).unwrap();
      
      // Reset form on success
      setProductForm({
        name: "",
        description: "",
        categoryId: "",
        image: null,
        isoCertificate: null,
      });
      
      // Reset certificate verification
      setCertVerification({
        verified: false,
        loading: false,
        error: null,
        data: null
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    
    if (!productForm.isoCertificate) {
      setCertVerification({
        verified: false,
        loading: false,
        error: "Please upload an ISO certificate file first",
        data: null
      });
      return;
    }
    
    setCertVerification({
      ...certVerification,
      loading: true,
      error: null
    });
    
    try {
      // Format the request exactly as shown in your curl example
      const operations = JSON.stringify({
        query: `
          mutation($file: Upload!) {
            verifyCertificate(file: $file) {
              iso9001Found
              certificateNumber
              issuer
              trustScore
              verdict
            }
          }
        `,
        variables: {
          file: null
        }
      });
      
      const map = JSON.stringify({
        "0": ["variables.file"]
      });
      
      const formData = new FormData();
      formData.append('operations', operations);
      formData.append('map', map);
      formData.append('0', productForm.isoCertificate);
      
      // Send the GraphQL request
      const response = await fetch(GRAPHQL_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData
      });
      
      const result = await response.json();
      
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message);
      }
      
      setCertVerification({
        verified: true,
        loading: false,
        error: null,
        data: result.data.verifyCertificate
      });
      
      console.log("Certificate verification successful:", result.data.verifyCertificate);
    } catch (error) {
      console.error("Certificate verification error:", error);
      setCertVerification({
        verified: false,
        loading: false,
        error: error.message || "Certificate verification failed",
        data: null
      });
    }
  };


  // const handleVerifyCertificate = async (e) => {
  //   e.preventDefault();
    
  //   if (!productForm.isoCertificate) {
  //     setCertVerification({
  //       verified: false,
  //       loading: false,
  //       error: "Please upload an ISO certificate file first",
  //       data: null
  //     });
  //     return;
  //   }
    
  //   setCertVerification({
  //     ...certVerification,
  //     loading: true,
  //     error: null
  //   });
    
  //   try {
  //     // Format the request exactly as shown in your curl example
  //     const operations = JSON.stringify({
  //       query: `
  //         mutation($file: Upload!) {
  //           verifyCertificate(file: $file) {
  //             iso9001Found
  //             certificateNumber
  //             issuer
  //             trustScore
  //             verdict
  //           }
  //         }
  //       `,
  //       variables: {
  //         file: null
  //       }
  //     });
      
  //     const map = JSON.stringify({
  //       "0": ["variables.file"]
  //     });
      
  //     const formData = new FormData();
  //     formData.append('operations', operations);
  //     formData.append('map', map);
  //     formData.append('0', productForm.isoCertificate);
      
  //     // Send the GraphQL request
  //     const response = await fetch(GRAPHQL_API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: formData
  //     });
      
  //     const result = await response.json();
      
  //     if (result.errors) {
  //       console.error("GraphQL errors:", result.errors);
  //       throw new Error(result.errors[0].message);
  //     }
      
  //     setCertVerification({
  //       verified: true,
  //       loading: false,
  //       error: null,
  //       data: result.data.verifyCertificate
  //     });
      
  //     // Optional: Show a success message
  //     console.log("Certificate verification successful:", result.data.verifyCertificate);
  //   } catch (error) {
  //     console.error("Certificate verification error:", error);
  //     setCertVerification({
  //       verified: false,
  //       loading: false,
  //       error: error.message || "Certificate verification failed",
  //       data: null
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Add Products & Categories
        </h1>

        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("category")}
                className={`${
                  activeTab === "category"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Add Category
              </button>
              <button
                onClick={() => setActiveTab("product")}
                className={`${
                  activeTab === "product"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Add Product
              </button>
            </nav>
          </div>

          {activeTab === "category" && (
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-6">
              {catSuccess && <div className="text-green-700 bg-green-50 p-2 rounded">{catSuccess}</div>}
              {catError && <div className="text-red-700 bg-red-50 p-2 rounded">{catError}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  name="name"
                  placeholder="Category Name"
                  required
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                  className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                disabled={catLoading}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {catLoading ? "Creating..." : "Create Category"}
              </button>
            </form>
          )}

          {activeTab === "product" && (
            <form
              onSubmit={handleProductSubmit}
              className="p-6 space-y-6"
              encType="multipart/form-data"
            >
              {prodSuccess && (
                <div className="text-green-700 bg-green-50 p-2 rounded">{prodSuccess}</div>
              )}
              {prodError && (
                <div className="text-red-700 bg-red-50 p-2 rounded">{prodError}</div>
              )}

              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleProductChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={productForm.categoryId}
                  onChange={handleProductChange}
                  className="w-full border p-2 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option value={cat.id} key={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No categories available</option>
                  )}
                </select>
              </div>

              {/* ISO Certificate */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ISO Certificate (PDF)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <input
                    type="file"
                    name="isoCertificate"
                    accept=".pdf"
                    onChange={handleProductChange}
                    className="flex-grow"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCertificate}
                    disabled={!productForm.isoCertificate || certVerification.loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 transition duration-150"
                  >
                    {certVerification.loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </div>
                    ) : "Verify Certificate"}
                  </button>
                </div>
                
                {/* Verification Status Display */}
                {certVerification.error && (
                  <div className="mt-2 text-red-600 text-sm p-2 bg-red-50 rounded">
                    {certVerification.error}
                  </div>
                )}
                
                {certVerification.verified && certVerification.data && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <h4 className="font-medium text-green-800 mb-2">Certificate Verified</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">ISO 9001:</div>
                      <div>{certVerification.data.iso9001Found ? "Yes" : "No"}</div>
                      
                      <div className="font-medium">Certificate Number:</div>
                      <div>{certVerification.data.certificateNumber || "N/A"}</div>
                      
                      <div className="font-medium">Issuer:</div>
                      <div>{certVerification.data.issuer || "N/A"}</div>
                      
                      <div className="font-medium">Trust Score:</div>
                      <div>{certVerification.data.trustScore || "N/A"}</div>
                      
                      <div className="font-medium">Verdict:</div>
                      <div className={`font-medium ${
                        certVerification.data.verdict === "VALID" ? "text-green-600" : "text-red-600"
                      }`}>
                        {certVerification.data.verdict || "N/A"}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={prodLoading}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {prodLoading ? "Creating..." : "Create Product"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductCategory;