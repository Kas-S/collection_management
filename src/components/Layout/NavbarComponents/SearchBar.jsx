import {InputGroup, Input, InputRightElement, Button} from "@chakra-ui/react";

function SearchBar() {
    return (
        <InputGroup className="search">
            <Input type="search" placeholder="Search" />
            <InputRightElement width="4.5rem">
                <Button>Search</Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar