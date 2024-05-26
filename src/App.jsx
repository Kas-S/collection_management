import {Route, Routes, BrowserRouter} from "react-router-dom"
import {Layout, Home, Register, Login} from "./components"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" component={<Layout/>} >
          <Route index component={<Home/>}/>
          <Route path="/login" component={<Login/>}/>
          <Route path="/register" component={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
