import {useState, useEffect} from "react"
import {getDocs, collection, query, where} from "firebase/firestore"
import {fs} from '../config/firebase.js'
import {Card, CardBody, CardFooter, Container, Divider, Heading, Image, Select, Stack} from "@chakra-ui/react"
import {Link} from "react-router-dom"

function Home() {
    const [items, setItems] = useState([]),
          [currentCategory, setCurrentCategory] = useState("")
    useEffect(() => {
        if (currentCategory === "") {
            getDocs(collection(fs, 'items'))
                .then(res => {
                    let a = []
                    res.forEach(doc => {
                        a.push(doc)
                    })
                    setItems(a)
                })
        } else {
            getDocs(query(collection(fs, 'items'), where("category", "==", currentCategory)))
                .then(res => {
                    let a = []
                    res.forEach(doc => {
                        a.push(doc)
                    })
                    setItems(a)
                })
        }
    }, [currentCategory])

    useEffect(() => {
        document.title = "Browse Collection"
    }, [])


    return (
        <>
            <Container>
                <Heading textColor="white" mt={3}>Filter by Category</Heading>
                <form>
                    <Select onChange={(e) => setCurrentCategory(e.target.value)}>
                        <option value=""></option>
                        <option value="Art">Art</option>
                        <option value="Tech">Tech</option>
                        <option value="Household">Household</option>
                        <option value="Car">Car</option>
                        <option value="Books">Books</option>
                    </Select>
                </form>
            </Container>
            {items && items.map((item, i) => (
                <Container key={Math.random() + i}>

                    <Card key={i + Math.random()} mt={4}>
                        <CardBody>
                            <Image src={item.data().image_url} width="md" height="md" alt="Item Image" bgColor="green.500"/>
                            <Stack spacing={3} mt={6}>
                                <Heading>{item.data().title}</Heading>
                                <p className="text-xl font-bold">{item.data().category}</p>
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