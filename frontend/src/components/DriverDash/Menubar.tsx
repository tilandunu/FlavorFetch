import React, { useState } from "react";
import { dashboard, user, role, logout } from "../../assets/index";

interface MenuItem {
  name: string;
  icon: string;
  link: string;
}

const Menubar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const menuItems: MenuItem[] = [
    { name: "Orders", icon: dashboard, link: "/driverdashboard" },
    { name: "Confirmed Orders", icon: role, link: "/role-management" },
    { name: "My Profile", icon: user, link: "" },   //my profile 
  ];

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-center h-20">
        <span className="px-5 py-2 text-black font-bold text-4xl">FlavorFetch</span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col items-start pt-20">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`px-4 py-3 flex items-center ${
                selectedItem === item ? "text-lime-500" : "hover:text-gray"
              }`}
              onClick={() => handleItemClick(item)}
            >
              <img src={item.icon} alt={item.name} className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline-block">{item.name}</span>
            </a>
          ))}
        </div>
        <div
          className="flex items-center justify-center h-20 cursor-pointer text-red-500"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img src={logout} alt="Logout" className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline-block text-red-500 text-1xl">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
