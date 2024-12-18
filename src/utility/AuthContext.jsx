import React, { createContext, useState, useEffect } from "react";
import { useMemo } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    roles: [],
    loading: true,
  });

  // Fetch auth data when the provider is mounted
  const fetchAuth = useMemo(() => {
    return  async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/portal/auth`, {
              method: "GET",
              credentials: "include",
          });
    
          if (response.status === 200) {
              const data = await response.json();
              
              // Check if the roles or user data have actually changed before updating state
              
                  setAuth({
                      isAuthenticated: true,
                      roles: data.role,
                      loading: false
                  });
          } else {
              setAuth((prev) => ({
                  ...prev,
                  isAuthenticated: false,
                  loading: false,
              }));
          }
      } catch (error) {
          console.error("Error fetching auth data:", error);
          setAuth((prev) => ({
              ...prev,
              isAuthenticated: false,
              loading: false,
          }));
      }
    }
  }, [])
  useEffect(() => {
    fetchAuth();
  }, []);
  // Context value
  const contextValue = {
    auth,
    login: (userData) => setAuth({ ...auth, isAuthenticated: true, roles: userData.role }),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!auth.loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// Export AuthContext and AuthProvider
export { AuthContext, AuthProvider };
