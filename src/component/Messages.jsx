import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContex } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContex);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);
    return (
        <div className='bg-green-100 p-3 h-[calc(100%-130px)] overflow-y-scroll space-y-5'>
            {messages.map(m => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;