import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-gray-200">Public Navbar</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="p-4 border-t border-gray-200">Public Footer</footer>
    </div>
  );
}
