import React, { useEffect, useState } from "react";
import NavbarCall from "./NavbarCall";

function Navbar() {
  const [auth, setauth] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("citizenToken") != null) {
      setauth(1);
    }else if(localStorage.getItem("adminToken")!=null) {
      setauth(2);
    } else {
      setauth(0);
    }
  }, [auth]);

  return (
    <div>
      <NavbarCall auth={auth} />
    </div>
  );
}

export default Navbar;


