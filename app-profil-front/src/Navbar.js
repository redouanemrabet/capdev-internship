import React from 'react'
import {Link} from "react-router-dom"
import "./styles.css"
import image from "./image/fynancys.ico"
export default function Navbar() {
    const location=()=>{
        if(window.location.pathname=="/create-new-profile"){
            window.location.reload(false);
        }
    }
  return (
<nav className='navv'>
    <Link to="/" className='site-title'><p>Finacsys</p><img src={image} alt="logo finanacys" /></Link>
    <ul>
        <li className='active'>
            <Link to="/create-new-profile" onClick={(e)=>{ location(); }}>Ajouter Un Profile</Link>
        </li>
        <li>
            <Link to="/show-profiles">Consulter les profiles</Link>
        </li>
        <li>
            <Link to="/archives">Archive</Link>
        </li>
        
    </ul>
</nav>
  )
}
