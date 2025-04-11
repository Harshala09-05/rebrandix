// // import React from 'react';
// // import { Outlet, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../AuthContext';
// // import Sidebar from '../pages/Sidebar';

// // const Layout = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   return (
// //     <div className="flex h-screen overflow-hidden bg-gray-50">
// //       {/* Sidebar */}
// //       <Sidebar />
      
// //       {/* Main Content Container */}
// //       <div className="flex-1 overflow-auto">
// //         {/* Top Navigation Bar */}
// //         <div className="bg-white shadow-sm z-10">
// //           <div className="h-16 px-4 flex justify-between items-center">
// //             <h1 className="text-2xl font-semibold text-gray-900">
// //               {/* Page title will be set by individual page components */}
// //             </h1>
            
// //             {/* User info and logout */}
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center">
// //                 <div className="flex-shrink-0 h-10 w-10">
// //                   <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
// //                     <span className="text-xl font-medium text-white">
// //                       {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <div className="ml-3">
// //                   <div className="text-sm font-medium text-gray-700">
// //                     Welcome, {user?.username || 'User'}
// //                   </div>
// //                   <div className="text-xs text-gray-500">
// //                     Admin
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <button
// //                 onClick={handleLogout}
// //                 className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Page Content - Rendered by React Router's Outlet */}
// //         <div className="p-6">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;


// // import React from 'react';
// // import { Outlet, useLocation } from 'react-router-dom';
// // import Sidebar from '../pages/Sidebar';
// // import Header from '../pages/Header';
// // import ChatbotWidget from '../pages/Chatbot';

// // const Layout = () => {
// //   const location = useLocation();
// //   const toggleSidebar = () => {
// //     setSidebarCollapsed(!sidebarCollapsed);
// //   };
// //   // Get current page name based on route
// //   const getCurrentPageName = () => {
// //     const path = location.pathname;
    
// //     if (path.includes('/dashboard')) return 'Dashboard';
// //     if (path.includes('/products')) return 'Products';
// //     if (path.includes('/add-items')) return 'Add Items';
// //     if (path.includes('/categories')) return 'Categories';
// //     if (path.includes('/orders')) return 'Orders';
// //     if (path.includes('/customers')) return 'Customers';
// //     if (path.includes('/meeting')) return 'Meeting';
    
// //     return 'Dashboard';
// //   };

// //   const pageName = getCurrentPageName();

// //   return (
// //     <div className="flex h-screen overflow-hidden bg-gray-50">
// //       {/* Sidebar */}
// //       <Sidebar toggleSidebar={toggleSidebar}/>
      
// //       {/* Main Content Container */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* Header with search, user profile, etc. */}
// //         <Header pageName={pageName} toggleSidebar={toggleSidebar} />

// //         {/* Page Content - Rendered by React Router's Outlet */}
// //         <div className="flex-1 overflow-auto">
// //           <div className="p-6">
// //             <div className="bg-white rounded-lg shadow overflow-hidden">
// //               <Outlet />
// //             </div>
// //           </div>
// //           <ChatbotWidget />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;
// import React, { useState } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import Sidebar from '../pages/Sidebar';
// import Header from '../pages/Header';
// import ChatbotWidget from '../pages/Chatbot';

// const Layout = () => {
//   const location = useLocation();
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const getCurrentPageName = () => {
//     const path = location.pathname;

//     if (path.includes('/dashboard')) return 'Dashboard';
//     if (path.includes('/products')) return 'Products';
//     if (path.includes('/add-items')) return 'Add Items';
//     if (path.includes('/categories')) return 'Categories';
//     if (path.includes('/orders')) return 'Orders';
//     if (path.includes('/customers')) return 'Customers';
//     if (path.includes('/meeting')) return 'Meeting';
//     if (path.includes('/auctions')) return 'Auctions';

//     return 'Dashboard';
//   };

//   const pageName = getCurrentPageName();

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       <Sidebar toggleSidebar={toggleSidebar} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header pageName={pageName} toggleSidebar={toggleSidebar} />

//         <div className="flex-1 overflow-auto">
//           <div className="p-6">
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <Outlet />
//             </div>
//           </div>
//           <ChatbotWidget />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import Header from '../pages/Header';
import ChatbotWidget from '../pages/Chatbot';

const Layout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getCurrentPageName = () => {
    const path = location.pathname;

    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/products')) return 'Products';
    if (path.includes('/add-items')) return 'Add Items';
    if (path.includes('/categories')) return 'Categories';
    if (path.includes('/orders')) return 'Orders';
    if (path.includes('/customers')) return 'Customers';
    if (path.includes('/meeting')) return 'Meeting';
    if (path.includes('/auctions')) return 'Auctions';

    return 'Dashboard';
  };

  const pageName = getCurrentPageName();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageName={pageName} toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Outlet />
            </div>
          </div>
          <ChatbotWidget />
        </div>
      </div>
    </div>
  );
};

export default Layout;