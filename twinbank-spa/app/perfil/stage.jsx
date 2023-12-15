import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../Index.module.css";
import Link from "next/link";
import './perfil.css'

const getClientes = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clientes/{customer_id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      );
      const data = await response.json();
      setCuentas(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);