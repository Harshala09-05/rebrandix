// import React, { useState } from 'react';

// const CategoriesPage = () => {
//   // Sample categories data
//   const [categories, setCategories] = useState([
//     {
//       id: 1,
//       name: 'Electronics',
//       slug: 'electronics',
//       description: 'Electronic devices and accessories for personal and professional use',
//       productCount: 124,
//       featured: true,
//       icon: 'device-laptop',
//       createdAt: '2023-10-15'
//     },
//     {
//       id: 2,
//       name: 'Clothing & Apparel',
//       slug: 'clothing-apparel',
//       description: 'Fashion items including clothes, shoes, and accessories',
//       productCount: 287,
//       featured: true,
//       icon: 'shirt',
//       createdAt: '2023-10-12'
//     },
//     {
//       id: 3,
//       name: 'Home & Kitchen',
//       slug: 'home-kitchen',
//       description: 'Furniture, kitchen appliances, and home decor items',
//       productCount: 193,
//       featured: true,
//       icon: 'home',
//       createdAt: '2023-10-10'
//     },
//     {
//       id: 4,
//       name: 'Health & Beauty',
//       slug: 'health-beauty',
//       description: 'Skincare, makeup, health supplements, and personal care',
//       productCount: 156,
//       featured: false,
//       icon: 'heart-pulse',
//       createdAt: '2023-09-28'
//     },
//     {
//       id: 5,
//       name: 'Sports & Outdoors',
//       slug: 'sports-outdoors',
//       description: 'Equipment and gear for sports and outdoor activities',
//       productCount: 112,
//       featured: false,
//       icon: 'bicycle',
//       createdAt: '2023-09-22'
//     },
//     {
//       id: 6,
//       name: 'Books & Media',
//       slug: 'books-media',
//       description: 'Books, movies, music, and other media products',
//       productCount: 94,
//       featured: false,
//       icon: 'book-open',
//       createdAt: '2023-09-15'
//     },
//     {
//       id: 7,
//       name: 'Toys & Games',
//       slug: 'toys-games',
//       description: 'Toys, board games, puzzles, and entertainment for all ages',
//       productCount: 78,
//       featured: false,
//       icon: 'puzzle',
//       createdAt: '2023-09-10'
//     },
//     {
//       id: 8,
//       name: 'Baby & Kids',
//       slug: 'baby-kids',
//       description: 'Products for babies, toddlers, and young children',
//       productCount: 63,
//       featured: false,
//       icon: 'baby',
//       createdAt: '2023-09-05'
//     }
//   ]);

//   // State for the new category form
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [newCategory, setNewCategory] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     featured: false
//   });

//   // Function to handle adding a new category
//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     const categoryToAdd = {
//       id: categories.length + 1,
//       ...newCategory,
//       productCount: 0,
//       icon: 'folder',
//       createdAt: new Date().toISOString().split('T')[0]
//     };

//     setCategories([...categories, categoryToAdd]);
//     setNewCategory({ name: '', slug: '', description: '', featured: false });
//     setIsAddingCategory(false);
//   };

//   // Function to handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewCategory({
//       ...newCategory,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   // Function to generate slug from name
//   const handleNameChange = (e) => {
//     const name = e.target.value;
//     const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

//     setNewCategory({
//       ...newCategory,
//       name,
//       slug
//     });
//   };

//   // Function to delete category
//   const handleDeleteCategory = (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       setCategories(categories.filter(category => category.id !== id));
//     }
//   };

//   // Function to toggle featured status
//   const toggleFeatured = (id) => {
//     setCategories(categories.map(category =>
//       category.id === id ? { ...category, featured: !category.featured } : category
//     ));
//   };

//   // Icons mapping - using SVG icons for simplicity
//   const icons = {
//     'device-laptop': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//       </svg>
//     ),
//     'shirt': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM16 6H8M4 6h16" />
//       </svg>
//     ),
//     'home': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     ),
//     'heart-pulse': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//       </svg>
//     ),
//     'bicycle': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0zM11 17a6.5 6.5 0 00-4.5-6.19L4 16h14l-2.18-6.13A6.5 6.5 0 0014 17h-3z" />
//       </svg>
//     ),
//     'book-open': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//       </svg>
//     ),
//     'puzzle': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
//       </svg>
//     ),
//     'baby': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
//       </svg>
//     ),
//     'folder': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//       </svg>
//     )
//   };

//   return (
//     <div className="py-6 px-4 sm:px-6 lg:px-8">
//       {/* Page title and actions */}
//       <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
//         <div>
//           <h2 className="text-lg font-medium text-gray-900">Categories ({categories.length})</h2>
//           <p className="mt-1 text-sm text-gray-500">Manage product categories and subcategories</p>
//         </div>
//         <button
//           onClick={() => setIsAddingCategory(true)}
//           className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           Add Category
//         </button>
//       </div>

