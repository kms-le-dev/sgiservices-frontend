import React from "react";

export default function CardService({ title, description }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg text-red-600">{title}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
}
