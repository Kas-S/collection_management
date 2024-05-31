import {
    FormControl, Input, FormHelperText,
    FormLabel, Container, Button,
    Heading
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, fs, st} from "../../config/firebase.js"
import {doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


function Register() {
    const [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [fullName, setFullName] = useState(""),
          [avatar, setAvatar] = useState(null),
          [status, setStatus] = useState(""),
          navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        if (fullName !== "") {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const storageRef = ref(st, `avatars/${Date.now() + Math.random()}`)
                const uploadTask = uploadBytesResumable(storageRef, avatar)
                uploadTask.on("state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log('Upload is ' + progress + '% done')
                    },
                    (err) => {
                        console.error("Image upload Failed: ", err)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const dbRef = doc(fs, 'users', auth.currentUser.uid)
                            setDoc(dbRef, {
                                fullName: fullName,
                                avatar: downloadURL,
                                user_id: auth.currentUser.uid
                            })
                                .then(() => {
                                    setStatus("Successfully registered")
                                })
                                .catch((err) => {
                                    setStatus("Unknown error. Details in console")
                                    console.error(err)
                                })
                        })
                    }
                )
                navigate('/')
            } catch (err) {
                if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                    setStatus("User with this email already exists")
                } else {
                    setStatus("Unknown error")
                    console.error(err)
                }
            }
        }

    }

    return (
        <Container>
            <form className="bg-white mt-3 p-4 rounded-md flex flex-col items-center" onSubmit={register}>
                <Heading mb="4">Register for Collection</Heading>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        E-mail:
                    </FormLabel>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText>
                        Write your email
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Full Name:
                    </FormLabel>
                    <Input type="text" onChange={(e) => setFullName(e.target.value)} />
                    <FormHelperText>Write your Full Name that will be displayed</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Avatar:
                    </FormLabel>
                    <Input type="file" onChange={(e) => setAvatar(e.target.files[0])}/>
                    <FormHelperText>Upload your avatar (optional)</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="sans-serif" fontSize="xl" fontWeight="bold">
                        Password:
                    </FormLabel>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <FormHelperText>
                        Create your password
                    </FormHelperText>
                </FormControl>
                <p className="text-red-600">{status}</p>
                <Button type="submit">Register</Button>
            </form>
        </Container>

    )
}

export default Register