//       {/* Search and filter bar */}
//       <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
//         <div className="relative w-full sm:w-64">
//           <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </span>
//           <input
//             type="text"
//             placeholder="Search categories..."
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div className="flex space-x-2 w-full sm:w-auto">
//           <select className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 pl-3 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm">
//             <option>All Categories</option>
//             <option>Featured Categories</option>
//             <option>Regular Categories</option>
//           </select>
//           <select className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 pl-3 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm">
//             <option>Sort by: Newest</option>
//             <option>Sort by: Name</option>
//             <option>Sort by: Products Count</option>
//           </select>
//         </div>
//       </div>

//       {/* Add Category Form */}
//       {isAddingCategory && (
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium text-gray-900">Add New Category</h3>
//             <button
//               onClick={() => setIsAddingCategory(false)}
//               className="text-gray-400 hover:text-gray-500"
//             >
//               <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <form onSubmit={handleAddCategory}>
//             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//               <div className="sm:col-span-3">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   required
//                   value={newCategory.name}
//                   onChange={handleNameChange}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="sm:col-span-3">
//                 <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
//                 <input
//                   type="text"
//                   name="slug"
//                   id="slug"
//                   required
//                   value={newCategory.slug}
//                   onChange={handleInputChange}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="sm:col-span-6">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   id="description"
//                   rows="3"
//                   value={newCategory.description}
//                   onChange={handleInputChange}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                 ></textarea>
//               </div>

