import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Button, Container, Heading
} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
import {useEffect, useContext, useState} from "react"
import {UserContext} from "../userContext.js"
import {fs, st} from "../config/firebase.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {collection, addDoc} from "firebase/firestore"

function PublishItem() {
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [title, setTitle] = useState(""),
          [description, setDescription] = useState(""),
          [image, setImage] = useState(null)
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const storageRef = ref(st, `images/${Date.now() + Math.random()}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (err) => {
                console.error("File upload Failed: ", err)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const dbRef = collection(fs, 'items')
                    addDoc(dbRef, {
                        title: title,
                        description: description,
                        image_url: downloadURL,
                        date: Date.now(),
                        user_id: user.uid
                    })
                        .then(() => {
                            console.log('Successfully published')
                            navigate('/')
                        })
                        .catch((error) => {
                            console.error('Error storing image in Firestore:', error)
                        });
                });
            }
        )
    }

    return (
        <>
            {user && (
                <Container>
                    <form className="font-sans font-bold bg-emerald-900 mt-4 rounded-lg p-6 text-white flex flex-col items-center text-center" onSubmit={handleSubmit} encType="multipart/form-data">
                        <Heading>Publish New Item</Heading>
                        <FormControl mb={4}>
                            <FormLabel fontSize={24} textAlign="center">Title: </FormLabel>
                            <Input bgColor="white" opacity={0.5} color="black" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                            <FormHelperText color="slategray">Write title for your item</FormHelperText>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize={24} textAlign="center">Description: </FormLabel>
                            <Textarea bgColor="white" opacity={0.5} color="black" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></Textarea>
                            <FormHelperText color="slategray">Write proper description</FormHelperText>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize={24} textAlign="center">Image: </FormLabel>
                            <Input type="file" bgColor="white" opacity={0.5} color="black" placeholder="Image" onChange={(e) => setImage(e.target.files[0])}/>
                            <FormHelperText color="slategray">Upload image of your item</FormHelperText>
                        </FormControl>
                        <FormErrorMessage></FormErrorMessage>
                        <Button type="submit">Publish</Button>
                    </form>
                </Container>
            )}
        </>
    );
}

export default PublishItem