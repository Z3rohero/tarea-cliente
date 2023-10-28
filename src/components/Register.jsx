import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Asegúrate de importar zodResolver
import "./style.css";
import { registerSchema } from "../schema/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { Link } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Asegúrate de que has importado y definido watch correctamente
  } = useForm({
    resolver: zodResolver(registerSchema), // Asegúrate de que has definido registerSchema
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://api-tarea-frrzc.ondigitalocean.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [name, setName] = useState(""); // Add name state

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="welcome">Hello {name ? name : "World"}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input
              type="text"
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
              className="input-field"
              placeholder="Nombre de usuario"
              name="name"
              onChange={handleNameChange}
            />
          </div>

          <div className="field">
            <input
              type="email"
              className="input-field"
              {...register("email", { required: "Este campo es obligatorio" })}
              placeholder="Correo electrónico"
            />
          </div>

          <div className="field">
            <input
              type="password"
              className="input-field"
              {...register("password", {
                required: "Este campo es obligatorio",
              })}
              placeholder="Contraseña"
            />
          </div>

          <div className="field">
            <input
              type="password"
              className="input-field"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
              })}
              placeholder="Confirmar contraseña"
            />
            {errors.password_confirmation && (
              <span className="MessagerAlert">
                {errors.password_confirmation.message}
              </span>
            )}
          </div>
          <button type="submit" className="button">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
