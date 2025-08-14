import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  auth,
  getDocumentData,
  onAuthStateChanged,
} from "src/services/firebase";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  MD3Theme,
} from "react-native-paper";
import { USER_REGISTRATION_STATUS } from "src/utils/constants";

interface IAppContext {
  loading: boolean;
  user: FirebaseAuthTypes.User | null;
  toggleTheme: () => void;
  isDark: boolean;
  theme: MD3Theme;
  userRegistrationStatus: string;
}

interface IAppProvider {
  children: React.ReactNode;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: IAppProvider) => {
  const [loading, setLoading] = useState(true);
  const [userRegistrationStatus, setUserRegistrationStatus] = useState(
    USER_REGISTRATION_STATUS.NOT_REGISTERED
  );
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isDark, setIsDark] = useState(false);

  const checkUserRegistrationStatus = async () => {
    try {
      const data = await getDocumentData("profile/info");
      if (data) {
        setUserRegistrationStatus(USER_REGISTRATION_STATUS.REGISTERED);
      } else {
        setUserRegistrationStatus(USER_REGISTRATION_STATUS.IN_PROGRESS);
      }
    } catch (error) {
      setUserRegistrationStatus(USER_REGISTRATION_STATUS.NOT_REGISTERED);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      await checkUserRegistrationStatus();
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
    () => ({
      loading,
      user,
      toggleTheme,
      isDark,
      userRegistrationStatus,
      theme,
    }),
    [loading, user, toggleTheme, isDark, userRegistrationStatus, theme]
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
