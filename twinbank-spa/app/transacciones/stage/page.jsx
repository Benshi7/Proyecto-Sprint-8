'use client'

import { useEffect, useState } from "react";
import { useUser } from "../../utils/UserContext";

export default function HomeStage({query}){

    const {user, setUser} = useUser();
    console.log(user?.id)

    const cbuCobro = query.cbuCobro;
    const monto = query.valor;

    const [remitente, setRemitente] = useState(null)
    useEffect(() => {
        const getUserCobro = async () => {
            const response = await fetch(
                `http://localhost:3000/api/usuarios/${cbuCobro}`
              );

            const data = await response.json();
            if(data){
                setRemitente(data)
                console.log("Usuario encontrado")
            } else {
                console.log("Cargando...")
            }

        }
        getUserCobro();

    },[])

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


        };

    return(
        <div className="content">
            <div className="main_content">
            <main className="principal">
                <h2>Transferir dinero</h2>
                <div className="container transferencia form-content">
                <table>
                    <tr>
                    <td><label for="account-type">Desde</label></td>
                    <td>Caja de ahorro en pesos</td>
                    </tr>
                    <tr>
                    <td><label for="name">Nombre</label></td>
                    <td>{remitente?.username}</td>
                    </tr>
                    <tr>
                    <td><label for="email">Email</label></td>
                    <td>{remitente?.email}</td>
                    </tr>
                    <tr>
                    <td><label for="monto">Monto</label></td>
                    <td>{monto}</td>
                    </tr>
                </table>
                </div>
                <div className="container_submit">
                    <button type="submit" id="add-button" className="add-button" onClick={onUpdateBalance}>Enviar</button>
                </div>

            </main>
            </div>
        </div>
    )
}