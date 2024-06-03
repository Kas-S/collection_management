import {useParams} from 'react-router-dom'
import {useState, useEffect} from "react"
import {getDoc, doc} from "firebase/firestore"
import {fs} from "../config/firebase.js"
import {Card, CardBody, Container, Heading, Image, Text} from "@chakra-ui/react";

function ViewItem() {
    const params = useParams()
    const [item, setItem] = useState(null),
          [author, setAuthor] = useState("")

    useEffect(() => {
        getDoc(doc(fs, 'items', params.id))
        .then(res => {
            setItem(res.data())
        })
        getDoc(doc(fs, "users", item.user_id))
            .then(res => {
                setAuthor(res.data().fullName)
            })
    }, [])

    useEffect(() => {
        if (item)
            document.title = `${item.title} - Collection`
    }, [item])

    return (
        <>
            {item && (
                <Container>
                    <Card>
                        <CardBody flex={1} flexDirection="column" alignItems="center" textAlign="center">
                            <Image src={item.image_url} width="lg" height="lg"/>
                            <Heading>{item.title}</Heading>
                            <p>{item.date}</p>
                            <p className="font-bold">{author}</p>
                            <Text>{item.description}</Text>
                        </CardBody>
                    </Card>
                </Container>
            )}
        </>

    )
}

export default ViewItem