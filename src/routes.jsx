import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { TaskPage } from "./Pages/TaskPage";

export const Rutas = () => {
  //const isAuthenticated = !!localStorage.getItem("token"); // Cambia esto según tu lógica de autenticación.
  /*
     <Route path="/Task" element={isAuthenticated ? <TaskPage /> : <Navigate to="/" />  }
          />

   */
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/Task" element={<TaskPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
