import {useEffect, useState} from "react"
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {Layout, Home, Register, Login, PublishItem, Profile, ViewItem, EditItem} from "./components"
import {auth} from "./config/firebase.js"
import {onAuthStateChanged} from "firebase/auth"
import {UserContext} from "./userContext.js"


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
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout/>} >
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/publish" element={<PublishItem/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/items/:id" element={<ViewItem/>}/>
            <Route path="/edit/:item_id" element={<EditItem/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
