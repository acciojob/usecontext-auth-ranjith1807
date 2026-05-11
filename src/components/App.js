import React, { useState, useContext, createContext } from 'react';

// 1. Define the AuthContext
const AuthContext = createContext();

// 2. Create the AuthProvider Component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to update the authentication status
  const toggleAuth = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create the Auth Component (Consumer)
const Auth = () => {
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);

  const handleCheckboxChange = (e) => {
    // Update the context state based on whether the checkbox is checked
    toggleAuth(e.target.checked);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Click on the checkbox to get authenticated</h1>
      
      {/* className="authText" is required for the Cypress test to pass */}
      <p className="authText" style={{ fontSize: '18px', marginBottom: '20px' }}>
        {isAuthenticated ? 'You are now authenticated, you can proceed' : 'you are not authenticated'}
      </p>
      
      <label style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={isAuthenticated}
          onChange={handleCheckboxChange}
          style={{ width: '18px', height: '18px' }}
        />
        I'm not a robot
      </label>
    </div>
  );
};

// 4. Main App Component
export default function App() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}