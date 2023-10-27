import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Asegúrate de importar zodResolver
import "./style.css";
import { registerSchema } from "../schema/auth";
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
        alert("El formulario se envió correctamente");
        // Redirige al usuario a la página de inicio de sesión
        navigate("/");
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input
              type="text"
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
              className="input-field"
              placeholder="Nombre de usuario"
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
