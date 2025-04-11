// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// // Layout Component
// import Layout from './components/Layout';

// // Auth Pages
// import Login from './pages/Login';
// import Register from './pages/Register';

// // Dashboard and other content pages
// import Dashboard from './pages/Dashboard';
// import AddProductCategory from './pages/AddProductCategory';
// import MeetingApp from './pages/MeetingApp';

// // Placeholder components for future pages
// const ProductsPage = () => <div>Products Page Content</div>;
// const CategoriesPage = () => <div>Categories Page Content</div>;
// const OrdersPage = () => <div>Orders Page Content</div>;
// const CustomersPage = () => <div>Customers Page Content</div>;

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Root path redirect */}
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />

//           {/* Protected Routes with Layout */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<Layout />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/products" element={<ProductsPage />} />
//               <Route path="/add-items" element={<AddProductCategory />} />
//               <Route path="/categories" element={<CategoriesPage />} />
//               <Route path="/orders" element={<OrdersPage />} />
//               <Route path="/customers" element={<CustomersPage />} />
//               <Route path="/meeting" element={<MeetingApp />} />
//             </Route>
//           </Route>

//           {/* Catch-all route */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout Component
import Layout from "./components/Layout";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard and other content pages
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddProductCategory from "./pages/AddProductCategory";
import MeetingApp from "./pages/MeetingApp";
import AuctionPage from "./pages/AuctionPage";
import TShirtSneakerAR from "./components/AR";
import SmallScaleBusinessDashboard from "./pages/SmallScaleBusinessDashboard";
import ProductDetailPage from "./pages/ProductDetailPage";

// Placeholder components for future pages
const OrdersPage = () => <div className="p-6">Orders Page Content</div>;
const CustomersPage = () => <div className="p-6">Customers Page Content</div>;

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Root path redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes with Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/add-items" element={<AddProductCategory />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/small-scale-business" element={<SmallScaleBusinessDashboard />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/meeting" element={<MeetingApp />} />
              <Route path="/auctions" element={<AuctionPage />} />
              <Route path="/ar" element={<TShirtSneakerAR />} />
            </Route>
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
