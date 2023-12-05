"use client";
import { useState, useEffect } from "react";
import billsData from "../bills.json";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "./BillPage.module.css";
import Image from "next/image";
import { useUser } from "../../utils/UserContext";

function BillPage() {
  const router = useRouter();
  const { setUser, user } = useUser();
  const [factura, setFactura] = useState(null);
  const { id } = useParams();
  const [movimientos, setMovimientos] = useState([]);
  const [isPayed, setIsPayed] = useState(false);

  useEffect(() => {
    const selectedBill = billsData.find((bill) => bill.id === parseInt(id));
    if (selectedBill) {
      setFactura(selectedBill);
    } else {
      router.push("/404");
    }
  }, [id, router]);

  if (!factura) {
    return <div>Cargando...</div>;
  }

  const {
    id: idFactura,
    fecha,
    titulo,
    descripcion,
    cliente,
    productos,
    total,
  } = factura;

  const onUpdateBalance = async (e) => {
    e.preventDefault();
    console.log("Actualizado");
    const response = await fetch(
      `http://localhost:3000/api/usuarios/${user?.id}`
    );
    const data = await response.json();
    console.log(data);

    const nuevoSaldo = data.saldo - total;

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
    const transferencia = await fetch(
      `http://localhost:3000/api/transferencias/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cbuPago: user?.id,
          cbuCobro: cliente?.id || 0,
          nombre: titulo,
          monto: total,
        }),
      }
    ).then((transferencia) => transferencia.json());
    const transferencias = await fetch(
      `http://localhost:3000/api/transferencias/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    ).then((transferencias) => transferencias.json());

      if (transferencias.cbuPago === user?.id) {
        setMovimientos([...movimientos, transferencias])
      }
      else {
        return null
      }
      setIsPayed(true)

  };

  return (
    <div className="content">
      <div className="main_content">
        <div className={styles.factura}>
          <h2>Factura #{idFactura}</h2>
          <p>Fecha: {fecha}</p>
          <p>Título: {titulo}</p>
          <p>Descripción: {descripcion}</p>
          <p>Cliente: {cliente.nombre}</p>
          <p>Dirección: {cliente.direccion}</p>
          <h3>Productos:</h3>
          <ul>
            {productos.map((producto, index) => (
              <li key={index} className={styles.producto}>
                <span>{producto.nombre}</span> - Cantidad: {producto.cantidad} -
                Precio Unitario: ${producto.precio_unitario.toFixed(2)} -
                Subtotal: ${producto.subtotal.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className={styles.total}>Total: ${total.toFixed(2)}</p>
          <Image
            src="https://i.imgur.com/SVQmA2S.png"
            width={190}
            height={130}
            alt="Codigo de barras de la Factura"
          />
        </div>
        {!isPayed ? (
                <div className="payButtonContainer">
                    <button id="payButton" onClick={onUpdateBalance}>Pagar</button>
                </div> 
                ) :
                <h3 style={{color:"green", textShadow:"none", textAlign: "center"} }>Transferencia enviada✔</h3>
                }

      </div>
    </div>
  );
}

export default BillPage;
