import {
    FormControl,
    Input,
    FormHelperText,
    FormLabel,
    Container,
    Button,
    Heading
} from "@chakra-ui/react";
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase.js"

function Register() {
    const [email, setEmail] = useState(""),
          [password, setPassword] = useState("")

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container>
            <form className="bg-white mt-3 p-4 rounded-md flex flex-col items-center">
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
                <Button onClick={register}>Register</Button>
            </form>
        </Container>

    )
}

export default Register
