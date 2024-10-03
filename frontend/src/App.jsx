import NavBar from "./pages/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Students from "./pages/Students";
import DashBoard from "./pages/DashBoard";
import Teachers from "./pages/Teachers";


function App() {
  return (
    <BrowserRouter>
      <main className="main">

    
    
      <NavBar/>

      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/estudiantes" element={<Students/>}/>
        <Route path="/profesores" element={<Teachers/>}/>

      </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
