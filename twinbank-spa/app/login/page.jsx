'use client'
import { React } from 'react'
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
    e.preventDefault()
/*     const foundUser2 = usuariosData.find(
      (usuario) => usuario.username === username && usuario.password === password
    ) */
    const res = await fetch(`http://localhost:3000/api/usuarios/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json())
    console.log(res)

    const foundUser = res.find(
      (usuario) => usuario.username === username && usuario.password === password
    )
    console.log(foundUser)
      if (foundUser) {
      setUser({
        logged: true,
        username: foundUser.username,
        saldo: foundUser.saldo,
        fotoUrl: foundUser.fotoUrl,
        id: foundUser.id,
      })
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('fotoUrl', foundUser.photoUrl)
      localStorage.setItem('saldo', foundUser.saldo)
      localStorage.setItem('id', foundUser.id)
      router.push('/', { shallow: true, state: { logged: true }, replace: true })
    } else {
      document.getElementById('error-message').innerText =
      'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.'
    }
    onResetForm()

  }

  const onLogin2 = async (e) => {
    e.preventDefault()

      const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.4.4'},
        body: 'false'
      };

      const res = await fetch('http://127.0.0.1:8000/api/usuarios/', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
      console.log(res)
    }

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
