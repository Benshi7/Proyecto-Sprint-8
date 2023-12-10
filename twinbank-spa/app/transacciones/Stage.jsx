"use client";

import { useEffect, useState } from "react";
import { useUser } from "../utils/UserContext";
import styles from "./Transacciones.module.css";
import "./stage.css";

export default function HomeStage({ cbuCobro, monto }) {
  const { user, setUser } = useUser();
  console.log(user?.id);
  const [sent, setSent] = useState(false);

  const [remitente, setRemitente] = useState(null);
  useEffect(() => {
    const getUserCobro = async () => {
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${cbuCobro}`
      );

      const data = await response.json();
      console.log(data);
      if (data) {
        setRemitente(data);
        console.log("Usuario encontrado");
      } else {
        console.log("Cargando...");
      }
    };
    getUserCobro();
  }, []);

  const onUpdateBalance = async (e) => {
    e.preventDefault();
    console.log("Actualizado");
    const response = await fetch(
      `http://localhost:3000/api/usuarios/${user?.id}`
    );
    const data = await response.json();
    console.log(data);

    const nuevoSaldo = data.saldo - monto;

    const res = await fetch(`http://localhost:3000/api/usuarios/${user?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saldo: nuevoSaldo }),
    }).then((res) => res.json());

    console.log("Actualizado");
    setUser({
      ...user,
      saldo: nuevoSaldo,
    });

    const nuevoSaldoRemitente = parseInt(remitente.saldo) + parseInt(monto);

    const res2 = await fetch(`http://localhost:3000/api/usuarios/${cbuCobro}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saldo: nuevoSaldoRemitente }),
    }).then((res2) => res2.json());

    console.log("Actualizado");

    const transferencia = await fetch(
      `http://localhost:3000/api/transferencias/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cbuPago: user?.id,
          cbuCobro: parseInt(cbuCobro) || 0,
          nombre: "Tranfencia",
          monto: parseInt(monto),
        }),
      }
    ).then((transferencia) => transferencia.json());

    setSent(true);
  };



  return (
    <div className="content">
      <div className="main_content">
        <main className="principal">
          <h2>Deseas tranferir el dinero a:</h2>
          <div className="container transferencia form-content">
            <table class="tabla-transferencia">
              <tr>
                <th>
                  <label for="account-type">Desde</label>
                </th>
                <th>Caja de ahorro en pesos</th>
              </tr>
              <tr>
                <td>
                  <label for="name">Nombre</label>
                </td>
                <td>{remitente?.username}</td>
              </tr>
              <tr>
                <td>
                  <label for="email">Email</label>
                </td>
                <td>
                  {remitente?.email || remitente?.username + "@gmail.com"}
                </td>
              </tr>
              <tr>
                <td>
                  <label for="monto">Monto</label>
                </td>
                <td>{monto}</td>
                <br />
              </tr>
            </table>
            <br />
            {!sent ? (
              <div className={styles['container_submit']}>
                <button
                  type="submit"
                  id="add-button"
                  className={styles["add-button"]}
                  onClick={onUpdateBalance}
                >
                  Enviar
                </button>
              </div>
            ) : (
              <h3
                style={{
                  color: "green",
                  textShadow: "none",
                  textAlign: "center",
                }}
              >
                Transferencia enviada✔
              </h3>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
