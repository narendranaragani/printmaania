// src/context/auth-context.tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/firebase.config";
import { signInWithPopup, onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";

interface AuthUser {
  uid: string;
  name: string;
  email: string;
  photo: string;
}

interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          photo: firebaseUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await fbSignOut(auth);
    setUser(null);
    setLoading(false);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
