

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// // Create authentication context
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // On mount, check if user is already logged in
//   useEffect(() => {
//     const checkAuthStatus = () => {
//       const storedUser = localStorage.getItem('user');
//       const token = localStorage.getItem('token');
      
//       if (storedUser && token) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
          
//           // Only navigate if we're on login or register page and already authenticated
//           const publicPaths = ['/login', '/register', '/'];
//           if (publicPaths.includes(location.pathname)) {
//             navigate('/dashboard', { replace: true });
//           }
//         } catch (error) {
//           console.error('Error parsing stored user:', error);
//           localStorage.removeItem('user');
//           localStorage.removeItem('token');
//         }
//       }
      
//       setLoading(false);
//     };
    
//     checkAuthStatus();
//   }, [location.pathname, navigate]);

//   // Function to check if token is expired
//   const isTokenExpired = (token) => {
//     if (!token) return true;
    
//     try {
//       const tokenData = JSON.parse(atob(token.split('.')[1]));
//       const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
//       const currentTime = Date.now();
      
//       // Refresh when less than 1 minute remaining
//       return expirationTime < currentTime + 60000;
//     } catch (error) {
//       console.error('Error parsing token:', error);
//       return true;
//     }
//   };

//   // Function to refresh token
//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
    
//     if (!refreshToken) {
//       logout();
//       return false;
//     }
    
