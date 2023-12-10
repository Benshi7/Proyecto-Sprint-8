'use client'
import React, { useState, useEffect } from "react";
import { useUser } from "../utils/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import logo from "../images/iconcardlogo.svg";
import mas from "../images/mas.png";
import enviar from "../images/enviar.png";
import recibir from "../images/recibir.png";
import historial from "../images/historial.png";
import frame from "../images/frame.png";
import chart from "../images/chart.png";
import contactless from "../images/pay-pass-icon.svg";
import styles from "../Index.module.css";
import Link from "next/link";
import { Cagliostro } from "next/font/google";

ChartJS.register(ArcElement, Tooltip, Legend);
const Main = () => {
  const randomNumber = (Math.random() * 20000).toFixed();
  const { user } = useUser();
  const [cuentas, setCuentas] = useState([])

  const getCuentas = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cuentas/customer_accounts/?customer_id=${user.id}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setCuentas(data);
      } else {
        console.error('La respuesta de la API no es un array:', data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getCuentas();
  }, []);


  // Variables para el gráfico
  const saldo = parseFloat(user?.saldo || localStorage.getItem("saldo")) || 0;
  const ingresos = saldo + 1000;
  const total = ingresos;
  const gastos = randomNumber;

  // Calcula el porcentaje de gastos en relación con los ingresos
  const porcentajeGastos = (gastos / total) * 100;
  const doughnutData = {
    labels: ["Gastos", "Ingresos"],
    datasets: [
      {
        data: [porcentajeGastos, 100 - porcentajeGastos],
        backgroundColor: ["#3A5564", "#F08D3A"],
        borderWidth: 0,
      },
    ],
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.datasetIndex === 0 ? "" : "";
              const value = context.parsed;
              return `${label}: ${value.toFixed(2)}%`; // Formatea el valor a dos decimales
            },
          },
        },
      },
    },
  };

  return (
    <div className={styles.content}>
      <div className={styles["main-content"]}>
        <h3>
          Bienvenido{" "}
          <span>{user?.username || localStorage.getItem("username")}</span>
        </h3>
        <h2 className={styles.heading}>Cuenta</h2>
        <section className={styles["account-info"]}>
          <div className={styles["cards-container"]}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles["account-card"]}>
                  <h3>Saldo total de la cuenta</h3>
                  <div className={styles["account-amount"]}>
                    {
                    cuentas.map((cuenta) => (
                  <div key={cuenta.account_id}>
                 {cuenta.tipo_cuenta === 1 &&  <div style={{marginRight:'15px'}}><p>Caja Ahorro: ${cuenta.balance}</p></div>}
                  </div>
                  ))}
                  </div>

                </div>
                <div className={styles["account-card"]}>
                  <h3>Consumos del período actual</h3>
                  <div className={styles["account-amount"]}>
                    <h2>${randomNumber}</h2>
                    <span>{(randomNumber / 200).toFixed()}</span>
                  </div>
                </div>
                <Link href='/transacciones' style={{ textDecoration: 'none' }}>
                <button className={styles["cta-button"]}>
                  Realizar un pago
                </button>
                </Link>

              </div>

              <div className={styles.column}>
                <div className={styles["creditcard-container"]}>
                  <h3>Tu tarjeta</h3>
                  <div className={styles["creditcard"]}>
                    <div className={styles["carddata1"]}>
                      <p>TWNBK</p>
                      <Image src={contactless} alt="contactless" />
                    </div>
                    <div className={styles["carddata2"]}>
                      <p className={styles["cardname"]}>
                        {user?.username || localStorage.getItem("username")}
                      </p>
                      <p className={styles["venc"]}>09/26</p>
                    </div>
                    <p className={styles["cardnumber"]}>9850 0045 3652 5007</p>
                    <Image
                      className={styles["cardlogo"]}
                      src={logo}
                      alt="logo"
                    />
                  </div>
                  <div className={styles["bar"]}></div>
                  <div className={styles["actions"]}>
                    <div className={styles["action-button"]}>
                      <button>
                        <Image src={enviar} alt="Enviar" width="" height="" />
                      </button>
                      <p>Enviar</p>
                    </div>
                    <div className={styles["action-button"]}>
                      <button>
                        <Image src={recibir} alt="Recibir" width="" height="" />
                      </button>
                      <p>Recibir</p>
                    </div>
                    <div className={styles["action-button"]}>
                      <button>
                        <Image
                          src={historial}
                          alt="Contactless Icon"
                          width=""
                          height=""
                        />
                      </button>
                      <p>Historial</p>
                    </div>
                    <div className={styles["action-button"]}>
                      <button>
                        <Image src={mas} alt="Mas" width="" height="" />
                      </button>
                      <p>Más</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.column}>
                <div className={styles["transfer-container"]}>
                  <h3>Transferencia rápida</h3>
                  <div className={styles["transfer-inputs"]}>
                    <div className={styles["alias-input"]}>
                      <input type="text" placeholder="Alias o CBU" />
                      <button>
                        <Image src={frame} width="" height="" alt="Enviar" />
                      </button>
                    </div>
                    <select id="opciones" name="opciones">
                      <option value="debito">Débito</option>
                      <option value="credito">Crédito</option>
                      <option value="dinero">Dinero en cuenta</option>
                    </select>
                    <div className={styles["amount-input"]}>
                      <label htmlFor="monto">Ingresa el monto</label>
                      <input
                        type="text"
                        id="monto"
                        name="monto"
                        placeholder="$"
                        required
                      />
                    </div>
                    <div className={styles["transfer-buttons"]}>
                      <button className={styles["send-button"]}>
                        Enviar dinero
                      </button>
                      <button className={styles["save-button"]}>
                        Guardar borrador
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles["graph-container"]}>
                  <h3>Tus ingresos</h3>
                  <Image
                    src={chart}
                    width=""
                    height=""
                    alt="Grafico ingresos"
                  />
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles["balance-container"]}>
                  <h3>Balance financiero</h3>
                  <div className={styles["balance"]}>
                    <div className={styles["doughnut-container"]}>
                      <Doughnut
                        data={doughnutData}
                        options={doughnutData.options}
                      />
                    </div>
                    <div className={styles["balance-details-container"]}>
                      <div className={styles["balance-detail"]}>
                        <div className={styles["orange-square"]}></div>
                        <p>Ingresos</p>
                      </div>
                      <div className={styles["balance-detail"]}>
                        <div className={styles["grey-square"]}></div>
                        <p>Gastos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;