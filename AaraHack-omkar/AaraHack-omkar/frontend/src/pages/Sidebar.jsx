// // import React from 'react';
// // import { Link, useLocation } from 'react-router-dom';

// // const Sidebar = () => {
// //   const location = useLocation();

// //   const navigation = [
// //     { 
// //       name: 'Dashboard', 
// //       href: '/dashboard', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Products', 
// //       href: '/products', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Add Items', 
// //       href: '/add-items', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Categories', 
// //       href: '/categories', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Orders', 
// //       href: '/orders', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Customers', 
// //       href: '/customers', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Meeting', 
// //       href: '/meeting', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //         </svg>
// //       ) 
// //     },
// //     { 
// //       name: 'Auctions', 
// //       href: '/auctions', 
// //       icon: (
// //         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// //         </svg>
// //       ) 
// //     },
// //   ];

// //   return (
// //     <div className="w-64 border-r border-gray-200 bg-white min-h-screen flex flex-col">
// //       <div className="h-16 flex items-center px-4 border-b border-gray-200">
// //         <div className="flex items-center">
// //           <div className="bg-indigo-600 p-2 rounded-md">
// //             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
// //               <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
// //             </svg>
// //           </div>
// //           <span className="ml-2 text-xl font-bold text-gray-900">YAPPPP</span>
// //         </div>
// //       </div>

// //       <div className="px-4 py-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
// //         Menu
// //       </div>
      
// //       {/* Navigation Menu */}
// //       <nav className="flex-1 overflow-y-auto">
// //         <ul className="space-y-1 px-2">
// //           {navigation.map((item) => (
// //             <li key={item.name}>
// //               <Link
// //                 to={item.href}
// //                 className={`
// //                   flex items-center py-2 px-3 text-sm font-medium rounded-md
// //                   ${location.pathname === item.href 
// //                     ? 'bg-indigo-50 text-indigo-600' 
// //                     : 'text-gray-700 hover:bg-gray-100'}
// //                   transition-colors duration-150 ease-in-out
// //                 `}
// //               >
// //                 <span className={`inline-flex items-center justify-center h-6 w-6 mr-3 ${
// //                   location.pathname === item.href ? 'text-indigo-500' : 'text-gray-500'
// //                 }`}>
// //                   {item.icon}
// //                 </span>
// //                 {item.name}
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>

// //       <div className="px-4 py-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
// //         Others
// //       </div>

