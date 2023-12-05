'use client'
import React from 'react'
import logo from "../assets/logo.png";
import Image from "next/image";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer className="footer-distributed">
    <div className="footer-right">
      <a href="https://es-la.facebook.com" target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={faFacebook} width={20} /> </a>
      <a href="https://twitter.com/?lang=es" target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={faTwitter} width={20} /> </a>
      <a href="https://ar.linkedin.com" target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={faLinkedin} width={20} />
        </a>
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer" >
      <FontAwesomeIcon icon={faInstagram} width={20} />
      </a>
    </div>

    <div className="footer-left">
      <p className="footer-links">
      <Image src={logo} alt="Logo de Twin Bank" width={70} height={60} className="logo_footer" style={{ opacity: '0.75' }}/></p>
      <p>© 2023 Copyright</p>
      <p>Todos los derechos reservados</p>
    </div>
    
  </footer>
  )
}

export default Footer
