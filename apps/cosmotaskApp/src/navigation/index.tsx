import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "src/context/appContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import Loader from "src/components/Loader";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, loading } = useApp();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return <AppProvider>{isLoggedIn ? <AppStack /> : <AuthStack />}</AppProvider>;
}
