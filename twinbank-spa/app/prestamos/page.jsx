'use client'
import { React, useEffect, useState } from 'react'
import './Prestamos.css'
import { useUser } from '../utils/UserContext'
import { usePrestamo } from './usePrestamo'

const Prestamos = () => {
  const { user } = useUser()
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    monthlyPayment,
    calculateMonthlyPayment,
    handleLoanAmountChange,
    handleInterestRateChange,
    handleLoanTermChange
  } = usePrestamo()

  const [prestamos, setPrestamos] = useState([])


  const getPrestamos = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/prestamos/customer_loans/?customer_id=${user.id}`,
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
        setPrestamos(data);
      } else {
        console.error('La respuesta de la API no es un array:', data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };


    useEffect(() => {
        getPrestamos();
        }
    , []);


  return (
    <div className="content">
    <div className="main_content">
        <main className="principal" >
        <h3>Bienvenido <span>{ user?.username || localStorage.getItem('username') }</span></h3>

            <section>
                    <h2>Prestamos Adquiridos</h2>
                    <table className="calculator">
  <thead>
    <tr>
      <th>ID</th>
      <th>Tipo</th>
      <th>Fecha</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {prestamos && prestamos.map((loan) => (
      <tr key={loan.loan_id}>
        <td>{loan.loan_id}</td>
        <td>{loan.loan_type}</td>
        <td>{loan.loan_date}</td>
        <td>${loan.loan_total}</td>
      </tr>
    ))}
  </tbody>
</table>
                <h2>Simulación de Prestamos</h2>
                <p>Ingrese los números a calcular</p>
                <br/>

                <div className="calculator">
                    <h2>Calculadora de Préstamos</h2>
                    <div className="input-container">
                        <label htmlFor="loan-amount">Monto del Préstamo:</label>
                        <input type="number" id="loan-amount" placeholder="Monto" onChange={handleLoanAmountChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="interest-rate">Tasa de Interés (%):</label>
                        <input type="number" id="interest-rate" placeholder="Tasa" onChange={handleInterestRateChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="loan-term">Plazo del Préstamo (meses):</label>
                        <input type="number" id="loan-term" placeholder="Plazo" onChange={handleLoanTermChange}/>
                    </div>
                    <button id="calculate" onClick={calculateMonthlyPayment}>Calcular</button>
                    <div id="result"> {`Cuota mensual: $${monthlyPayment}`} </div>
                </div>
                <br/>
                <br/>
                <p>Operar con tu cuenta implica que aceptás en su totalidad los términos y condiciones.
                    Las transacciones realizadas en TwinBank no generan cargos adicionales.</p>
                    <br/>

            </section>
        </main>
    </div>
    </div>
  )
}

export default Prestamos
