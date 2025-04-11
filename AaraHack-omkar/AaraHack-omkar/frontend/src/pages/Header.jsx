// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const Header = ({ pageName }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="h-16 px-6 flex items-center justify-between">
//         <div className="flex items-center">
//           <button className="md:hidden mr-4 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <div className="relative">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </span>
//             <input 
//               type="text" 
//               placeholder="Search or type command..." 
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-64"
//             />
//             <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-gray-400">
//               ⌘K
//             </span>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           {/* Theme toggle */}
//           <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//             </svg>
//           </button>
          
//           {/* Notification bell */}
//           <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//             <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-orange-500"></span>
//           </button>
          
//           {/* User profile */}
//           <div className="relative">
//             <button onClick={handleLogout} className="flex items-center text-sm focus:outline-none">
//               <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
//                 {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
//               </div>
//               <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
//                 {user?.username || 'User'}
//               </span>
//               <svg className="ml-1 h-5 w-5 text-gray-400 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Breadcrumb and page title */}
//       <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
//         <h1 className="text-2xl font-semibold text-gray-900">{pageName}</h1>
//         <div className="flex items-center text-sm text-gray-500">
//           <Link to="/dashboard" className="hover:text-indigo-600">Home</Link>
//           <svg className="mx-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//           <span className="text-gray-700">{pageName}</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = ({ pageName }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-white hover:text-blue-200 transition-colors duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search or type command..." 
              className="pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400 w-64 bg-blue-600 text-white placeholder-blue-300"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-blue-300">
              ⌘K
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button className="p-2 text-white rounded-full hover:bg-blue-600 transition-colors duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          
          {/* Notification bell */}
          <button className="p-2 text-white rounded-full hover:bg-blue-600 transition-colors duration-150 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-yellow-300"></span>
          </button>
          
          {/* User profile */}
          <div className="relative">
            <button onClick={handleLogout} className="flex items-center text-sm focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-yellow-300 flex items-center justify-center text-blue-800 font-bold">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="ml-2 text-sm font-medium text-white hidden md:block">
                {user?.username || 'User'}
              </span>
              <svg className="ml-1 h-5 w-5 text-blue-200 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb and page title */}
      <div className="px-6 py-4 flex justify-between items-center bg-white text-gray-800 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-blue-900">{pageName}</h1>
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-600">Home</Link>
          <svg className="mx-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-blue-600 font-medium">{pageName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;