//     try {
//       const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           query: `
//             mutation {
//               refreshToken(refreshToken: "${refreshToken}") {
//                 token
//                 refreshToken
//                 payload
//               }
//             }
//           `
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.data?.refreshToken) {
//         localStorage.setItem('token', data.data.refreshToken.token);
        
//         // Some implementations also refresh the refresh token
//         if (data.data.refreshToken.refreshToken) {
//           localStorage.setItem('refreshToken', data.data.refreshToken.refreshToken);
//         }
        
//         return true;
//       }
      
//       // If refresh fails, log out
//       logout();
//       return false;
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       logout();
//       return false;
//     }
//   };

//   // Function to handle API requests with token management
//   const authFetch = async (query) => {
//     let token = localStorage.getItem('token');
    
//     // Check if token needs refreshing
//     if (isTokenExpired(token)) {
//       const refreshed = await refreshAccessToken();
//       if (!refreshed) {
//         throw new Error('Session expired. Please log in again.');
//       }
//       token = localStorage.getItem('token');
//     }
    
//     const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({ query }),
//     });
    
//     return response.json();
//   };

//   // Login function
//   const login = async (username, password) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: `
//             mutation {
//               tokenAuth(username: "${username}", password: "${password}") {
//                 token
//                 refreshToken
//                 user {
//                   id
//                   username
//                   email
//                 }
//               }
//             }
//           `,
//         }),
//       });

//       const data = await response.json();

//       if (data.errors) {
//         throw new Error(data.errors[0].message || 'Login failed');
//       }

//       if (data.data.tokenAuth) {
//         // Store tokens and user data
//         localStorage.setItem('token', data.data.tokenAuth.token);
//         localStorage.setItem('refreshToken', data.data.tokenAuth.refreshToken);
//         localStorage.setItem('user', JSON.stringify(data.data.tokenAuth.user));
        
//         // Update context state
//         setUser(data.data.tokenAuth.user);
        
//         // Navigate to dashboard
//         navigate('/dashboard', { replace: true });
        
//         return true;
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     // Clear local storage
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
    
//     // Clear user from state
//     setUser(null);
    
//     // Redirect to login
//     navigate('/login', { replace: true });
//   };

//   // Values to provide in context
//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     authFetch,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// // Create authentication context
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // On mount, check if user is already logged in
//   useEffect(() => {
//     const checkAuthStatus = () => {
//       const storedUser = localStorage.getItem('user');
//       const token = localStorage.getItem('token');

//       if (storedUser && token) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);

//           // Only navigate if we're on login or register page and already authenticated
//           const publicPaths = ['/login', '/register', '/'];
//           if (publicPaths.includes(location.pathname)) {
//             navigate('/dashboard', { replace: true });
//           }
//         } catch (error) {
//           console.error('Error parsing stored user:', error);
//           localStorage.removeItem('user');
//           localStorage.removeItem('token');
//         }
//       }

//       setLoading(false);
//     };

//     checkAuthStatus();
//   }, [location.pathname, navigate]);

//   // Function to check if token is expired
//   const isTokenExpired = (token) => {
//     if (!token) return true;

//     try {
//       const tokenData = JSON.parse(atob(token.split('.')[1]));
//       const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
//       const currentTime = Date.now();

//       // Refresh when less than 1 minute remaining
//       return expirationTime < currentTime + 60000;
//     } catch (error) {
//       console.error('Error parsing token:', error);
//       return true;
//     }
//   };

//   // Function to refresh token
//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (!refreshToken) {
//       logout();
//       return false;
//     }

//     try {
//       const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           query: `
//             mutation {
//               refreshToken(refreshToken: "${refreshToken}") {
//                 token
//                 refreshToken
//                 payload
//               }
//             }
//           `
//         }),
//       });

//       const data = await response.json();

//       if (data.data?.refreshToken) {
//         localStorage.setItem('token', data.data.refreshToken.token);

//         // Some implementations also refresh the refresh token
//         if (data.data.refreshToken.refreshToken) {
//           localStorage.setItem('refreshToken', data.data.refreshToken.refreshToken);
//         }

//         return true;
//       }

//       // If refresh fails, log out
//       logout();
//       return false;
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       logout();
//       return false;
//     }
//   };

//   // Function to handle API requests with token management
//   const authFetch = async (query) => {
//     let token = localStorage.getItem('token');

//     // Check if token needs refreshing
//     if (isTokenExpired(token)) {
//       const refreshed = await refreshAccessToken();
//       if (!refreshed) {
//         throw new Error('Session expired. Please log in again.');
//       }
//       token = localStorage.getItem('token');
//     }

//     const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({ query }),
//     });

//     return response.json();
//   };

//   // Login function
//   const login = async (username, password) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: `
//             mutation {
//               tokenAuth(username: "${username}", password: "${password}") {
//                 token
//                 refreshToken
//                 user {
//                   id
//                   username
//                   email
//                 }
//               }
//             }
//           `,
//         }),
//       });

//       const data = await response.json();

//       if (data.errors) {
//         throw new Error(data.errors[0].message || 'Login failed');
//       }

//       if (data.data.tokenAuth) {
//         // Store tokens and user data
//         localStorage.setItem('token', data.data.tokenAuth.token);
//         localStorage.setItem('refreshToken', data.data.tokenAuth.refreshToken);
//         localStorage.setItem('user', JSON.stringify(data.data.tokenAuth.user));

//         // Update context state
//         setUser(data.data.tokenAuth.user);

//         // Navigate to dashboard
//         navigate('/dashboard', { replace: true });

//         return true;
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     // Clear local storage
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');

//     // Clear user from state
//     setUser(null);

//     // Redirect to login
//     navigate('/login', { replace: true });
//   };

//   // Values to provide in context
//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     authFetch,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Create authentication context
const AuthContext = createContext(null);

// Role-based route access definitions
const ROLE_ACCESS = {
  MANUFACTURER: [
    "dashboard",
    "products",
    "add-items",
    "categories",
    "orders",
    "customers",
    "meeting",
  ],
  BRAND: ["dashboard", "products", "categories", "orders", "customers"],
  SMALL_SCALER: ["dashboard", "products"],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // On mount, check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Only navigate if we're on login or register page and already authenticated
          const publicPaths = ["/login", "/register", "/"];
          if (publicPaths.includes(location.pathname)) {
            navigate("/dashboard", { replace: true });
          } else {
            // Check if user has access to the current route
            checkRouteAccess(parsedUser, location.pathname);
          }
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, [location.pathname, navigate]);

  // Function to check if user has access to the route
  const checkRouteAccess = (user, path) => {
    if (!user || !user.role) return;

    const route = path.split("/")[1]; // Get the first part of the route path

    // If the user's role doesn't have access to this route, redirect to dashboard
    if (
      route &&
      ROLE_ACCESS[user.role.toUpperCase()] &&
      !ROLE_ACCESS[user.role.toUpperCase()].includes(route)
    ) {
      console.log(
        `User with role ${user.role} doesn't have access to ${route}`
      );
      navigate("/dashboard", { replace: true });
    }
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      // Refresh when less than 1 minute remaining
      return expirationTime < currentTime + 60000;
    } catch (error) {
      console.error("Error parsing token:", error);
      return true;
    }
  };

  // Function to refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              refreshToken(refreshToken: "${refreshToken}") {
                token
                refreshToken
                payload
              }
            }
          `,
        }),
      });

      const data = await response.json();

      if (data.data?.refreshToken) {
        localStorage.setItem("token", data.data.refreshToken.token);

        // Some implementations also refresh the refresh token
        if (data.data.refreshToken.refreshToken) {
          localStorage.setItem(
            "refreshToken",
            data.data.refreshToken.refreshToken
          );
        }

        return true;
      }

      // If refresh fails, log out
      logout();
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return false;
    }
  };

  // Function to handle API requests with token management
  const authFetch = async (query) => {
    let token = localStorage.getItem("token");

    // Check if token needs refreshing
    if (isTokenExpired(token)) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        throw new Error("Session expired. Please log in again.");
      }
      token = localStorage.getItem("token");
    }

    const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    return response.json();
  };

  // Login function with role support
  const login = async (username, password) => {
    try {
      const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              tokenAuth(username: "${username}", password: "${password}") {
                token
                refreshToken
                user {
                  id
                  username
                  email
                  role
                }
              }
            }
          `,
        }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message || "Login failed");
      }

      if (data.data?.tokenAuth) {
        const userData = data.data.tokenAuth.user;

        // Store tokens and user data
        localStorage.setItem("token", data.data.tokenAuth.token);
        localStorage.setItem("refreshToken", data.data.tokenAuth.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update context state
        setUser(userData);

        // Navigate to dashboard
        navigate("/dashboard", { replace: true });

        return true;
      } else {
        throw new Error("Login failed: Unexpected response structure");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Clear user from state
    setUser(null);

    // Redirect to login
    navigate("/login", { replace: true });
  };

  // Check if user has permission for a specific feature or route
  const hasPermission = (feature) => {
    if (!user || !user.role) return false;

    const role = user.role.toUpperCase();
    return ROLE_ACCESS[role] && ROLE_ACCESS[role].includes(feature);
  };

  // Values to provide in context
  const value = {
    user,
    loading,
    login,
    logout,
    authFetch,
    hasPermission,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
