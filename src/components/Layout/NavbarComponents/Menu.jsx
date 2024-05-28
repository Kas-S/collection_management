import {
    Button, Drawer, DrawerOverlay, DrawerFooter, useDisclosure,
    DrawerCloseButton, DrawerHeader, DrawerContent
} from "@chakra-ui/react"
import {useRef} from "react"



function Menu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
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