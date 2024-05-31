import {useEffect, useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {UserContext} from "../userContext.js"
import {Center, Wrap, WrapItem, Card, CardBody, Image, Heading} from "@chakra-ui/react"
import { fs } from "../config/firebase.js"
import {getDoc, doc} from "firebase/firestore"

function Profile() {
    const user = useContext(UserContext),
          navigate = useNavigate(),
          [userData, setUserData] = useState(null),
          [items, setItems] = useState(null)
    useEffect(() => {
        if (!user) navigate('/login')
        else {
            getDoc(doc(fs, 'users', user.uid))
                .then(res => setUserData(res.data()))
        }
    }, [user])
    return (
        <>
            {userData && (
                <Center>
                    <Wrap>
                        <WrapItem>
                            <Card>
                                <CardBody>
                                    <Image src={userData.avatar}/>
                                    <Heading></Heading>
                                </CardBody>
                            </Card>
                        </WrapItem>
                        <WrapItem>
                            <Heading>My Items</Heading>
                            <Wrap>

                            </Wrap>
                        </WrapItem>
                    </Wrap>
                </Center>
            )}
        </>

    )
}

export default Profile