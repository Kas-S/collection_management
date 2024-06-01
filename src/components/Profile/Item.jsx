import {Card, CardBody, Heading, Highlight, Image, Text, WrapItem} from "@chakra-ui/react";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Item({item}) {
    return (
        <WrapItem>
            <Card>
                <CardBody>
                    <Image src={item.image_url} width="sm" height="sm" alt="Item Image" bgColor="green.500"/>
                    <Heading>{item.title}</Heading>
                    <Text>{item.description}</Text>
                    <Highlight query="spotlight">{item.date}</Highlight>
                    <br/>
                    <Link to={"/items/" + item.item_id} className="bg-emerald-600 p-3 rounded-md">Details</Link>
                </CardBody>
            </Card>
        </WrapItem>
    )
}

export default Item