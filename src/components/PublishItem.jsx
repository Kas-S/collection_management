import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Button, Container, Heading
} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
import {useEffect, useContext} from "react"
import {userContext} from "../userContext.js";


function PublishItem() {
    const navigate = useNavigate()
    const user = useContext(userContext)
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])
    return (
        <>
            {user && (
                <Container>
                    <form className="font-sans font-bold bg-emerald-900 mt-4 rounded-lg p-6 text-white flex flex-col items-center text-center">
                        <Heading>Publish New Item</Heading>
                        <FormControl mb={4}>
                            <FormLabel fontSize={24} textAlign="center">Title: </FormLabel>
                            <Input bgColor="white" opacity={0.5} color="black" placeholder="Title"/>
                            <FormHelperText color="slategray">Write title for your item</FormHelperText>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize={24} textAlign="center">Description: </FormLabel>
                            <Textarea bgColor="white" opacity={0.5} color="black" placeholder="Description"></Textarea>
                            <FormHelperText color="slategray">Write proper description</FormHelperText>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize={24} textAlign="center">Image: </FormLabel>
                            <Input type="file" bgColor="white" opacity={0.5} color="black" placeholder="Image"/>
                            <FormHelperText color="slategray">Upload image of your item</FormHelperText>
                        </FormControl>
                        <FormErrorMessage></FormErrorMessage>
                        <Button type="submit">Publish</Button>
                    </form>
                </Container>
            )}
        </>
    );
}

export default PublishItem