// //       <nav className="flex-1 overflow-y-auto">
// //         <ul className="space-y-1 px-2 mb-6">
// //           <li>
// //             <Link
// //               to="/charts"
// //               className="flex items-center py-2 px-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-150 ease-in-out"
// //             >
// //               <span className="inline-flex items-center justify-center h-6 w-6 mr-3 text-gray-500">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //                 </svg>
// //               </span>
// //               Charts
// //             </Link>
// //           </li>
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
  
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const navigation = [
//     { 
//       name: 'Dashboard', 
//       href: '/dashboard', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Products', 
//       href: '/products', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Add Items', 
//       href: '/add-items', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Categories', 
//       href: '/categories', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Orders', 
//       href: '/orders', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Customers', 
//       href: '/customers', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Meeting', 
//       href: '/meeting', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//       ) 
//     },
//     { 
//       name: 'Auctions', 
//       href: '/auctions', 
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//         </svg>
//       ) 
//     },
//   ];

//   return (
//     <div className={`transition-all duration-300 ease-in-out border-r border-gray-200 min-h-screen flex flex-col bg-blue-50 ${
//       collapsed ? 'w-16' : 'w-64'
//     }`}>
//       <div className="h-16 flex items-center px-4 border-b border-gray-200 justify-between">
//         <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
//           <div className="bg-blue-600 p-2 rounded-md">
//             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
//             </svg>
//           </div>
//           {!collapsed && <span className="ml-2 text-xl font-bold text-blue-900">YAPPPP</span>}
//         </div>
//         <button 
//           onClick={toggleSidebar} 
//           className="text-gray-500 hover:text-blue-600 focus:outline-none"
//         >
//           {collapsed ? (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {!collapsed && (
//         <div className="px-4 py-6 text-sm font-medium text-blue-800 uppercase tracking-wider">
//           Menu
//         </div>
//       )}
      
//       {/* Navigation Menu */}
//       <nav className="flex-1 overflow-y-auto">
//         <ul className={`space-y-1 ${collapsed ? 'px-1' : 'px-2'}`}>
//           {navigation.map((item) => (
//             <li key={item.name}>
//               <Link
//                 to={item.href}
//                 className={`
//                   flex items-center py-2 px-3 text-sm font-medium rounded-md
//                   ${location.pathname === item.href 
//                     ? 'bg-blue-100 text-blue-700' 
//                     : 'text-gray-700 hover:bg-blue-50'}
//                   transition-colors duration-150 ease-in-out
//                   ${collapsed ? 'justify-center' : ''}
//                 `}
//                 title={collapsed ? item.name : ''}
//               >
//                 <span className={`inline-flex items-center justify-center h-6 w-6 ${
//                   location.pathname === item.href ? 'text-blue-600' : 'text-gray-500'
//                 }`}>
//                   {item.icon}
//                 </span>
//                 {!collapsed && <span className="ml-3">{item.name}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {!collapsed && (
//         <div className="px-4 py-6 text-sm font-medium text-blue-800 uppercase tracking-wider">
//           Others
//         </div>
//       )}

//       <nav className="flex-1 overflow-y-auto">
//         <ul className={`space-y-1 ${collapsed ? 'px-1' : 'px-2'} mb-6`}>
//           <li>
//             <Link
//               to="/charts"
//               className={`
//                 flex items-center py-2 px-3 text-sm font-medium rounded-md 
//                 ${location.pathname === '/charts' 
//                   ? 'bg-blue-100 text-blue-700' 
//                   : 'text-gray-700 hover:bg-blue-50'}
//                 transition-colors duration-150 ease-in-out
//                 ${collapsed ? 'justify-center' : ''}
//               `}
//               title={collapsed ? 'Charts' : ''}
//             >
//               <span className={`inline-flex items-center justify-center h-6 w-6 ${
//                 location.pathname === '/charts' ? 'text-blue-600' : 'text-gray-500'
//               }`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </span>
//               {!collapsed && <span className="ml-3">Charts</span>}
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/20250411_1252_RebrandX Logo Design_simple_compose_01jrhvh5jpe689wqfwjx24c7e0.png"


const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ) 
    },
    { 
      name: 'Products', 
      href: '/products', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ) 
    },
    { 
      name: 'Add Items', 
      href: '/add-items', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ) 
    },
    { 
      name: 'Categories', 
      href: '/categories', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ) 
    },
    // { 
    //   name: 'Orders', 
    //   href: '/orders', 
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    //     </svg>
    //   ) 
    // },
    // { 
    //   name: 'Customers', 
    //   href: '/customers', 
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    //     </svg>
    //   ) 
    // },
    { 
      name: 'Meeting', 
      href: '/meeting', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ) 
    },
    { 
      name: 'Auctions', 
      href: '/auctions', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ) 
    },
    { 
      name: 'Small-Scale Business', 
      href: '/small-scale-business', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) 
    },
    { 
      name: 'AR/VR TryOn', 
      href: '/ar', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) 
    },
  ];

  return (
    <div className={`transition-all duration-300 ease-in-out border-r border-gray-200 min-h-screen flex flex-col bg-blue-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="h-16 flex items-center px-4 border-b border-gray-200 justify-between">
      <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
  <div className=" p-2 rounded-md">
    <img src={logo} alt="RebrandX Logo" className="w-10 h-10 object-contain" />
  </div>
  {!collapsed && (
    <span className="ml-2 text-xl font-bold text-blue-900">REBRANDEX</span>
  )}
</div>
        <button 
          onClick={toggleSidebar} 
          className="text-gray-500 hover:text-blue-600 focus:outline-none"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 py-6 text-sm font-medium text-blue-800 uppercase tracking-wider">
          Menu
        </div>
      )}
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className={`space-y-1 ${collapsed ? 'px-1' : 'px-2'}`}>
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`
                  flex items-center py-2 px-3 text-sm font-medium rounded-md
                  ${location.pathname === item.href 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-blue-50'}
                  transition-colors duration-150 ease-in-out
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.name : ''}
              >
                <span className={`inline-flex items-center justify-center h-6 w-6 ${
                  location.pathname === item.href ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="px-4 py-6 text-sm font-medium text-blue-800 uppercase tracking-wider">
          Others
        </div>
      )}

      <nav className="flex-1 overflow-y-auto">
        <ul className={`space-y-1 ${collapsed ? 'px-1' : 'px-2'} mb-6`}>
          <li>
            <Link
              to="/charts"
              className={`
                flex items-center py-2 px-3 text-sm font-medium rounded-md 
                ${location.pathname === '/charts' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-blue-50'}
                transition-colors duration-150 ease-in-out
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? 'Charts' : ''}
            >
              <span className={`inline-flex items-center justify-center h-6 w-6 ${
                location.pathname === '/charts' ? 'text-blue-600' : 'text-gray-500'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              {!collapsed && <span className="ml-3">Charts</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;