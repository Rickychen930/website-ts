import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../views/pages/main-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* Future routes can be added here */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
