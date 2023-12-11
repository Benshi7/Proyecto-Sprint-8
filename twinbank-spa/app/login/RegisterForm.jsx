import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, registrationType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [clientType, setClientType] = useState('');
  const [branch, setBranch] = useState('');

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
          <select name="clientType" value={clientType} onChange={onInputChange} placeholder="Tipo de Cliente">
            <option value="" disabled>
              Seleccionar Tipo de Cliente
            </option>
            <option value="classic">Classic</option>
            <option value="gold">Gold</option>
            <option value="black">Black</option>
          </select>
          <select name="branch" value={branch} onChange={onInputChange} placeholder="Sucursal">
            <option value="" disabled>
              Seleccionar Sucursal
            </option>
            <option value="branch1">Sucursal 1</option>
            <option value="branch2">Sucursal 2</option>
            {/* Agrega más opciones según sea necesario */}
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
    </form>
  );
};

export default RegisterForm;

