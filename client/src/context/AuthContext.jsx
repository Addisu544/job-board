// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(undefined);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   const login = (token, user) => {
//     setToken(token);
//     setUser(user);
//     console.log(user);
//     localStorage.setItem("token", token);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     console.log("here 31");
//     throw new Error("useAuth must be used inside AuthProvider");
//   }
//   return context;
// }

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [loading, setLoading] = useState(true); // auth initialization loading

  useEffect(() => {
    setLoading(false); // finished reading from localStorage
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
