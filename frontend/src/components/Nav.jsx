import React from 'react'
import { Link } from "react-router-dom";

function Nav({icon, text, to}) {
  return (
    <Link to={to} className='navComponent'>
      {icon}
      <span>{text}</span>
    </Link>
  )
}

export default Nav