//               <div className="sm:col-span-6">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="featured"
//                     id="featured"
//                     checked={newCategory.featured}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
//                     Featured Category
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setIsAddingCategory(false)}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Add Category
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Categories Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {categories.map(category => (
//           <div key={category.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
//             <div className="p-5">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center">
//                   <div className={`rounded-md p-2 mr-3 ${category.featured ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
//                     {icons[category.icon]}
//                   </div>
//                   <div>
//                     <h3 className="text-gray-900 font-medium line-clamp-1">{category.name}</h3>
//                     <span className="text-sm text-gray-500">{category.slug}</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => toggleFeatured(category.id)}
//                   className={`p-1 rounded ${category.featured ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-500'}`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={category.featured ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={category.featured ? 0 : 2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                   </svg>
//                 </button>
//               </div>

//               <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] mb-4">{category.description}</p>

//               <div className="flex justify-between items-center mb-4">
//                 <div className="text-sm text-gray-500">
//                   <span className="font-medium text-indigo-600">{category.productCount}</span> products
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Created: {category.createdAt}
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 pt-4 flex justify-between">
//                 <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteCategory(category.id)}
//                   className="text-sm text-red-500 hover:text-red-700 font-medium"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty state for when there are no categories */}
//       {categories.length === 0 && (
//         <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//           <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//           </svg>
//           <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
//           <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
//           <div className="mt-6">
//             <button
//               onClick={() => setIsAddingCategory(true)}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Add Category
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Pagination (only if needed) */}
//       {categories.length > 0 && (
//         <div className="flex items-center justify-between my-8">
//           <div className="flex-1 flex justify-between sm:hidden">
//             <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">1</span> to <span className="font-medium">{categories.length}</span> of{' '}
//                 <span className="font-medium">{categories.length}</span> categories
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                 <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                   <span className="sr-only">Previous</span>
//                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//                 <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700">
//                   1
//                 </button>
//                 <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                   <span className="sr-only">Next</span>
//                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoriesPage;

// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchCategories } from '../state/reducer/categorySlice'; // adjust path as needed

// // const dummyCategories = [
// //   {
// //     id: 1,
// //     name: 'Electronics',
// //     slug: 'electronics',
// //     description: 'Electronic devices and accessories for personal and professional use',
// //     productCount: 124,
// //     featured: true,
// //     icon: 'device-laptop',
// //     createdAt: '2023-10-15'
// //   },
// //   {
// //     id: 2,
// //     name: 'Clothing & Apparel',
// //     slug: 'clothing-apparel',
// //     description: 'Fashion items including clothes, shoes, and accessories',
// //     productCount: 287,
// //     featured: true,
// //     icon: 'shirt',
// //     createdAt: '2023-10-12'
// //   },
// //   {
// //     id: 3,
// //     name: 'Home & Kitchen',
// //     slug: 'home-kitchen',
// //     description: 'Furniture, kitchen appliances, and home decor items',
// //     productCount: 193,
// //     featured: true,
// //     icon: 'home',
// //     createdAt: '2023-10-10'
// //   },
// //   {
// //     id: 4,
// //     name: 'Health & Beauty',
// //     slug: 'health-beauty',
// //     description: 'Skincare, makeup, health supplements, and personal care',
// //     productCount: 156,
// //     featured: false,
// //     icon: 'heart-pulse',
// //     createdAt: '2023-09-28'
// //   }
// // ];

// // const CategoriesPage = () => {
// //   const dispatch = useDispatch();
// //   const { categories, loading, error } = useSelector((state) => state.category);

// //   const [localCategories, setLocalCategories] = useState([]);

// //   useEffect(() => {
// //     dispatch(fetchCategories());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (!loading && (!categories || categories.length === 0)) {
// //       setLocalCategories(dummyCategories);
// //     } else {
// //       setLocalCategories(categories);
// //     }
// //   }, [categories, loading]);

// //   if (loading) return <div>Loading categories...</div>;
// //   if (error) return <div className="text-red-600">Error: {error}</div>;

// //   return (
// //     <div className="py-6 px-4 sm:px-6 lg:px-8">
// //       <h2 className="text-lg font-medium text-gray-900 mb-4">
// //         Categories ({localCategories.length})
// //       </h2>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //         {localCategories.map((category) => (
// //           <div
// //             key={category.id}
// //             className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
// //           >
// //             <h3 className="text-gray-900 font-semibold mb-1">{category.name}</h3>
// //             <p className="text-sm text-gray-500 mb-2">{category.description}</p>
// //             <div className="text-xs text-gray-400">
// //               {category.productCount} Products • Created {category.createdAt}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoriesPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  clearCategoryMessage,
} from "../state/reducer/categorySlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, success } = useSelector(
    (state) => state.category
  );

  // State for the new category form
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    featured: false,
  });

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortOption, setSortOption] = useState("Sort by: Newest");

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearCategoryMessage());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  // Function to handle adding a new category
  const handleAddCategory = (e) => {
    e.preventDefault();

    dispatch(
      createCategory({
        name: newCategory.name,
        description: newCategory.description,
      })
    );

    setNewCategory({ name: "", slug: "", description: "", featured: false });
    setIsAddingCategory(false);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to generate slug from name
  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    setNewCategory({
      ...newCategory,
      name,
      slug,
    });
  };

  // Function to delete category (would need to be implemented in the slice)
  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      // This would need a deleteCategory thunk added to the slice
      // dispatch(deleteCategory(id));
      console.log("Delete category with ID:", id);
    }
  };

  // Function to toggle featured status (would need to be implemented in the slice)
  const toggleFeatured = (id) => {
    // This would need an updateCategory thunk added to the slice
    // dispatch(updateCategory({ id, featured: !categories.find(c => c.id === id).featured }));
    console.log("Toggle featured for category with ID:", id);
  };

  // Icons mapping - using SVG icons for simplicity
  const icons = {
    "device-laptop": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    folder: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
  };

  // Get default icon if not found
  const getIcon = (iconName) => {
    return icons[iconName] || icons["folder"];
  };

  // Filter and sort categories
  const filteredCategories = categories.filter((category) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category type filter
    const matchesFilter =
      categoryFilter === "All Categories" ||
      (categoryFilter === "Featured Categories" && category.featured) ||
      (categoryFilter === "Regular Categories" && !category.featured);

    return matchesSearch && matchesFilter;
  });

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortOption === "Sort by: Name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "Sort by: Products Count") {
      return (b.productCount || 0) - (a.productCount || 0);
    }
    // Default: Sort by newest
    return (
      new Date(b.createdAt || "2023-01-01") -
      new Date(a.createdAt || "2023-01-01")
    );
  });

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Page title and actions */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Categories ({categories.length})
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage product categories and subcategories
          </p>
        </div>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Category
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
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

      {/* Search and filter bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex space-x-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 pl-3 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm"
          >
            <option>All Categories</option>
            <option>Featured Categories</option>
            <option>Regular Categories</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 pl-3 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm"
          >
            <option>Sort by: Newest</option>
            <option>Sort by: Name</option>
            <option>Sort by: Products Count</option>
          </select>
        </div>
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Add New Category
            </h3>
            <button
              onClick={() => setIsAddingCategory(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleAddCategory}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={newCategory.name}
                  onChange={handleNameChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700"
                >
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  value={newCategory.slug}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={newCategory.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Featured Category
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingCategory(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-indigo-600 animate-spin"></div>
        </div>
      )}

      {/* Categories Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div
                      className={`rounded-md p-2 mr-3 ${
                        category.featured
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {getIcon(category.icon)}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium line-clamp-1">
                        {category.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {category.slug ||
                          category.name.toLowerCase().replace(/\s+/g, "-")}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeatured(category.id)}
                    className={`p-1 rounded ${
                      category.featured
                        ? "text-yellow-500 hover:text-yellow-600"
                        : "text-gray-400 hover:text-gray-500"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill={category.featured ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={category.featured ? 0 : 2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] mb-4">
                  {category.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-indigo-600">
                      {category.productCount || 0}
                    </span>{" "}
                    products
                  </div>
                  <div className="text-xs text-gray-500">
                    Created: {category.createdAt || "Recently"}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state for when there are no categories */}
      {!loading && categories.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No categories
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new category.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* No results state */}
      {!loading && categories.length > 0 && sortedCategories.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No matching categories
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("All Categories");
                setSortOption("Sort by: Newest");
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination (only if needed) */}
      {!loading && sortedCategories.length > 8 && (
        <div className="flex items-center justify-between my-8">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{sortedCategories.length}</span>{" "}
                of{" "}
                <span className="font-medium">{sortedCategories.length}</span>{" "}
                categories
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
