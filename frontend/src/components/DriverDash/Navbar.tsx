

import React from "react";

interface NavbarProps {
  pagename: string;
}

const Navbar: React.FC<NavbarProps> = ({ pagename }) => {
  return (
    <nav className="bg-white flex items-center justify-between h-20 px-8 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pagename}</h1>
      </div>
  
    </nav>
  );
};

export default Navbar;
