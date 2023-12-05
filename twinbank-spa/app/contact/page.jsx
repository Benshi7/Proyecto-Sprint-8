"use client";
import { useRouter } from "next/navigation";
import { useUser } from "../utils/UserContext";
import "./contact.css";
import { useState } from "react";

function contact() {

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre_form = e.target.nombre_form.value;
    const correo_form = e.target.correo_form.value;
    const mensaje_form = e.target.mensaje_form.value;
    const formulario = await fetch(
        `http://localhost:3000/api/formulario/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
                "nombre_f": nombre_form,
                "email_for": correo_form,
                "mensaje_f": mensaje_form
          }),
        }
      ).then((formulario) => formulario.json());
          setIsSent(true)
  };
  const { user } = useUser();
  return (
    <div className="content">
      <div className="main_content">
        <main className="principal">
          <h3>
            Bienvenido{" "}
            <span>{user?.username || localStorage.getItem("username")}</span>
          </h3>

          <h2>Contactanos</h2>
          <div className="contact_conten">
            <form method="post" onSubmit={handleSubmit}>
              <p>
                <label htmlFor="nombre_form">Nombre</label>
                <input
                  type="text"
                  id="nombre_form"
                  name="name"
                  className="inputbox"
                  placeholder="Nombre Completo"
                />
              </p>
              <p>
                <label htmlFor="correo_form">Correo</label>
                <input
                  type="email"
                  id="correo_form"
                  name="correo"
                  className="inputbox"
                  placeholder="Ingrese su Correo"
                />
              </p>
              <p>
                <label htmlFor="mensaje_form">Mensaje</label>
                <textarea
                  name="Mensaje"
                  id="mensaje_form"
                  cols="30"
                  rows="10"
                  placeholder="Ingrese su Mensaje"
                ></textarea>
              </p>
              <p>

              </p>
              {!isSent ? (
                <button className="submitbotton"> Enviar </button>
                ) :
                <h3 style={{color:"green", textShadow:"none", textAlign: "center"} }>El mensaje ha sido enviado ✔</h3>
                }
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default contact;
