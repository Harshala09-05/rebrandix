import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
// Custom route components with role-based protection
import { ProtectedRoute, AuthRoute } from './components/RequireAuth';

// Layout Component
import Layout from './components/Layout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard and other content pages
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import AddProductCategory from './pages/AddProductCategory';
import MeetingApp from './pages/MeetingApp';
import AuctionPage from './pages/AuctionPage';

// Placeholder components
const OrdersPage = () => <div className="p-6">Orders Page Content</div>;
const CustomersPage = () => <div className="p-6">Customers Page Content</div>;

// Routes configuration
const routes = [
  // Public Routes
  {
    path: '/login',
    element: (
      <AuthRoute roles={['admin', 'user', 'manager']}>
        <Login />
      </AuthRoute>
    ),
    withLayout: false,
  },
  {
    path: '/register',
    element: (
      <AuthRoute roles={['admin', 'user', 'manager']}>
        <Register />
      </AuthRoute>
    ),
    withLayout: false,
  },
  
  // Root path redirect
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    withLayout: false,
  },
  
  // Protected Routes with Layout - Admin and Manager Access
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute roles={['admin', 'manager', 'user']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute roles={['admin', 'manager']}>
        <ProductsPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/add-items',
    element: (
      <ProtectedRoute roles={['admin']}>
        <AddProductCategory />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/categories',
    element: (
      <ProtectedRoute roles={['admin', 'manager']}>
        <CategoriesPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute roles={['admin', 'manager', 'user']}>
        <OrdersPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/customers',
    element: (
      <ProtectedRoute roles={['admin', 'manager']}>
        <CustomersPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/meeting',
    element: (
      <ProtectedRoute roles={['admin', 'manager']}>
        <MeetingApp />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  {
    path: '/auctions',
    element: (
      <ProtectedRoute roles={['admin', 'manager', 'user']}>
        <AuctionPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  
  // Catch-all route
  {
    path: '*',
    element: <Navigate to="/login" replace />,
    withLayout: false,
  },
];

// Function to render routes recursively
const renderRoutes = (routes) =>
  routes.map(({ path, element, index = false, withLayout, children }) => {
    const isTopLevel = !children;
    const RouteElement =
      withLayout && isTopLevel ? <Layout>{element}</Layout> : element;
    
    if (index && !path) {
      return <Route key="index" index element={RouteElement} />;
    }
    
    return (
      <Route key={path || "default"} path={path} element={RouteElement}>
        {children && renderRoutes(children)}
      </Route>
    );
  });

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>{renderRoutes(routes)}</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;