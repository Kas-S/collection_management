import {
    FormControl, Input, FormHelperText,
    FormLabel, Container, Button,
    Heading
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase.js"


function Register() {
    const [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [status, setStatus] = useState(""),
          navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setStatus("User with this email already exists")
            } else {
                setStatus("Unknown error")
                console.error(err)
            }
        }
    }

    return (
        <Container>
            <form className="bg-white mt-3 p-4 rounded-md flex flex-col items-center" onSubmit={register}>
                <Heading mb="4">Register for Collection</Heading>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Email:
                    </FormLabel>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText>
                        Create your login
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Password:
                    </FormLabel>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <FormHelperText>
                        Create your password
                    </FormHelperText>
                </FormControl>
                <p className="text-red-600">{status}</p>
                <Button type="submit">Register</Button>
            </form>
        </Container>

    )
}

export default Register
