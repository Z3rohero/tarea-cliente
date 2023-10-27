import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { LoginPage } from './Pages/LoginPage'; 
import { RegisterPage } from './Pages/RegisterPage'; // Importa el componente LoginPage



function App() {
  return (
    <BrowserRouter>
      <main >
        <Routes>
          <Route path="/" element={<LoginPage/>} /> 
          <Route path="/registro" element={<RegisterPage/>} /> 
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;