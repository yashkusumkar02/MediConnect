import { createContext, useState, useEffect } from 'react';

// Create a UserContext
export const UserContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  // Initialize state from localStorage or default to null
  const [hospitalInfo, setHospitalInfo] = useState(() => {
    const savedHospitalInfo = localStorage.getItem('hospitalInfo');
    return savedHospitalInfo ? JSON.parse(savedHospitalInfo) : null;
  });

  const [clientInfo, setClientInfo] = useState(() => {
    const savedClientInfo = localStorage.getItem('clientInfo');
    return savedClientInfo ? JSON.parse(savedClientInfo) : null;
  });

  const [hospitalId, setHospitalId] = useState(localStorage.getItem("hospitalId") || "");
  const [clientEmail, setClientEmail] = useState(localStorage.getItem("clientEmail") || "");

  
  // Function to save hospital and client info to localStorage
  const saveToLocalStorage = (key, value) => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  };

  // Side effect to update localStorage whenever hospitalInfo or clientInfo change
  useEffect(() => {
    saveToLocalStorage('hospitalInfo', hospitalInfo);
    saveToLocalStorage('clientInfo', clientInfo);
    // Optionally, load hospitalId from localStorage on page load
    const storedHospitalId = localStorage.getItem("hospitalId");
    if (storedHospitalId) {
      setHospitalId(storedHospitalId);
    }
    const storedclientEmail = localStorage.getItem("clientEmail");
    if (storedclientEmail) {
      setClientEmail(storedclientEmail);
    }

  }, [hospitalInfo, clientInfo]);

  // Clear hospital info and client info (useful when user logs out or deletes profile)
  const clearHospitalInfo = () => {
    setHospitalInfo(null);  // Clear the hospital info
  };

  const clearClientInfo = () => {
    setClientInfo(null);  // Clear the client info
  };



  return (
    <UserContext.Provider
      value={{
        hospitalInfo,
        setHospitalInfo,
        clientInfo,
        setClientInfo,
        clearHospitalInfo,
        clearClientInfo,
        hospitalId, 
        setHospitalId,
        clientEmail,
        setClientEmail
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
