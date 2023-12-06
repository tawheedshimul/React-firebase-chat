import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { db } from '../firebase/firebase.config';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function Search() {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);


    const { currentUser } = useContext(AuthContext);

    const handleSearch = useCallback(async () => {
        if (userName.trim() === '') {
            setUser(null);
            return;
        }

        setLoading(true);
        setErr(false);

        const q = query(collection(db, "users"), where("displayName", "==", userName));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            setErr(true);
        } finally {
            setLoading(false);
        }
    }, [userName]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const handleInputChange = e => {
        setUserName(e.target.value);
    };

    const handleSelected = async () => {
        const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combineId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combineId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineId]: {
                        userInfo: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        },
                        date: serverTimestamp()
                    }
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId]: {
                        userInfo: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL
                        },
                        date: serverTimestamp()
                    }
                });
            }
        } catch (err) {
            // Handle the error appropriately, e.g., log it or show a user-friendly message.
            console.error(err);
        }
        setUser(null);
        setUserName("");
    };



    return (
        <div className='border-b border-gray-100'>
            <div className="flex opacity-60 rounded items-center justify-center bg-gray-800 ">
                <input
                    className="bg-transparent w-full border-none text-white p-4 outline-none rounded-md placeholder-gray-500"
                    placeholder="Find a user"
                    type="text"
                    onChange={handleInputChange}
                    value={userName}
                />
            </div>
            {loading && <span><LoadingSpinner/></span>}
            {err && <span>User Not Found</span>}
            {user &&
                <div
                    onClick={handleSelected}
                    className='p-3 flex items-center g-10 text-white cursor-pointer hover:bg-green-600'>
                    <img className='h-16 w-16 rounded-full object-cover' src={user.photoURL} alt="" />
                    <div>
                        <span className='ps-2'>{user.displayName}</span>
                    </div>
                </div>}
        </div>
    );
}

export default Search;
