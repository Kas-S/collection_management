import {useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import {UserContext} from "../userContext.js"

function Profile() {
    const user = useContext(UserContext),
          navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])
    return (
        <></>
    )
}

export default Profile