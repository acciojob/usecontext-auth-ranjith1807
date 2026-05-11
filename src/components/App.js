import React, { useState, useContext, createContext } from 'react';

// 1. Define the AuthContext
const AuthContext = createContext();

// 2. Create the AuthProvider Component
// This component manages the state and provides it to the rest of the app
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
// This component consumes the context to display status and handle user interaction
const Auth = () => {
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);

  const handleCheckboxChange = (e) => {
    // Update the context state based on whether the checkbox is checked
    toggleAuth(e.target.checked);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Click on the checkbox to get authenticated</h1>
      
      {/* Conditional rendering based on authentication state */}
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
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
// Wraps the application tree with the AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}