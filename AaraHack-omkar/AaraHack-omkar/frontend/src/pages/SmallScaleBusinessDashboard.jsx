import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Tag, 
  DollarSign, 
  Image, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  User,
  BarChart2
} from 'lucide-react';

const SmallScaleBusinessDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('myProducts');
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // Product form state
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    categoryId: '',
    inventoryQuantity: '',
    isPublished: true,
    images: [],
    tags: [],
    wholesaleMinQuantity: 5,
    wholesalePrice: '',
    shippingTime: '3-5 days'
  });
  
  // Mock data - in a real app, this would come from an API
  const MOCK_PRODUCTS = [
    {
      id: 1,
      name: "Handcrafted Ceramic Mug",
      description: "Beautifully crafted ceramic mug made with traditional techniques. Each piece is unique.",
      price: 14.99,
      categoryId: 3,
      inventoryQuantity: 25,
      isPublished: true,
      images: ["/api/placeholder/400/300"],
      tags: ["ceramic", "handcrafted", "kitchenware"],
      wholesaleMinQuantity: 10,
      wholesalePrice: 9.99,
      shippingTime: "3-5 days",
      views: 128,
      orders: 14,
      created: "2025-03-15T12:00:00Z"
    },
    {
      id: 2,
      name: "Organic Cotton Tote Bag",
      description: "Eco-friendly tote bag made from 100% organic cotton with hand-printed design.",
      price: 18.50,
      categoryId: 2,
      inventoryQuantity: 42,
      isPublished: true,
      images: ["/api/placeholder/400/300"],
      tags: ["organic", "eco-friendly", "accessories"],
      wholesaleMinQuantity: 15,
      wholesalePrice: 12.75,
      shippingTime: "2-4 days",
      views: 89,
      orders: 8,
      created: "2025-03-10T14:30:00Z"
    },
    {
      id: 3,
      name: "Handwoven Woolen Scarf",
      description: "Traditional handwoven scarf made from locally sourced wool with natural dyes.",
      price: 34.99,
      categoryId: 2,
      inventoryQuantity: 15,
      isPublished: false,
      images: ["/api/placeholder/400/300"],
      tags: ["woolen", "handwoven", "accessories", "winter"],
      wholesaleMinQuantity: 8,
      wholesalePrice: 24.99,
      shippingTime: "4-6 days",
      views: 42,
      orders: 0,
      created: "2025-03-20T09:15:00Z"
    }
  ];

  const MOCK_CATEGORIES = [
    { id: 1, name: "Jewelry & Accessories" },
    { id: 2, name: "Clothing & Apparel" },
    { id: 3, name: "Home & Living" },
    { id: 4, name: "Arts & Crafts" },
    { id: 5, name: "Food & Beverages" }
  ];
  
  // Load mock data on component mount
  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
    setCategories(MOCK_CATEGORIES);
  }, []);
  
  // Filter products based on search query and filter status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'published') return matchesSearch && product.isPublished;
    if (filterStatus === 'draft') return matchesSearch && !product.isPublished;
    
    return matchesSearch;
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add or update product
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Simulate API call
      if (productForm.id) {
        // Update existing product
        setProducts(prev => prev.map(p => 
          p.id === productForm.id ? { ...productForm } : p
        ));
        setNotification({
          show: true,
          type: 'success',
          message: 'Product updated successfully!'
        });
      } else {
        // Add new product
        const newProduct = {
          ...productForm,
          id: Date.now(), // Generate temporary ID
          created: new Date().toISOString(),
          views: 0,
          orders: 0
        };
        setProducts(prev => [...prev, newProduct]);
        setNotification({
          show: true,
          type: 'success',
          message: 'Product created successfully!'
        });
      }
      
      // Reset form
      setProductForm({
        id: null,
        name: '',
        description: '',
        price: '',
        categoryId: '',
        inventoryQuantity: '',
        isPublished: true,
        images: [],
        tags: [],
        wholesaleMinQuantity: 5,
        wholesalePrice: '',
        shippingTime: '3-5 days'
      });
      setShowAddForm(false);
      setLoading(false);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 3000);
    }, 1000);
  };

  // Edit product
  const handleEditProduct = (product) => {
    setProductForm(product);
    setShowAddForm(true);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setNotification({
        show: true,
        type: 'success',
        message: 'Product deleted successfully!'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 3000);
    }
  };

  // Toggle product publication status
  const togglePublishStatus = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isPublished: !p.isPublished } : p
    ));
  };

  return (
    <div className="p-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 max-w-md ${notification.type === 'success' ? 'bg-green-50' : 'bg-red-50'} border-l-4 ${notification.type === 'success' ? 'border-green-500' : 'border-red-500'} p-4 shadow-md rounded-md z-50`}>
          <div className="flex">
            {notification.type === 'success' ? 
              <CheckCircle className="h-5 w-5 text-green-500" /> : 
              <AlertCircle className="h-5 w-5 text-red-500" />
            }
            <div className="ml-3">
              <p className={`text-sm ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <header className="mb-8">
        <div className="max-w-full mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Small-Scale Business Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your products, view performance, and connect with brands and wholesalers
              </p>
            </div>
            {/* <div className="mt-4 flex md:mt-0 md:ml-4">
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </button>
              )}
            </div> */}
          </div>
        </div>
      </header>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('myProducts')}
            className={`${
              activeTab === 'myProducts'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center`}
          >
            <Package className="h-5 w-5 mb-1" />
            My Products
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`${
              activeTab === 'performance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center`}
          >
            <BarChart2 className="h-5 w-5 mb-1" />
            Performance
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`${
              activeTab === 'connections'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center`}
          >
            <User className="h-5 w-5 mb-1" />
            Connections
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`${
              activeTab === 'settings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center`}
          >
            <Settings className="h-5 w-5 mb-1" />
            Settings
          </button>
        </nav>
      </div>
      
      {/* Product Form */}
      {showAddForm && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {productForm.id ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button 
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmitProduct} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={productForm.name}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <div className="mt-1">
                    <select
                      id="categoryId"
                      name="categoryId"
                      required
                      value={productForm.categoryId}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      required
                      value={productForm.description}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Describe your product in detail. Include materials, dimensions, and unique features.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Retail Price (USD) *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      min="0.01"
                      step="0.01"
                      value={productForm.price}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="wholesalePrice" className="block text-sm font-medium text-gray-700">
                    Wholesale Price (USD) *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="wholesalePrice"
                      id="wholesalePrice"
                      required
                      min="0.01"
                      step="0.01"
                      value={productForm.wholesalePrice}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="inventoryQuantity" className="block text-sm font-medium text-gray-700">
                    Available Quantity *
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="inventoryQuantity"
                      id="inventoryQuantity"
                      required
                      min="0"
                      value={productForm.inventoryQuantity}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="wholesaleMinQuantity" className="block text-sm font-medium text-gray-700">
                    Min. Wholesale Quantity
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="wholesaleMinQuantity"
                      id="wholesaleMinQuantity"
                      min="1"
                      value={productForm.wholesaleMinQuantity}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="shippingTime" className="block text-sm font-medium text-gray-700">
                    Estimated Shipping Time
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="shippingTime"
                      id="shippingTime"
                      value={productForm.shippingTime}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma separated)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      value={Array.isArray(productForm.tags) ? productForm.tags.join(', ') : ''}
                      onChange={(e) => {
                        const tagsArray = e.target.value
                          .split(',')
                          .map(tag => tag.trim())
                          .filter(tag => tag !== '');
                        setProductForm(prev => ({ ...prev, tags: tagsArray }));
                      }}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Images
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isPublished"
                        name="isPublished"
                        type="checkbox"
                        checked={productForm.isPublished}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="isPublished" className="font-medium text-gray-700">Publish immediately</label>
                      <p className="text-gray-500">If unchecked, product will be saved as a draft.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? 'Saving...' : (productForm.id ? 'Update Product' : 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Content for Active Tab */}
      {activeTab === 'myProducts' && !showAddForm && (
        <div>
          {/* Search and Filter */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Products</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inventory
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.images[0] || "/api/placeholder/40/40"} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{categories.find(c => c.id === parseInt(product.categoryId))?.name || 'Uncategorized'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">Wholesale: ${product.wholesalePrice.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.inventoryQuantity} available</div>
                          <div className="text-sm text-gray-500">Min: {product.wholesaleMinQuantity} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {product.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <div>
                              <div>{product.views} views</div>
                              <div>{product.orders} orders</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => togglePublishStatus(product.id)}
                              className="text-gray-600 hover:text-gray-900"
                              title={product.isPublished ? "Unpublish" : "Publish"}
                            >
                              {product.isPublished ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new product.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Performance Overview</h3>
            
            {/* Performance Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
              {/* <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Product Views
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {products.reduce((sum, product) => sum + product.views, 0)}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Orders
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {products.reduce((sum, product) => sum + product.orders, 0)}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Conversion Rate
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {products.reduce((sum, product) => sum + product.views, 0) > 0 
                              ? ((products.reduce((sum, product) => sum + product.orders, 0) / 
                                 products.reduce((sum, product) => sum + product.views, 0)) * 100).toFixed(1) + '%'
                              : '0%'
                            }
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Products */}
            <h4 className="text-md font-medium text-gray-900 mb-3">Top Performing Products</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...products]
                    .sort((a, b) => b.orders - a.orders)
                    .slice(0, 5)
                    .map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-md object-cover" src={product.images[0] || "/api/placeholder/40/40"} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.orders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.views > 0 ? ((product.orders / product.views) * 100).toFixed(1) + '%' : '0%'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Brands & Wholesalers</h3>
            
            {/* Connection Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-6">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Connected Brands
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">3</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Wholesale Orders
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">5</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection List */}
            <h4 className="text-md font-medium text-gray-900 mb-3">Connected Partners</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: "EcoFashion Co.", type: "Brand", orders: 2, status: "Active" },
                    { id: 2, name: "Urban Styles", type: "Wholesaler", orders: 3, status: "Active" },
                    { id: 3, name: "Green Living", type: "Brand", orders: 0, status: "Pending" }
                  ].map((partner) => (
                    <tr key={partner.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-500">{partner.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {partner.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {partner.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          partner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {partner.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Account Settings</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="business-name"
                      id="business-name"
                      defaultValue="Artisan Creations"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">
                    Business Type
                  </label>
                  <div className="mt-1">
                    <select
                      id="business-type"
                      name="business-type"
                      defaultValue="small-scale"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="small-scale">Small-Scale Producer</option>
                      <option value="artisan">Artisan</option>
                      <option value="micro-manufacturer">Micro-Manufacturer</option>
                      <option value="cooperative">Cooperative</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About Your Business
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      defaultValue="We create handcrafted sustainable products using traditional methods and locally sourced materials."
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description of your business for brands and wholesalers.
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue="contact@artisancreations.com"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Business Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      defaultValue="Portland, Oregon, USA"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="wholesale-available"
                        name="wholesale-available"
                        type="checkbox"
                        defaultChecked={true}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="wholesale-available" className="font-medium text-gray-700">Available for wholesale</label>
                      <p className="text-gray-500">Allow brands and wholesalers to place bulk orders.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallScaleBusinessDashboard;