// Register.js

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../../firebase/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import add from "../../assets/addavatar.png";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleUpload = (storageRef, file) => {
        return new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Handle progress if needed
                },
                (error) => {
                    setErr(true);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error) {
                        setErr(true);
                        reject(error);
                    }
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, `avatars/${res.user.uid}/${file.name}`);

            const downloadURL = await handleUpload(storageRef, file);

            await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/');
        } catch (error) {
            setErr(true);
            console.error(error);
        }
    };


    return (
        <div>
            <div className="p-10 max-w-md mx-auto bg-white rounded shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-8">TawheedChat</h1>
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="username" className="block">Username:</label>
                    <input type="text" id="username" name="username" className="w-full border rounded py-2 px-3" />

                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" id="email" name="email" className="w-full border rounded py-2 px-3" />

                    <label htmlFor="password" className="block">Password:</label>
                    <input type="password" id="password" name="password" className="w-full border rounded py-2 px-3" />

                    <input style={{ display: "none" }} type="file" name="avatar" id="file" />
                    <label htmlFor="file" className="flex items-center space-x-2 cursor-pointer">
                        <img className='h-14 w-14' src={add} alt="Add Avatar" />
                        <span>Add an avatar</span>
                    </label>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
                    {err && <span> Something went Wrong </span>}
                </form>

                <p className="text-center mt-4">You already have an account? <a href="#" className="text-blue-500">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
