'use client'
import Link from "next/link";
import React from "react";
import {
  faCoins,
  faHandHoldingDollar,
  faMoneyBillTransfer,
  faVault,
  faReceipt,
  faCreditCard,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const Sidebar = () => {

  const router = useRouter();
  return (
    <div className="sidebar" id="side">
      <ul className="menu">
        <li>
          <Link href="/" className={router.pathname === '/' ? styles.active : 'hover_eff fontawesome'}>
            <FontAwesomeIcon icon={faVault} className="icon_nav_list" />
           <p>Cuenta</p>
          </Link>
        </li>
        <li>
          <Link href="/transacciones" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="icon_nav_list" />
            <p>Transacciones</p>
          </Link>
        </li>
        <li>
          <Link href="/prestamos" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faHandHoldingDollar} className="icon_nav_list"/>
            <p>Préstamos</p>
          </Link>
        </li>
        <li>
          <Link href="/conversor" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faCoins} className="icon_nav_list" />
            <p>Cambio de divisas</p>
          </Link>
        </li>
        <li>
          <Link href="/facturas" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faReceipt} className="icon_nav_list" />
            <p>Facturas</p>
          </Link>
        </li>
        <li>
          <Link href="/tarjetas" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faCreditCard} className="icon_nav_list" />
            <p>Tarjetas</p>
          </Link>
        </li>
          <li>
          <Link href="/contact" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faEnvelope}  className="icon_nav_list" />
            <p>Contacto</p>
          </Link>
          </li>
          <li>
          <Link href="/empleadoview" className="hover_eff fontawesome">
            <FontAwesomeIcon icon={faEnvelope}  className="icon_nav_list" />
            <p>Admin</p>
          </Link>
          </li>
      </ul>
    </div>
  );
};

export default Sidebar;
