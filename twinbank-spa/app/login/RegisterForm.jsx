import React, { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    name: '',
    lastname: '',
    dni: '',
    birthdate: '',
    clientType: '',
    branch: '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    onSubmit(registerForm);
  };

  return (
    <form id="register-form" onSubmit={handleRegister}>
      <input
        className="controles"
        type="text"
        name="username"
        onChange={onInputChange}
        required
        autoComplete='off'
        placeholder="Nuevo Usuario"
        id="new-username"
      />
      <input
        className="controles"
        type="password"
        name="password"
        placeholder="Nueva Contraseña"
        onChange={onInputChange}
        autoComplete='off'
        id="new-password"
      />
      <input
        className="controles"
        type="text"
        name="name"
        onChange={onInputChange}
        required
        autoComplete='off'
        placeholder="Nombre"
        id="new-name"
      />
      <input
        className="controles"
        type="text"
        name="lastname"
        onChange={onInputChange}
        required
        autoComplete='off'
        placeholder="Apellido"
        id="new-lastname"
      />
      <input
        className="controles"
        type="text"
        name="dni"
        onChange={onInputChange}
        required
        autoComplete='off'
        placeholder="DNI"
        id="new-dni"
      />
      <input
        className="controles"
        type="date"
        name="birthdate"
        onChange={onInputChange}
        required
        autoComplete='off'
        placeholder="Fecha de Nacimiento"
        id="new-birthdate"
      />
      <br />
      <select
        className="controles"
        name="clientType"
        onChange={onInputChange}
        required
        id="new-client-type"
      >
        <option value="" disabled defaultValue>
          Seleccionar Tipo de Cliente
        </option>
        <option value="classic">Classic</option>
        <option value="gold">Gold</option>
        <option value="black">Black</option>
      </select>
      <br />
      <select
        className="controles"
        name="branch"
        onChange={onInputChange}
        required
        id="new-branch"
      >
        <option value="" disabled defaultValue>
          Seleccionar Sucursal
        </option>
        <option value="branch1">Sucursal 1</option>
        <option value="branch2">Sucursal 2</option>
        {/* Agrega más opciones según sea necesario */}
      </select>
      <button type="submit" className="buttons" id="register-button">Registrarse</button>
    </form>
  );
};

export default RegisterForm;
