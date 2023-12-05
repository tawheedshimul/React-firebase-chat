// // Messages.js
// import { doc, onSnapshot, collection } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { ChatContex } from "../context/ChatContext";
// import { db } from "../firebase/firebase.config";
// import Message from "./Message";

// const Messages = () => {
//   const [loading, setLoading] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const { data } = useContext(ChatContex);

//   useEffect(() => {
//     const unsubscriber = onSnapshot(collection(db, "chats"), (snapshot) => {
//       const messagesData = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         key: doc.id,
//       }));
//       setMessages(messagesData.flat(1)); // Use flat with a depth of 1 to flatten the array
//       setLoading(false);
//     });
  
//     return () => unsubscriber();
//   }, []);
  

//   if (loading) {
//     return <h1>Data is Loading...</h1>;
//   }

//   console.log(messages);

//   return (
//     <div className='bg-green-100 p-3 h-[calc(100%-130px)] overflow-y-scroll space-y-5'>
//       {messages.length > 0 ? (
//         messages.map((m) => <Message message={m} key={m.key} />)
//       ) : (
//         <p>No messages yet.</p>
//       )}
//     </div>
//   );
// };

// export default Messages;


import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContex } from "../context/ChatContext";
import Message from "./Message";
import { db } from "../firebase/firebase.config";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContex);

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

