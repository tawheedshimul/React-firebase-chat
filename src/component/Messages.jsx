import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import { db } from "../firebase/firebase.config";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const chatDocRef = doc(db, "chats", data.chatId);
    
    const unSub = onSnapshot(chatDocRef, (doc) => {
      if (doc.exists()) {
        const messagesData = doc.data()?.message || [];
        setMessages(messagesData);
      } else {
        // Handle the case where the document doesn't exist
        console.log("Document does not exist");
        setMessages([]);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className='bg-green-100 p-3 h-[calc(100%-130px)] overflow-y-scroll space-y-5'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;

