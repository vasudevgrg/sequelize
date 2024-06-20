import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TodoPages from "./pages/TodoPages";
import Signup from "./pages/Signup";

function App() {

  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/todo" element={<TodoPages/>}/>
    <Route path="/signup" element={<Signup/>} />
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
