import React from "react";
import LandingNavbar from "./LandingNavbar";
import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";

function NavbarCall({ auth }) {
  if (auth == 0) {
    return <LandingNavbar />;
  } else if (auth == 1) {
    return <UserNavbar />;
  } else if (auth == 2) {
    return <AdminNavbar />;
  }
}

export default NavbarCall;
