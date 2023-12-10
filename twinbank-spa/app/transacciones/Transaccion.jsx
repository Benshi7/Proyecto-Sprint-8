'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '../utils/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HomeStage from './Stage';
import styles from './Transacciones.module.css';

export default function HomeTransaccion() {
  const { user } = useUser();
  const [cbu, setCBU] = useState('');
  const [monto, setMonto] = useState('');
  const [validData, setValidData] = useState(false);
  const [cuentas, setCuentas] = useState([]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/api/usuarios`)

    const data = await response.json();
    const userFounded = data.find((user) => user.id == cbu);

    if (!userFounded) {
      alert('CBU incorrecto');
      return;
    }

    const montoValue = parseFloat(monto);

    if (montoValue > 0) {
      setValidData(true)
    } else {
      alert('Monto inválido')
    }
  };

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


  return (
    <div className="content">
      <div className="main_content">
        <main className="principal">
          <h3>
            Bienvenido <span>{user?.username || localStorage.getItem('username')}</span>
          </h3>

          <h2>Transferir dinero</h2>
          <br />

          <div className={`${styles.container} container transferencia form-content`}>
            <div className={styles['balance-header']}>Saldo de la Cuenta</div>
            <p className={styles['account-balance']} id="account-balance">
            {
                    cuentas.map((cuenta) => (
                  <div key={cuenta.account_id}>
                 {cuenta.tipo_cuenta === 1 &&  <div style={{marginRight:'15px'}}><p>Caja Ahorro: ${cuenta.balance}</p></div>}
                  </div>
                  ))}
            </p>


{/*             <div className={styles['movements-header']}>
              <span>Movimientos Recientes</span>
              <button id="clear-movements-button" className={styles['clear-button']}>
                Borrar
              </button>
            </div>
            <table className={styles['movements-table']}>
              <thead>
                <tr>
                  <th className={styles['table-header']}>Descripción</th>
                  <th className={styles['table-header']}>Monto</th>
                  <th className={styles['table-header']}>CBU</th>
                </tr>
              </thead>
              <tbody id="recent-movements"></tbody>
            </table> */}
            <br />
            <div className="action-buttons" style={{borderTop: '1px solid rgb(20,20,20) '}}>
              <form id="transaction-form" onSubmit={handleSubmit}>
                <div className={`${styles['input-content']} ${styles['input-container']}`}>
                  <label htmlFor="cbu" className={styles['input-content']}>
                    CBU / Alias
                  </label>
                  <input
                    className={styles.inputTransacciones}
                    type="text"
                    id="cbu"
                    onChange={(e) => setCBU(e.target.value)}
                  />
                </div>

                <div className={`${styles['input-content']} ${styles['input-container']}`}>
                  <label htmlFor="monto" className={styles['input-content']}>
                    Monto
                  </label>
                  <input
                    className={styles.inputTransacciones}
                    type="number"
                    step="0.01"
                    id="monto"
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
                {!validData ? (
                  <div className={styles['container_submit']}>
                    <br />
                    <button type="submit" id="add-button" className={styles['add-button']}>
                      Aceptar
                    </button>
                  </div>
                ) : (
                  <></>
                )}

              </form>
            </div>
            {validData ? <HomeStage cbuCobro={cbu} monto={monto} /> : <></>}
          </div>
        </main>
      </div>
    </div>
  );
}