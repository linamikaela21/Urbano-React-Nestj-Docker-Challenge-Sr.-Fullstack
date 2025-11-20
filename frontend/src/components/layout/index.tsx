import React, { useState } from 'react';
import { Menu, X } from 'react-feather';

import Sidebar from './Sidebar';

export default function Layout({ title, children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <Sidebar className={showSidebar ? 'show' : ''} />

      <h1 className="font-semibold text-3xl bg-gray p-5 ml-0 lg:ml-72 bg-brand-header">{title}</h1>

      <div className="ml-0 lg:ml-72 mx-auto px-5 sm:px-10 transition-all duration-300">{children}</div>

      <button
        className={`fixed bottom-5 border shadow-md bg-white p-3 rounded-full transition-all focus:outline-none lg:hidden ${
          showSidebar ? 'right-5' : 'left-5'
        }`}
        onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? <X size={30} /> : <Menu size={30} />}
      </button>
    </div>
  );
}
