// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from "@slices/authSlice";
import { useAppDispatch } from '@redux/hooks';
import { User } from '@models/User';

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getCurrentUser())
      .then((res: any) => {
        setUser(res.payload);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || "Error al obtener el usuario");
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
