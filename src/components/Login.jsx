import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/auth";
import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";


export const Login = () => {

  //const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const[error , setError] = useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://api-tarea-frrzc.ondigitalocean.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const responseBody = await response.text(); // Leer el cuerpo de la respuesta
      
      if (response.ok) {
        const { token } = JSON.parse(responseBody);
        const { user_id } = JSON.parse(responseBody);
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
        alert('Crendeciales correcta formulario ok')
        window.location.href = "/Task";
      } else {
        setError(responseBody); // Guardar el mensaje de error en la variable 'error'
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

          <span className="link"><Link to="/registro">Registrarse</Link></span>
             
          <button type="submit" className="button">
            Enviar
          </button>
        </form>

        {
        error && (
          <span className="error-message">Credenciales inválidas</span>
        )
      }
        
      </div>
    </div>
  );
};
