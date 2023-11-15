import React from 'react';
import { useHistory } from 'react-router-dom'; // Import from React Router if using it
import { Link } from 'react-router-dom';

const NavbarLink = ({ to, children }) => {

  return (
    <Link to={to} style={{border:"2px solid #DDE", borderRadius:"7px", padding:"5px", margin:"2px"}}>
      {children}
    </Link>
  );
};

export default NavbarLink;