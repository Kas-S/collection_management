import {useState, useEffect} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import {Container, FormControl, Input, FormLabel, Textarea, Button, Select, FormHelperText} from "@chakra-ui/react"
import {doc, getDoc, updateDoc} from "firebase/firestore"
import {uploadBytesResumable, getDownloadURL, ref} from "firebase/storage"
import {fs, st} from "../config/firebase.js"
import categories from "../assets/categories.json";

function FormPart(props) {
    return (
        <FormControl mb={4}>
            <FormLabel fontSize={24} textAlign="center">{props.label}</FormLabel>
            {props.children}
            <FormHelperText textColor="slategray">{props.helper}</FormHelperText>
        </FormControl>
    )
}

function EditItemForm({item}) {
    const [title, setTitle] = useState(item.title),
          [description, setDescription] = useState(item.description),
          [category, setCategory] = useState(item.category),
          [img, setImg] = useState(null)

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        const data = {
            title: title,
            description: description,
            image_url: item.image_url,
            category: category,
            date: item.date,
            user_id: item.user_id,
            item_id: item.item_id
        }
        if (img) {
            const storageRef = ref(st, `images/${Date.now() + Math.random()}`)
            const uploadTask = uploadBytesResumable(storageRef, img)
            uploadTask.on("state_changed",
                () => {},
                (err) => {
                    console.error("Error while uploading", err)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        data.image_url = downloadURL
                        updateDoc(doc(fs, 'items', item.item_id), data)
                        updateDoc(doc(fs, `users/${item.user_id}/items/${item.item_id.toString()}`), data)
                        navigate('../../profile')
                    })
                })
        } else {
            updateDoc(doc(fs, 'items', item.item_id), data)
            updateDoc(doc(fs, `users/${item.user_id}/items/${item.item_id.toString()}`), data)
            navigate('../../profile')
        }
    }
    return (
        <form encType="multipart/form-data" onSubmit={submitHandler} className="bg-white p-4 rounded-md mt-2 font-bold">
            <FormPart label="Title:" helper="Write title for your item">
                <Input bgColor="white" opacity={0.5} color="black" placeholder="Title" onChange={(e) => setTitle(e.target.value)} defaultValue={item.title} />
            </FormPart>
            <FormPart label="Description:" helper="Write description for your item">
                <Textarea bgColor="white" opacity={0.5} color="black" placeholder="Description" onChange={(e) => setDescription(e.target.value)} defaultValue={item.description}></Textarea>
            </FormPart>
            <FormPart label="Category:" helper="Choose category of your item">
                <Select onChange={(e) => setCategory(e.target.value)} defaultValue={item.category}>
                    {categories.map((c, i) => (
                        <option value={c} key={i}>{c}</option>
                    ))}
                </Select>
            </FormPart>
            <FormPart label="Image: " helper="Upload image of your item">
                <Input type="file" bgColor="white" opacity={0.5} color="black" placeholder="Image" onChange={(e) => setImg(e.target.files[0])}/>
            </FormPart>
            <Button type="submit" mt={3}>Edit</Button>
        </form>
    )
}

function EditItem() {
    const {item_id} = useParams(),
          [item, setItem] = useState(undefined)
    useEffect(() => {
        getDoc(doc(fs, `items/${item_id}`))
            .then(res => {
                setItem(res.data())
            })
    }, [item_id])
    return (
        <>
            {item && (
                <Container>
                    <EditItemForm item={item}/>
                </Container>
            )}
        </>

    )
}

export default EditItem
