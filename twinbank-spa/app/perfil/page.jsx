'use client'
import React, { useState, useEffect } from "react";
import { useUser } from "../utils/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../Index.module.css";
import Link from "next/link";
import './perfil.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const PerfilCliente = () => {
  const [cliente, setCliente] = useState({});
  const { user } = useUser();

  const getClientes = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clientes/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setCliente(data)
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles["main-content"]}>
        <h3>
          Bienvenido{" "}
          <span>{user?.username || localStorage.getItem("username")}</span>
        </h3>
        <div className="container">
          <div className="content">
            <div className={styles["user-details-container"]}>
              <div className="user-details">
                <div className="input-box">
                  <p><strong>Nombre:</strong> {cliente?.customer_name}</p>
                </div>
                <div className="input-box">
                  <p><strong>Apellido:</strong> {cliente?.customer_surname}</p>
                </div>
                <div className="input-box">
                  <p><strong>DNI:</strong> {cliente?.customer_DNI}</p>
                </div>
                <div className="input-box">
                  <p><strong>Fecha de Nacimiento:</strong> {cliente?.dob}</p>
                </div>
                <div className="input-box">
                  <p><strong>Nombre:</strong> {cliente?.TipoClienteID}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente;