import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContex = createContext()

export const AuthContexProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user)
        });
        return () => {
            unsub()
        }
    }, []);
    return (
        <AuthContex.Provider value={{ currentUser }}>
            {children}
        </AuthContex.Provider>
    )

}