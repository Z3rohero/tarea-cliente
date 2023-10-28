import { useState, useEffect } from "react";
import { axiosWithAuth } from "./Token";

export const Task = () => {
  const url = "https://api-tarea-frrzc.ondigitalocean.app/api/tarea";
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({
    tarea_titulo: "",
    tarea_descripcion: "",
    tarea_estado: "Pendiente",
    codigo_user: 1,
  });
  const [editarTarea, setEditarTarea] = useState(null);

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
      const respuesta = await axiosWithAuth.get(url);
      setTareas(respuesta.data.tareas);
      console.log(respuesta.data.tareas);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const crearTarea = async () => {
    try {
      console.log("Cuerpo de nueva tarea:", nuevaTarea);
      const respuesta = await axiosWithAuth.post(url, nuevaTarea);
      console.log(respuesta.data.nuevaTarea);
      setNuevaTarea({
        tarea_titulo: "",
        tarea_descripcion: "",
        tarea_estado: "Pendiente",
        codigo_user: 1,
      });
      obtenerTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const actualizarTarea = async () => {
    if (!editarTarea) {
      return;
    }

    try {
      const respuesta = await axiosWithAuth.put(
        `${url}/${editarTarea.id}`,
        editarTarea
      );
      console.log(respuesta.data);
      setEditarTarea(null);
      obtenerTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axiosWithAuth.delete(`${url}/${id}`);
      obtenerTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="container">
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editarTarea) {
              actualizarTarea();
            } else {
              crearTarea();
            }
          }}
        >
          <div className="field">
            <input
              type="text"
              className="input-field "
              placeholder="Título"
              value={nuevaTarea.tarea_titulo}
              onChange={(e) =>
                setNuevaTarea((prevState) => ({
                  ...prevState,
                  tarea_titulo: e.target.value,
                }))
              }
            />
          </div>

          <div className="field">
            <input
              type="text"
              className="input-field "
              placeholder="Descripción"
              value={nuevaTarea.tarea_descripcion}
              onChange={(e) =>
                setNuevaTarea((prevState) => ({
                  ...prevState,
                  tarea_descripcion: e.target.value,
                }))
              }
            />
          </div>
          <div className="field">
            <input
              type="text"
              className="input-field"
              placeholder="Estado"
              value={nuevaTarea.tarea_estado}
              onChange={(e) =>
                setNuevaTarea((prevState) => ({
                  ...prevState,
                  tarea_estado: e.target.value,
                }))
              }
            />
          </div>

          {editarTarea ? (
            <button className="button" type="submit">
              Actualizar Tarea
            </button>
          ) : (
            <button className="button" type="submit">
              Crear Tarea
            </button>
          )}
        </form>

        <ul>
          {Array.isArray(tareas) && tareas.length > 0 ? (
            tareas.map((tarea) => (
              <li key={tarea.id}>
                <span className="link_datos">
                  Título: {tarea.tarea_titulo} - Descripción:{" "}
                  {tarea.tarea_descripcion} - Estado: {tarea.tarea_estado} -
                  Nombre usuario: {tarea.user_name}
                </span>
                <button
                  className="button_task"
                  onClick={() => {
                    setEditarTarea({ ...tarea });
                    setNuevaTarea({
                      tarea_titulo: tarea.tarea_titulo,
                      tarea_descripcion: tarea.tarea_descripcion,
                    });
                  }}
                >
                  Editar
                </button>
                <button
                  className="link"
                  onClick={() => {
                    eliminarTarea(tarea.id);
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <li className="error-message">No hay tareas disponibles</li>
          )}
        </ul>
      </div>
    </div>
  );
};
