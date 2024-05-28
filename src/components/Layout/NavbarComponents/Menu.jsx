import {
    Button, Drawer, DrawerOverlay, DrawerFooter, useDisclosure,
    DrawerCloseButton, DrawerHeader, DrawerContent, DrawerBody,
    Divider
} from "@chakra-ui/react"
import {useRef} from "react"
import {auth} from "../../../config/firebase.js"
import {signOut} from "firebase/auth"

function Menu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                <span className="material-symbols-outlined">menu</span>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Divider/>
                        <Button onClick={logout}>Log Out</Button>
                    </DrawerBody>


                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Menu