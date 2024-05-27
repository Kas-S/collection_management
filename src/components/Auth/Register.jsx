import {
    FormControl,
    Input,
    FormHelperText,
    FormLabel,
    Container,
    Button,
    Heading
} from "@chakra-ui/react";

function Register() {
    return (
        <Container>
            <form className="bg-white mt-3 p-4 rounded-md flex flex-col items-center">
                <Heading mb="4">Register for Collection</Heading>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Login:
                    </FormLabel>
                    <Input type="login"/>
                    <FormHelperText>
                        Create your login
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Password:
                    </FormLabel>
                    <Input type="password"/>
                    <FormHelperText>
                        Create your password
                    </FormHelperText>
                </FormControl>
                <Button>Register</Button>
            </form>
        </Container>

    )
}

export default Register
