import {
    Button, Drawer, DrawerOverlay, DrawerFooter, useDisclosure,
    DrawerCloseButton, DrawerHeader, DrawerContent, DrawerBody,
    Divider
} from "@chakra-ui/react"
import {useRef} from "react"
import {Link} from "react-router-dom"
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
                    <DrawerHeader>{auth?.currentUser.email}</DrawerHeader>

                    <DrawerBody display="flex" flexDirection="column" alignItems="center">
                        <br/>
                        <Link to="/profile" className="my-3">Profile</Link>
                        <Link to="/publish" className="my-3">Publish Item</Link>
                        <Divider my={3}/>
                        <Button onClick={logout}>Log Out</Button>
                    </DrawerBody>


                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Menu