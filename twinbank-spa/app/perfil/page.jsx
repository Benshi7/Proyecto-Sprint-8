'use client'
import React, { useState, useEffect } from "react";
import { useUser } from "../utils/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../Index.module.css";
import Link from "next/link";
import './perfil.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = () => {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { user } = useUser();

  const getClientes = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clientes/{customer_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setNombre(data[0]?.customer_name || "");
      setApellido(data[0]?.customer_surname || "");
      setDNI(data[0]?.customer_DNI || "");
      setdob(data[0]?.dob || "");
      setTipo(data[0]?.TipoClienteID || "");

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
                  <p><strong>Nombre:</strong> {clientes.customer_name}</p>
                </div>
                <div className="input-box">
                  <p><strong>Apellido:</strong> {clientes.customer_surname}</p>
                </div><div className="input-box">
                  <p><strong>DNI:</strong> {clientes.customer_DNI}</p>
                </div><div className="input-box">
                  <p><strong>Fecha de Nacimiento:</strong> {clientes.dob}</p>
                </div><div className="input-box">
                  <p><strong>Nombre:</strong> {clientes.TipoClienteID}</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Main; // Add this closing curly brace
