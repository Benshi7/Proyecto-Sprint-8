'use client'
import { React, useState, useEffect } from "react";
import "./Conversor.css";
 import { useUser } from "../utils/UserContext";
import imagenArgentina from "../images/argentina.png";

const Conversor = ( ) => {
  const { user } = useUser();

  const [fromCurrency, setFromCurrency] = useState("ARS");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convert, setConvert] = useState(0);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/cb6da76fa0a5d3752e76cef1/latest/${fromCurrency}`
      );
      const data = await response.json();
      setConvert(data.conversion_rates[toCurrency]);
    };
    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);

  const handleClick = () => {
    setResult(amount * convert);
  };

  return (
    <div className="content">
      <div className="main_content">
        <h3>
          Bienvenido{" "}
          <span>{user?.username || localStorage.getItem("username")}</span>
        </h3>

        <h2>Conversor de monedas</h2>
        <br />
        <div className="centrador">
          <div className="conversor">
            <div className="ingreso">
              <div className="segmento">
                <div>
                  <h2>Moneda Origen</h2>
                </div>
                <div>
                  <div className="form-conversor">
                    <div className="selectbox">
                      <select
                        value={fromCurrency}
                        onChange={(e) =>
                          setFromCurrency(e.target.value) || "ARS"
                        }
                        className="select"
                        style={{
                          color: "black",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        <option value="ARS" className="contenido-opcion">
                          Argentina
                        </option>
                        <option value="USD" className="contenido-opcion">
                          Dolar
                        </option>
                        <option value="EUR" className="contenido-opcion">
                          Euro
                        </option>
                        <option value="GBP" className="contenido-opcion">
                          Libra Esterlina
                        </option>
                      </select>
                      <div></div>
                    </div>
                    <input
                      type="hidden"
                      name="pais"
                      id="inputSelect"
                      value=""
                    />
                  </div>
                </div>
              </div>

              <div className="segmento">
                <h2>Moneda Destino</h2>

                <form action="" className="form-conversor">
                  <div className="selectbox">
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="select"
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <option value="ARS" className="contenido-opcion">
                        Argentina
                      </option>
                      <option value="USD" className="contenido-opcion">
                        Dolar
                      </option>
                      <option value="EUR" className="contenido-opcion">
                        Euro
                      </option>
                      <option value="GBP" className="contenido-opcion">
                        Libra Esterlina
                      </option>
                    </select>
                  </div>
                  <input type="hidden" name="pais" id="inputSelect2" value="" />
                </form>
              </div>
            </div>
            <div className="ingreso">
              <div className="segmento" style={{ width: "100%" }}>
                <div>
                  <h2>Monto a convertir</h2>
                </div>
                <div>
                  <input
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    className="origen"
                    step="0.1"
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
            </div>
            <div className="segmento monto">
              <p>
                {!result
                  ? "A la espera..."
                  : result.toFixed(3) + " " + toCurrency}
              </p>
            </div>
            <div className="ingreso">
              <div
                className="segmento"
                style={{ padding: "0px", marginTop: "15px" }}
              >
                <button id="boton" onClick={handleClick} style={{}}>
                  <p>Convertir</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversor;
