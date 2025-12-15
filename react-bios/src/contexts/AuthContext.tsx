import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

import Axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = (props: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios.get("http://localhost:5001/users/verify", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const logout = async () => {
    try {
      await Axios.get("http://localhost:5001/users/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, setIsAuthenticated, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Deze context moet in een provider");
  }

  return context;
};
