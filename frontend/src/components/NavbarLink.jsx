import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLink = ({ to, children, className, onClick }) => {
  
  const baseStyles = "inline-block border-2 border-transparent rounded-lg px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out";
  const activeStyles = "bg-indigo-600 border-indigo-500"; // Estilos para cuando el enlace está activo
  const hoverStyles = "hover:bg-indigo-500 hover:border-indigo-400"; // Estilos para el estado hover
  const combinedClassNames = [baseStyles, activeStyles, hoverStyles, className].join(' ');

  return (
    <Link to={to} className={combinedClassNames} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavbarLink;
