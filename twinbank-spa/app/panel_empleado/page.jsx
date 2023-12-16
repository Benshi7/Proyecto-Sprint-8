'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../utils/UserContext";
import style from "./empleadoview.css";

const empleadoview = () => {

    const { user } = useUser();

    const [empleado, setEmpleado] = useState({})
    const [clientes, setClientes] = useState([])
    const [prestamos, setPrestamos] = useState([])
    const [loadingPrestamos, setLoadingPrestamos] = useState(true)

    const getEmpleado = async () => {
      try {
        const response = await fetch(`http://127.0.1:8000/api/empleados/${user.empleado_id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        setEmpleado(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

     useEffect(() => {
       getEmpleado();
     }, []);

    const getClientes = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/clientes`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
          );
          const data = await response.json();
          setClientes(data)
        } catch (error) {
          console.error("Error: ", error);
        }
      };

   useEffect(() => {
     getClientes();
   }, []);

    const filtrarClientes = () => {
      console.log("Empleado branch id", empleado.branch_id);
      let clientesSucursal = [];

      clientes.forEach(cliente => {
        if (cliente.branch_id === empleado.branch_id) {
          clientesSucursal.push(cliente);
        }
      });

      return clientesSucursal;
    };

    const clientesSucursal = filtrarClientes();
    const getPrestamos = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/prestamos/branch_loans/?branch_id=${empleado?.branch_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            setPrestamos(data);
            console.log("prestmos", data);
        } catch (error) {
            console.error("Error: ", error);
        }
        finally {
          setLoadingPrestamos(false);
        }

  }

  useEffect(() => {
    const fetchData = async () => {
      // Ahora que getEmpleado y getClientes se han completado, llamamos a getPrestamos
      if (empleado.branch_id) {
        getPrestamos();
      }
    };

    fetchData();
  }, [empleado.branch_id])


  const aceptarPrestamo = async (customer_id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/usuarios/${customer_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({ saldo: nuevoSaldo }),
          credentials: 'include',
        }).then((res) => res.json());

        console.log("Actualizado Saldo");
      } catch (error) {
        console.error("Error: ", error);
      }

    try {
       const res2 = await fetch(`http://localhost:3000/api/prestamos/${customer_id}`,
       {
         method: 'PUT',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ loan_status: 'Aceptado' }),
         credentials: 'include',
       }).then((res2) => res2.json());

       console.log("Actualizado Prestamo");

    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const rechazarPrestamo = async (customer_id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/prestamos/${customer_id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loan_status: 'Rechazado' }),
        credentials: 'include',
      }).then((res) => res.json());

      console.log("Actualizado Prestamo");

   } catch (error) {
     console.error("Error: ", error);
   }
 }

    return (
        <div className="main_content">
          <h1>Panel de Empleado</h1>
          <h2>Sucursal N°{empleado?.branch_id}</h2>
          <h3>Cantidad de clientes en la sucursal: {clientesSucursal.length}</h3>
          <h3>Clientes de la sucursal</h3>
          <div>
            <table id="ClientesTable">
              {
              clientesSucursal?.map((cliente) => (
                    <tr key={cliente.customer_id}>
                      <td>{cliente.customer_name}</td>
                      <td>{cliente.customer_surname}</td>
                      <td>{cliente.customer_dni}</td>
                      <td>{cliente.branch_id}</td>
                    </tr>
                    ))}
              </table>
          </div>
          <h3>Prestamos de la sucursal</h3>
          <div>
          {loadingPrestamos ? (
          <p>Cargando prestamos...</p>
        ) : (
          <table id="LoanTable">
            {prestamos.length === 0 ? (
              <h3>No hay prestamos para esta sucursal...</h3>
            ) : (
              prestamos?.map((prestamo) => (
                <tr key={prestamo.loan_id}>
                  <td>{prestamo.loan_id}</td>
                  <td>{prestamo.loan_type}</td>
                  <td>{prestamo.loan_date}</td>
                  <td>{prestamo.loan_total}</td>
                  <td>{prestamo.customer_id}</td>
                  <td>
                    <button onClick={() => aceptarPrestamo(prestamo.cutomer_id)}>
                      Aceptar
                    </button>
                  </td>
                  <td>
                    <button onClick={() => rechazarPrestamo(prestamo.customer_id)}>
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </table>
        )}
          </div>
        </div>

    )
}

export default empleadoview;