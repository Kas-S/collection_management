import {
    Button, Container, FormControl,
    FormHelperText, FormLabel, Heading,
    Input
} from "@chakra-ui/react"
import {useState} from "react"
import {auth} from "../../config/firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth"

function Login () {
    const [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [status, setStatus] = useState("")

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container>
            <form className="bg-white mt-3 p-4 rounded-md flex flex-col items-center">
                <Heading mb="4">Log In</Heading>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Login:
                    </FormLabel>
                    <Input type="login" onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText>
                        Write email you used as login
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Password:
                    </FormLabel>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <FormHelperText>
                        Write you password
                    </FormHelperText>
                </FormControl>
                <p className="text-red-600">{status}</p>
                <Button onClick={login}>Register</Button>
            </form>
        </Container>
    )
}

export default Login