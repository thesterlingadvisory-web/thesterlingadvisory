import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r border-gray-200 p-4">Admin Sidebar</aside>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
