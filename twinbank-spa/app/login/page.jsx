'use client'
import { React, useEffect, useState } from 'react'
import './Login.css'
import { useForm } from '../hooks/useForm'
import Image from 'next/image'
// import { useNavigate } from 'react-router-dom'
import usuariosData from '../utils/usuarios.json'
import { useUser } from '../utils/UserContext'
import { useRouter } from 'next/navigation'
import logo from '../assets/logo.png'
import RegisterForm from './RegisterForm'

const Login = () => {
  // const navigate = useNavigate()
  const { setUser } = useUser()
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [registrationType, setRegistrationType] = useState('');

  const { username, password, onInputChange, onResetForm } = useForm({
    username: '',
    password: '',
  })

  const router = useRouter()

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          logged: true,
          username: data.username,
          saldo: data.saldo,
          fotoUrl: data.fotoUrl,
          id: data.id,
          esEmpleado: data.esEmpleado
        });
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('fotoUrl', data.photoUrl);
        localStorage.setItem('saldo', data.saldo);
        localStorage.setItem('id', data.id);
        router.push('/', { shallow: true, state: { logged: true }, replace: true });
      } else {
        document.getElementById('error-message').innerText = data.error || 'Error de autenticación';
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
    }
    onResetForm();
  }

  const handleRegisterSubmit = async (registerData, registrationType) => {
    const dataToSend = { ...registerData, registrationType };
    console.log(registrationType)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
  
      const data = await response.json();
      console.log(data)
  
      if (response.ok) {
        setUser({
          logged: true,
          username: data.username,
          saldo: data.saldo,
          fotoUrl: data.fotoUrl,
          id: data.id,
          esEmpleado: data.esEmpleado
        });
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('fotoUrl', data.photoUrl);
        localStorage.setItem('saldo', data.saldo);
        localStorage.setItem('id', data.id);
        router.push('/', { shallow: true, state: { logged: true }, replace: true });
      } else {
        // Espera 100 milisegundos antes de intentar modificar el mensaje de error
        setTimeout(() => {
          const errorMessageElement = document.getElementById('error-message');
          if (errorMessageElement) {
            errorMessageElement.innerText = data.error || 'Error de registro';
          } else {
            console.error('Elemento error-message no encontrado en el DOM.');
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
    onResetForm();
  }

  const toggleForm = (type) => {
    setRegistrationType(type);
    setShowRegisterForm(true);
  };

  return (
    <div className="login-body">
              <section className="form-login" >
          <Image src={logo} alt="Logo de Twin Bank"/>
          <p id="saludo">¡Bienvenido TwinkBank!</p>
          <p id="nota">Inicia sesión para continuar</p>
          <div id="login-container">
            {showRegisterForm ? <RegisterForm onSubmit={handleRegisterSubmit} registrationType={registrationType}/> : (<form id="login-form" onSubmit={onLogin}>
              <input
                className="controles"
                type="text"
                name="username"
                value={username}
                onChange={onInputChange}
                required
                autoComplete='off'
                placeholder="Usuario"
                id="username"
              />
              <input
                className="controles"
                type="password"
                name="password"
                value={password}
                placeholder="Contraseña"
                onChange={onInputChange}
                autoComplete='off'
                id="password"
              />
              <div className="checkbox-container">
                <input className="controles" type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">Recordar usuario</label>
              </div>
              <button type="submit" className="buttons" id="login-button" >Ingresar</button>
              <p><a href="">¿Olvidaste tu contraseña?</a></p>
              <br />
              <p id="error-message" className="error-message"></p>
              <button className="buttons" onClick={() => toggleForm('existingClient')}>Cliente Existente</button>
              <br />
            <button className="buttons" onClick={() => toggleForm('newClient')}>Nuevo Cliente</button>
            <br />
            <button className="buttons" onClick={() => toggleForm('existingEmployee')}>Empleado Existente</button>
            <br />
            </form>)}
          </div>
        </section>
    </div>
  )
}

export default Login
