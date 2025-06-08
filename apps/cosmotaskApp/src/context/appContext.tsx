import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { auth, onAuthStateChanged } from "src/services/firebase";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  MD3Theme,
} from "react-native-paper";

interface IAppContext {
  loading: boolean;
  user: FirebaseAuthTypes.User | null;
  toggleTheme: () => void;
  isDark: boolean;
  theme: MD3Theme;
}

interface IAppProvider {
  children: React.ReactNode;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: IAppProvider) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);
  const theme = useMemo(
    () => (isDark ? MD3DarkTheme : MD3LightTheme),
    [isDark]
  );

  const providerValue = useMemo(
    () => ({ loading, user, toggleTheme, isDark, theme }),
    [loading, user, toggleTheme, isDark, theme]
  );

  return (
    <AppContext.Provider value={providerValue}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
