
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCORgsFnFq41jizXTk3Y9KqglwxWkp-hi8",
    authDomain: "collection-bf516.firebaseapp.com",
    projectId: "collection-bf516",
    storageBucket: "collection-bf516.appspot.com",
    messagingSenderId: "1086833565818",
    appId: "1:1086833565818:web:39eb979555b347438a5bc3",
    measurementId: "G-YK2HXVZH2W"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const fs = getFirestore(app)

export { auth, fs }