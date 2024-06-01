import {useEffect, useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {UserContext} from "../userContext.js"
import {Container, Wrap, WrapItem, Card, CardBody, Image, Heading, Text, Highlight} from "@chakra-ui/react"
import { fs } from "../config/firebase.js"
import {getDoc, doc, getDocs, collection} from "firebase/firestore"

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

    useEffect(() => {
        if (user) {
            let a = []
            getDocs(collection(fs, `users/${user.uid}/items/`))
                .then(res => {
                    res.forEach(doc => {
                        a.push(doc.data())
                    })
                })
            setItems(a)
        }

    }, []);

    console.log(items)

    return (
        <>
            {userData && (
                <Container>
                    <Card display="block">
                        <CardBody>
                            <Image src={userData.avatar}/>
                            <Heading>{userData.fullName}</Heading>
                        </CardBody>
                    </Card>
                    <br/>
                    <Heading>My Items</Heading>
                    <Wrap>

                        <>
                            {items && items.map((item, index) => (
                                <WrapItem key={Math.random() + index}>
                                    <Card>
                                        <CardBody>
                                            <Image src={item.image_url} width="sm" height="sm" alt="Item Image" bgColor="green.500"/>
                                            <Heading>{item.title}</Heading>
                                            <Text>{item.description}</Text>
                                            <Highlight query="spotlight">{item.date}</Highlight>
                                        </CardBody>
                                    </Card>
                                </WrapItem>
                            ))}
                        </>
                    </Wrap>
                </Container>
            )}
        </>

    )
}

export default Profile