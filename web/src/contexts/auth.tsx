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
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedToken = localStorage.getItem('@proffy:token');
    const storagedUser = localStorage.getItem('@proffy:user');
      
    if(storagedUser && storagedToken) {
      api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

      setUser(JSON.parse(storagedUser));    
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

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      localStorage.setItem('@proffy:token', response.data.token);
      localStorage.setItem('@proffy:user', JSON.stringify(response.data.userInfo));      
    } catch(err) {
      toast.error(err.response.data.error ? err.response.data.error : 'Ocorreu um erro ao fazer o login');
    }   
  }

  function signOut() {
    localStorage.removeItem('@proffy:token');
    localStorage.removeItem('@proffy:user');
    setUser(null);
  }

  function updateUserInfo(userInfo: UserPropsUpdate) {
    setUser({...user, ...userInfo} as UserProps);
    localStorage.setItem('@proffy:user', JSON.stringify(user));      
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