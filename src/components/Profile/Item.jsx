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
                <Link to={"/items/" + item.item_id} className="bg-emerald-600 p-3 rounded-md text-white font-bold mr-3 mt-3">Details</Link>
                <Link to={"/edit/" + item.item_id} className="bg-amber-500 p-3 rounded-md text-white font-bold mr-3">Edit</Link>
                <button type="button" className="bg-red-600 p-3 rounded-md text-white font-bold mt-3" onClick={() => delete_item(item.item_id)}>Delete</button>
            </CardBody>
        </Card>
    )
}

export default Item