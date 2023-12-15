import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div classname="text-center">
      <div className="list-group">
        <h1>User Pannel</h1>
        <NavLink
          to="/dashboard/user/order"
          className="list-group-item list-group-item-action"
        >
         Check Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
