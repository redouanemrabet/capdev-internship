import React from 'react'
import rh from "../image/rh.jpg"
import image from "../image/rh-image.jpg"
import Formulaire from './Formulaire'
export default function Home() {
  return (
    <div className='home'>
    
    {/* <img className='image-rh' src={image} alt="image d'un rh" /> */}
    <div className='div-home'>
    <h1>Resource Humaine</h1>
    </div>
  <nav className='nav-home'>
  <a href="/create-new-profile">Ajouter </a>
  <a href="/show-profiles">Chercher</a>
  <a href="archives">Archive</a>

  <div class="animation start-home"></div>
</nav>
<div className='rh-notation'>
  <h1>"<strong>O</strong>ur company <strong>F</strong>ynacsys  give  people choice <br /> and trust because nothing builds  <br />trust as much as giving trust "</h1>
</div>
    </div>
  )
}
