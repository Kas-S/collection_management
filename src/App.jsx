import {Route, Routes, BrowserRouter} from "react-router-dom"
import {Layout, Home, Register, Login} from "./components"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
