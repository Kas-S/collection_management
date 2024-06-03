import {useState, useEffect} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import {Container, FormControl, Input, FormLabel, Textarea, Button} from "@chakra-ui/react"
import {doc, getDoc, updateDoc} from "firebase/firestore"
import {uploadBytesResumable, getDownloadURL, ref} from "firebase/storage"
import {fs, st} from "../config/firebase.js"



function EditItemForm({item}) {
    const [title, setTitle] = useState(item.title),
          [description, setDescription] = useState(item.description),
          [img, setImg] = useState(null)

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        const data = {
            title: title,
            description: description,
            image_url: item.image_url,
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
            <FormControl>
                <FormLabel for="itemTitle" fontWeight="bold">Title</FormLabel>
                <Input name="itemTitle" id="itemTitle" value={item.title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl mt={3}>
                <FormLabel for="itemDescription" fontWeight="bold">Description</FormLabel>
                <Textarea name="itemDescription" id="itemDescription" onChange={(e) => setDescription(e.target.value)} value={item.description}>

                </Textarea>
            </FormControl>
            <FormControl mt={3}>
                <FormLabel for="itemImage" fontWeight="bold">Image</FormLabel>
                <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
            </FormControl>
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
