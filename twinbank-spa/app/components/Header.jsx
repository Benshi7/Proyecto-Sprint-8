"use client";
import React from "react";
import Link from "next/link";
import { useUser } from '../utils/UserContext'
import { useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faRightFromBracket ,
  faVault ,
  faMoneyBillTransfer,
  faHandHoldingDollar,
  faCoins,
  faReceipt,
  faCreditCard,
  faBars,
  faXmark,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FaTimes } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const Header = () => {
  // const navigate = useNavigate()
  const { user } = useUser();
  const [perfilMenuOpen, setPerfilMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const router = useRouter();
  
  //RUTA LOGIN


  const onLogOut = () => {
    localStorage.setItem('isLoggedIn', false)
    router.push('/login', { shallow: true, replace: true, state: { logged: false }, })
  }


  return (
    <header>
      <div className="content_header">
        <div className="header_container">
          <div className="header_tittle">
            <Image src={logo} alt="Logo de Twin Bank" width={60} height={60} />
            
            <h2>Twin Bank {user?.name}</h2>
          </div>
          <div className="user_info">
            <div className="caja_logout">
              <ul>
                <li className="logout">
                  <a href="#" id="logout-button" onClick={onLogOut}>
                  <FontAwesomeIcon icon={faRightFromBracket} width={40} height={40} />
                  </a>
                </li>
              </ul>
            </div>
            <div id="perfil" onClick={() => setPerfilMenuOpen(!perfilMenuOpen)}>
            <ul id="bar-1">
              {perfilMenuOpen ? (
                <Image
                  src={user?.fotoUrl || localStorage.getItem('fotoUrl') || ''}
                  alt="Imagen de perfil"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src={user?.fotoUrl || localStorage.getItem('fotoUrl') || ''}
                  alt="Imagen de perfil"
                  width={40}
                  height={40}
                />
              )}
            </ul>
            <ul id="perfil-list" className={perfilMenuOpen ? "active" : ""}>
              <li>
                <Link href="/perfil">
                  <FontAwesomeIcon icon={faUser} className="icon_nav_list" />
                  Perfil
                </Link>
              </li>
            </ul>
          </div>
            
            {/* funcionamiento del menu hamburguesa */}
            <div>
            <nav id="mobile" onClick={() => setNavMenuOpen(!navMenuOpen)}>
              <ul id="bar">{navMenuOpen ? <FaTimes className="icons_menu" /> : <FaBars className="icons_menu" />}</ul>
              <ul id="nav-list" className={navMenuOpen ? "active" : ""}>

                <li className="hover_eff">
                <Link href="/">
                <FontAwesomeIcon icon={faVault}  className="icon_nav_list" />
                  Cuenta
                </Link>
                </li>
                <li className="hover_eff">
                <Link href="/transacciones">
                <FontAwesomeIcon icon={faMoneyBillTransfer}  className="icon_nav_list" />
                  Transacciones
                  </Link>
                </li>
                <li className="hover_eff">
                <Link href="/prestamos">
                <FontAwesomeIcon icon={faHandHoldingDollar} className="icon_nav_list"/>
                  Prestamos
                  </Link>
                </li>
                <li className="hover_eff">
                <Link href="/conversor">
                <FontAwesomeIcon icon={faCoins}  className="icon_nav_list"/>
                  Cambio de divisas
                  </Link>
                </li>
                <li className="hover_eff">
                <Link href="/facturas">
                <FontAwesomeIcon icon={faReceipt}  className="icon_nav_list"/>
                  Facturas
                  </Link>
                </li>
                <li className="hover_eff">
                <Link href="/tarjetas">
                <FontAwesomeIcon icon={faCreditCard}  className="icon_nav_list"/>
                  Tarjetas
                  </Link>
                </li>
                <li className="hover_eff">
              <Link href="/contact">
                <FontAwesomeIcon icon={faEnvelope}  className="icon_nav_list" />
                <p>Contacto</p>
              </Link>
              </li>
                <li className="logout hover_eff">
                  <a href="#" id="logout-button" onClick={onLogOut}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="icon_nav_list" />
                    Cerrar Sesion
                  </a>
                </li>
              </ul>
            </nav>
            </div>
            
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
