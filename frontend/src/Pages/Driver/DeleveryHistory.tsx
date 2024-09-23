import React, { useState } from "react";
import Menubar from "../../components/DriverDash/Menubar";
import MenuToggle from "../../components/DriverDash/MenuToggle";
import Navbar from "../../components/DriverDash/Navbar";
import OrderList from "../../components/OdList/OrderList";


const RoleManagement: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div className={`w-1/4 h-auto bg-gray-200 ${showMenu ? "" : "hidden"} lg:block`}>
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename={"Delivery History"} />
        <div>
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
