import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase/firebase.config';
import { AuthContex } from '../context/AuthContext';
import { ChatContex } from '../context/ChatContext';

function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContex);
    const { dispatch } = useContext(ChatContex)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
                console.log(doc.data());
            });
            return () => {
                unsub()
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);


    const handelSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }

    return (
        <div>
            {Object.entries(chats)?.sort((a, b) =>b[1].date-a[1].date).map((chat) => (
                <div key={chat[0]} onClick={() => handelSelect(chat[1].userInfo)} className='p-3 flex items-center g-10 text-white cursor-pointer hover:bg-green-600'>
                    <img className='h-16 w-16 rounded-full object-cover' src={chat[1].userInfo.photoURL} alt="" />
                    <div className='hover:bg-green-600'>
                        <span className='ps-2 text-xl font-semibold'>{chat[1].userInfo.displayName}</span>
                        <p className='ps-2'>{chat[1].lastMessage?.text} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats