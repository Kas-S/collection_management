import {useEffect, useContext, useState} from "react"
import Item from "./Item.jsx"
import {UserContext} from "../../userContext.js"
import {Container, Card, CardBody, Image, Heading, SimpleGrid} from "@chakra-ui/react"
import { fs } from "../../config/firebase.js"
import {getDoc, doc, getDocs, collection, deleteDoc} from "firebase/firestore"

function Profile() {
    const user = useContext(UserContext),
          [userData, setUserData] = useState(null),
          [items, setItems] = useState(undefined)
    useEffect(() => {
        if (user){
            update_items()
            getDoc(doc(fs, 'users', user.uid))
                .then(res => setUserData(res.data()))
        }
    }, [user])

    const update_items = () => {
        let a = []
        getDocs(collection(fs, `users/${user.uid}/items/`))
            .then(res => {
                res.forEach(doc => {
                    a.push(doc.data())
                })
            })
        setItems(a)
    }

    const delete_item = async(item_id) => {
        await deleteDoc(doc(fs, `items/${item_id}`))
        await deleteDoc(doc(fs, `users/${user.uid}/items/${item_id}`))
        update_items()
    }

    return (
        <>
            {userData && (
                <Container textAlign="center" size="max-content">
                    <Card display="block">
                        <CardBody>
                            <Image src={userData.avatar}/>
                            <Heading>{userData.fullName}</Heading>
                        </CardBody>
                    </Card>
                    <br/>
                    <Heading>My Items</Heading>
                    <SimpleGrid columns={2} spacing={10} minChildWidth={1}>
                        {items.map((item, index) => (<Item key={index + Math.random()} item={item} delete_item={delete_item}/>))}
                    </SimpleGrid>
                </Container>
            )}
        </>

    )
}

export default Profile