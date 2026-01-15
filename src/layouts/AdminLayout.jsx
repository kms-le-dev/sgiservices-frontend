import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Header />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
      <Footer/>
      <MobileBottomNav />
    </div>
  );
}
