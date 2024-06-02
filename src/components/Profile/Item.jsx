import {Card, CardBody, Heading, Highlight, Image, Text, Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"

// eslint-disable-next-line react/prop-types
function Item({item, delete_item}) {
    return (
        <Card>
            <CardBody flex={1} flexDirection="column" alignItems="center" justifyContent="center">
                <Image src={item.image_url} width="sm" height="sm" alt="Item Image" bgColor="green.500" flex={1}/>
                <Heading>{item.title}</Heading>
                <Text>{item.description}</Text>
                <Highlight query="spotlight">{item.date}</Highlight>
                <br/>
                <Link to={"/items/" + item.item_id} className="bg-emerald-600 p-3 rounded-md">Details</Link>
                <Button bg="red" color="white" onClick={() => delete_item(item.item_id)}>Delete</Button>
            </CardBody>
        </Card>
    )
}

export default Item