import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet } from "react-router-dom";
import './MainLayout.css';

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      
      {/* Main avec container intégré */}
      <main className="flex-1">
        <div className="container p-6">
          <Outlet />
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}