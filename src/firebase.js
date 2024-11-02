import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth,
         signInWithEmailAndPassword ,
         signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC3XWqGUtmprHTNOYl_be9wgjCCow0lf4w",
  authDomain: "netflix-clone-c18e6.firebaseapp.com",
  projectId: "netflix-clone-c18e6",
  storageBucket: "netflix-clone-c18e6.appspot.com",
  messagingSenderId: "171422802631",
  appId: "1:171422802631:web:8454b46ba4d1c7fe2994e2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name,email,password)=>{
try {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider:"local",
        email,
    });
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const login = async(email,password) =>{
    try {
         await  signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}


export {auth,db,login,signup,logout};