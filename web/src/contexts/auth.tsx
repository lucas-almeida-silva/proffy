import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: string;
}

interface UserPropsUpdate {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface AuthContextData {
  signed: boolean;
  user: UserProps | null;
  loading: boolean;
  signIn(email: string, senha: string): Promise<void>;
  signOut(): void;
  updateUserInfo(userInfo: UserPropsUpdate): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const TOKEN_KEY = '@proffy:token';
  const USER_KEY = '@proffy:user';

  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedToken = localStorage.getItem(TOKEN_KEY);
    const storagedUser = localStorage.getItem(USER_KEY);
      
    if(storagedUser && storagedToken) {
      const token = JSON.parse(storagedToken);
      const isExpiredToken = new Date().getTime() > Number(token.expiresIn);

      if(!isExpiredToken) {
        api.defaults.headers['Authorization'] = `Bearer ${token.value}`;

        setUser(JSON.parse(storagedUser)); 
      }       
    }

    setLoading(false);

  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('login', {
        email, 
        password
      });

      setUser(response.data.userInfo);

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token.value}`;

      localStorage.setItem(TOKEN_KEY, JSON.stringify(response.data.token));
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.userInfo));      
    } catch(err) {
      toast.error(err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao fazer o login');
    }   
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  function updateUserInfo(userInfo: UserPropsUpdate) {
    const newUserInfo = {...user, ...userInfo} as UserProps;
    setUser(newUserInfo);
    localStorage.setItem(USER_KEY, JSON.stringify(newUserInfo));      
  }

  return ( 
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, updateUserInfo, loading}}>
      {children}
    </AuthContext.Provider>
  );
  
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}