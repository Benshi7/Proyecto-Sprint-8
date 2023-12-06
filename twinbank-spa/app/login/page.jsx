'use client'
import { React, useEffect } from 'react'
import './Login.css'
import { useForm } from '../hooks/useForm'
import Image from 'next/image'
// import { useNavigate } from 'react-router-dom'
import usuariosData from '../utils/usuarios.json'
import { useUser } from '../utils/UserContext'
import { useRouter } from 'next/navigation'
import logo from '../assets/logo.png'

const Login = () => {
  // const navigate = useNavigate()
  const { setUser } = useUser()

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
      const response = await fetch('http://127.0.0.1:8000/api/login', {
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
  };


  return (
    <div className="login-body">
              <section className="form-login" >
          <Image src={logo} alt="Logo de Twin Bank"/>
          <p id="saludo">¡Bienvenido TwinkBank!</p>
          <p id="nota">Inicia sesión para continuar</p>
          <div id="login-container">
            <form id="login-form" onSubmit={onLogin}>
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
            </form>
          </div>
        </section>
    </div>
  )
}

export default Login
