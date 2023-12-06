import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase.config';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = async () => {
            try {
                const docRef = doc(db, "userChats", currentUser.uid);
                const unsub = onSnapshot(docRef, (doc) => {
                    if (doc.exists()) {
                        setChats(doc.data());
                    } else {
                        setChats([]);
                    }
                });
                return () => unsub();
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handelSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <div>
            {Object.values(chats).sort((a, b) => b.date - a.date).map((chat) => (
                <div key={chat[0]} onClick={() => handelSelect(chat.userInfo)} className='p-3 flex items-center g-10 text-white cursor-pointer hover:bg-green-600'>
                    <img className='h-16 w-16 rounded-full object-cover' src={chat.userInfo.photoURL} alt="" />
                    <div className='hover:bg-green-600'>
                        <span className='ps-2 text-xl font-semibold'>{chat.userInfo.displayName}</span>
                        <p className='ps-2'>{chat.lastMessage?.text} </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Chats;
