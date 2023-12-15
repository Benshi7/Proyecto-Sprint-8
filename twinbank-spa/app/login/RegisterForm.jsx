'use client'
import React, { useState, useEffect} from 'react';
import Link from 'next/link';

const RegisterForm = ({ onSubmit, registrationType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [clientType, setClientType] = useState('');
  const [branch, setBranch] = useState('');

  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/sucursales/')  // Ajusta la ruta según tu configuración
      .then(response => response.json())
      .then(data => setSucursales(data))
      .catch(error => console.error('Error al obtener sucursales:', error));
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'dni':
        setDni(value);
        break;
      case 'birthdate':
        setBirthdate(value);
        break;
      case 'clientType':
        setClientType(value);
        break;
      case 'branch':
        setBranch(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerData = {
      username,
      password,
      name,
      lastname,
      dni,
      birthdate,
      clientType,
      branch,
    };
    onSubmit(registerData, registrationType);
  };

  return (
    <form onSubmit={handleSubmit}>
      {registrationType === 'existingClient' && (
        <>
          <input className="controles" type="text" name="username" value={username} onChange={onInputChange} placeholder="Usuario" />
          <input className="controles" type="password" name="password" value={password} onChange={onInputChange} placeholder="Contraseña" />
          <input className="controles" type="text" name="dni" value={dni} onChange={onInputChange} placeholder="DNI" />
        </>
      )}
      {registrationType === 'newClient' && (
        <>
          <input className="controles" type="text" name="username" value={username} onChange={onInputChange} placeholder="Nuevo Usuario" />
          <input className="controles" type="password" name="password" value={password} onChange={onInputChange} placeholder="Nueva Contraseña" />
          <input className="controles" type="text" name="name" value={name} onChange={onInputChange} placeholder="Nombre" />
          <input className="controles" type="text" name="lastname" value={lastname} onChange={onInputChange} placeholder="Apellido" />
          <input className="controles" type="text" name="dni" value={dni} onChange={onInputChange} placeholder="DNI" />
          <input className="controles" type="date" name="birthdate" value={birthdate} onChange={onInputChange} placeholder="Fecha de Nacimiento" />
          <br />
          <select name="clientType" value={clientType} onChange={onInputChange} placeholder="Tipo de Cliente">
            <option value="" disabled>
              Seleccionar Tipo de Cliente
            </option>
            <option value="1">Classic</option>
            <option value="2">Gold</option>
            <option value="3">Black</option>
          </select>
          <br />
          <select name="branch" value={branch} onChange={onInputChange} placeholder="Sucursal">
        <option value="" disabled>
          Seleccionar Sucursal
        </option>
        {sucursales.map(sucursal => (
          <option key={sucursal.branch_id} value={sucursal.branch_id}>
            {sucursal.branch_id} - {sucursal.branch_name}
          </option>
        ))}
      </select>
        </>
      )}
      {registrationType === 'existingEmployee' && (
        <>
          <input className="controles" type="text" name="username" value={username} onChange={onInputChange} placeholder="Usuario" />
          <input className="controles" type="password" name="password" value={password} onChange={onInputChange} placeholder="Contraseña" />
          <input className="controles" type="text" name="dni" value={dni} onChange={onInputChange} placeholder="DNI" />
        </>
      )}
      <button className="buttons" type="submit">Registrarse</button>
      <Link href="/" className="buttons"><h4>Volver</h4></Link>
    </form>
  );
};

export default RegisterForm;

