import {useState, useEffect} from "react"
import {getDocs, collection} from "firebase/firestore"
import {fs} from '../config/firebase.js'
import {Card, CardBody, CardFooter, Container, Divider, Heading, Image, Stack} from "@chakra-ui/react"
import {Link} from "react-router-dom"

function Home() {
    const [items, setItems] = useState([])
    useEffect(() => {
        getDocs(collection(fs, 'items'))
            .then(res => {
                let a = []
                res.forEach(doc => {
                    a.push(doc)
                })
                setItems(a)
            })
    }, [])

    useEffect(() => {
        document.title = "Browse Collection"
    }, [])

    return (
        <>
            {items && items.map((item, i) => (
                <Container key={Math.random() + i}>
                    <Card key={i + Math.random()} mt={4}>
                        <CardBody>
                            <Image src={item.data().image_url} width="md" height="md" alt="Item Image" bgColor="green.500"/>
                            <Stack spacing={3} mt={6}>
                                <Heading>{item.data().title}</Heading>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <Link className="p-2 rounded-md bg-emerald-600 text-white" to={"/items/" + item.id}>Details</Link>
                        </CardFooter>
                    </Card>
                </Container>
            ))}
        </>
    )
}

export default Home