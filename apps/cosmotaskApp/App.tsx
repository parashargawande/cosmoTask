import React from "react";
import { AppProvider } from "src/context/appContext";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
