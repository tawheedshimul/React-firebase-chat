// Messages.js
import { doc, onSnapshot, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContex } from "../context/ChatContext";
import { db } from "../firebase/firebase.config";
import Message from "./Message";

const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContex);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const unsubscriber = onSnapshot(collection(db, "chats"), (snapshot) => {
      snapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setMessages(getPostsFromFirebase);
      setLoading(false);
    });
    return () => unsubscriber();
  }, []); // Removed 'loading' from the dependency array to avoid unnecessary re-renders

  if (loading) {
    return <h1>Data is Loading...</h1>;
  }

  console.log(messages)

  return (
    <div className='bg-green-100 p-3 h-[calc(100%-130px)] overflow-y-scroll space-y-5'>
      {messages.length}
      
      {messages.length > 0 ? (
        messages.map((m) => <Message message={m} key={m.id} />)
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default Messages;
