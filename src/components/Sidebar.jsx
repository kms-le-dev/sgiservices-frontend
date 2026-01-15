import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="font-bold text-lg mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">Utilisateurs</Link>
        <Link to="/admin/media" className="hover:bg-gray-700 p-2 rounded">Médias</Link>
        <Link to="/admin/services" className="hover:bg-gray-700 p-2 rounded">Services</Link>
      </nav>
    </aside>
  );
}
