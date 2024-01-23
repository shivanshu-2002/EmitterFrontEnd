import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
      //  const [isLoggedIn,setIsLoggedIn] = useState(false);
       const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const {pathname} = useLocation();
    useEffect(()=>{
         window.scrollTo(0,0)
    },[pathname])

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
      const tokenFromLocalStorage = localStorage.getItem("token");
      const token = tokenFromLocalStorage ? tokenFromLocalStorage.replace(/"/g, "") : null;
      return Boolean(token); // Returns true if token is truthy, false otherwise
    });
     
  return (
    <DataContext.Provider value={{
        isLoggedIn,setIsLoggedIn,user,setUser
         }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };