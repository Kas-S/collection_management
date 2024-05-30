import {createContext, useEffect, useState} from "react"
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {Layout, Home, Register, Login, PublishItem, Profile} from "./components"
import {auth} from "config/firebase.js"
import {onAuthStateChanged} from "firebase/auth"

export const userContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
      } else setUser(null)
    })
  }, [])
  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout/>} >
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/publish" element={<PublishItem/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
