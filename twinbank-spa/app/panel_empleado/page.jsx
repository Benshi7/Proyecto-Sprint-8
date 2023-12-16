'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../utils/UserContext";
import styles from "./panelEmpleado.module.css";

const panelEmpleado = () => {

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
    console.log(clientesSucursal)
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

  
  const aceptarPrestamo = async (loan_id, customer_id, loan_total) => {
    console.log(customer_id)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cuentas/customer_accounts/?customer_id=${customer_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((res) => res.json());

      console.log("Cuentas del cliente");
      console.log(res);
      
      const cajaDeahorro = res.find((cuenta) => cuenta.tipo_cuenta === 1);

      const res2 = await fetch(`http://127.0.0.1:8000/api/cuentas/update_balance/?account_id=${cajaDeahorro.account_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({balance: cajaDeahorro.balance + loan_total }),
      }).then((res2) => res2.json());

      console.log("Actualizado Caja de Ahorro");
    } catch (error) {
      console.error("Error: ", error);
    }

    


     try {
        const res2 = await fetch(`http://127.0.0.1:8000/api/prestamos/prestamo/${loan_id}/`,
        {
          credentials: 'include',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loan_status: 'Aceptado' }),
        }).then((res2) => res2.json());

        console.log("Actualizado Prestamo");
        console.log(loan_id)
        getPrestamos();
     } catch (error) {
       console.error("Error: ", error);
     }
  }

  const rechazarPrestamo = async (loan_id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/prestamos/prestamo/${loan_id}/`,
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loan_status: 'Rechazado' }),
      }).then((res) => res.json());

      console.log("Actualizado Prestamo");
      getPrestamos();
   } catch (error) {
     console.error("Error: ", error);
   }
 }

 return (
  <div className="content">
    <div className="main_content">
      <h1>Panel de Empleado</h1>
      <h2>Sucursal N°{empleado?.branch_id}</h2>
      <h3>Cantidad de clientes en la sucursal: {clientesSucursal.length}</h3>
      <h3>Clientes de la sucursal</h3>
      <div>
        <table className={styles['loan-table']} id="ClientesTable">
          {clientesSucursal?.map((cliente) => (
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
          <table className={styles['loan-table']} id="LoanTable">
            {prestamos.length === 0 ? (
              <h3>No hay prestamos para esta sucursal...</h3>
            ) : (
              prestamos?.map((prestamo) => (
                <tr key={prestamo?.loan_id}>
                  <td>{prestamo?.loan_id}</td>
                  <td>{prestamo?.loan_type}</td>
                  <td>{prestamo?.loan_date}</td>
                  <td>{prestamo?.loan_total}</td>
                  <td>{prestamo?.customer}</td>
                  <td>
                    <div>
                      <p>Estado: {prestamo?.loan_status ? prestamo?.loan_status : 'Pendiente'} </p>
                    </div>
                    {prestamo?.loan_status === null && (
                      <div>
                        <button style={{ backgroundColor: 'black' }} onClick={() => aceptarPrestamo(prestamo?.loan_id, prestamo?.customer, prestamo?.loan_total)}>
                          ✅
                        </button>
                        <button style={{ backgroundColor: 'black' }} onClick={() => rechazarPrestamo(prestamo?.loan_id)}>
                          ❌
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </table>
        )}
      </div>
    </div>
  </div>
);
};

export default panelEmpleado