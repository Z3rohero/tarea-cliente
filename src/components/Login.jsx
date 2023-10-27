import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/auth";
import { Link } from "react-router-dom";

import "./style.css";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });




  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://api-tarea-frrzc.ondigitalocean.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      const { token } = await response.json();
      localStorage.setItem("token", token);
      if (response.ok) {
        alert("El formulario se envió correctamente");
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input
              type="email"
              className="input-field"
              {...register("email", { required: "Este campo es obligatorio" })} // Agregar mensajes de error personalizados
              placeholder="Correo electrónico"
            />
            <br></br>
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="field">
            <input
              type="password"
              className="input-field"
              {...register("password", {
                required: "Este campo es obligatorio",
              })} // Agregar mensajes de error personalizados
              placeholder="Contraseña"
            />
            <br></br>

            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          <button className>
            <Link to="/registro">Registrarse</Link>{" "}
            {/* Enlace a la página de registro */}
          </button>
          <button type="submit" className="button">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
