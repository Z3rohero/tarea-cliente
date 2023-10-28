import { useState, useEffect } from "react";
import { axiosWithAuth } from "./Token";

export const Task = () => {
  const apiUrl = "https://api-tarea-frrzc.ondigitalocean.app/api/tarea";
  const [tasks, setTasks] = useState([]);
  const user_cod = localStorage.getItem("user_id");
  const [newTask, setNewTask] = useState({
    tarea_titulo: "",
    tarea_descripcion: "",
    tarea_estado: "Pendiente",
    codigo_user: user_cod,
  });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  //obtener los datos
  const fetchTasks = async () => {
    try {
      const response = await axiosWithAuth.get(apiUrl);
      setTasks(response.data.tareas);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axiosWithAuth.post(apiUrl, newTask);
      setNewTask({
        tarea_titulo: "",
        tarea_descripcion: "",
        tarea_estado: "Pendiente",
        codigo_user: "",
      });
      console.log(response);

      console.log(newTask);
      fetchTasks();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const updateTask = async () => {
    if (!editTask) {
      return;
    }

    try {
      const response = await axiosWithAuth.put(
        `${apiUrl}/${editTask.id}`,
        editTask
      );
      setEditTask(null);
      fetchTasks();
      console.log(response);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosWithAuth.delete(`${apiUrl}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editTask) {
              updateTask();
            } else {
              createTask();
            }
          }}
        >
          <div className="field">
            <input
              type="text"
              className="input-field"
              placeholder="Título"
              value={editTask ? editTask.tarea_titulo : newTask.tarea_titulo}
              onChange={(e) =>
                editTask
                  ? setEditTask({ ...editTask, tarea_titulo: e.target.value })
                  : setNewTask({ ...newTask, tarea_titulo: e.target.value })
              }
            />
          </div>

          <div className="field">
            <input
              type="text"
              className="input-field"
              placeholder="Descripción"
              value={
                editTask
                  ? editTask.tarea_descripcion
                  : newTask.tarea_descripcion
              }
              onChange={(e) =>
                editTask
                  ? setEditTask({
                      ...editTask,
                      tarea_descripcion: e.target.value,
                    })
                  : setNewTask({
                      ...newTask,
                      tarea_descripcion: e.target.value,
                    })
              }
            />
          </div>
          <div className="filed">
            <input
              type="text"
              className="input-field"
              placeholder="Estado"
              value={editTask ? editTask.tarea_estado : newTask.tarea_estado}
              onChange={(e) =>
                editTask
                  ? setEditTask({ ...editTask, tarea_estado: e.target.value })
                  : setNewTask({ ...newTask, tarea_estado: e.target.value })
              }
            />
          </div>

          {editTask ? (
            <button className="button" type="submit">
              Actualizar Tarea
            </button>
          ) : (
            <button className="button" type="submit">
              Crear Tarea
            </button>
          )}
        </form>

        <div>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id}>
                  <span className="link_datos" >
                    Título: {task.tarea_titulo} - Descripción:{" "}
                    {task.tarea_descripcion} - Estado: {task.tarea_estado}{" "}
                    Usuario: {task.user_name}
                  </span>
                  <button
                    className="button_task"
                    onClick={() => setEditTask({ ...task })}
                  >
                    Editar
                  </button>
                  <button className="link" onClick={() => deleteTask(task.id)}>
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
    </div>
  );
};
