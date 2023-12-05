// por ahora no se están usando porque las cambie a funciones de Estado, pero por las dudas las dejo acá

export const getSaldoActual = () => {
  const saldoActual = document.getElementById('saldo-actual')
  const saldo = parseFloat(localStorage.getItem('saldo'))

  if (!isNaN(saldo)) {
    saldoActual.textContent = `$${saldo.toFixed(0)}` // Muestra el saldo con formato
  } else {
    saldoActual.textContent = 'Saldo no disponible'
  }
  const consumoActual = document.getElementById('consumo-actual')
  consumoActual.textContent = `$${localStorage.getItem('numeroAleatorio')}`
}

export const getFoto = () => {
  const fotoUrl = localStorage.getItem('fotoUrl')
  const profileImage = document.getElementById('profile-image')
  if (fotoUrl) {
    profileImage.src = fotoUrl
  }
}

export const logOut = () => {
  const logoutButton = document.getElementById('logout-button')
  logoutButton.addEventListener('click', function () {
    localStorage.removeItem('usuarioLogueado')
    localStorage.removeItem('perfilUrl')
    localStorage.removeItem('numeroAleatorio')
    window.location.href = '/login'
  })
}
