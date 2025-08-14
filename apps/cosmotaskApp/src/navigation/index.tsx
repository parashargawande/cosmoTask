import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "src/context/appContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import Loader from "src/components/Loader";
import { USER_REGISTRATION_STATUS } from "src/utils/constants";
import RegistrationStack from "./RegistrationStack";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, userRegistrationStatus, loading } = useApp();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  if (loading) {
    return <Loader />;
  }
  if (
    isLoggedIn &&
    userRegistrationStatus === USER_REGISTRATION_STATUS.REGISTERED
  ) {
    return (
      <AppProvider>
        <AppStack />
      </AppProvider>
    );
  }
  if (
    isLoggedIn &&
    userRegistrationStatus === USER_REGISTRATION_STATUS.IN_PROGRESS
  ) {
    return (
      <AppProvider>
        <RegistrationStack />
      </AppProvider>
    );
  }
  return (
    <AppProvider>
      <AuthStack />
    </AppProvider>
  );
}
