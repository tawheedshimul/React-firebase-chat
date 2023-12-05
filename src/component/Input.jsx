import React, { useContext, useState } from 'react';
import { AuthContex } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase.config';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChatContex } from '../context/ChatContext';

function Input() {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContex);
  const { data } = useContext(ChatContex);


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          })
        }
      )

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    setText("")
    setImg(null)
  };



  return (
    <div className='h-16 bg-white flex items-center justify-between px-2'>
      <input onChange={e => setText(e.target.value)} className='w-full h-12 rounded me-2 p-2 outline outline-1 outline-green-500 focus:outline-green-800' type="text" value={text} placeholder='Type Something...' />
      <div className='flex items-center'>
        <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M460-80q-92 0-156-64t-64-156v-420q0-66 47-113t113-47q66 0 113 47t47 113v380q0 42-29 71t-71 29q-42 0-71-29t-29-71v-380h60v380q0 17 11.5 28.5T460-300q17 0 28.5-11.5T500-340v-380q0-42-29-71t-71-29q-42 0-71 29t-29 71v420q0 66 47 113t113 47q66 0 113-47t47-113v-420h60v420q0 92-64 156T460-80Z" /></svg>
        <input onChange={e => setImg(e.target.files[0])} style={{ display: 'none' }} type="file" name="" id="file" />
        <label className='flex items-center' htmlFor="file">
          <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" /></svg>
          <button onClick={handleSend} className='bg-green-500 p-3 rounded text-white hover:opacity-80 ms-3'>Send</button>
        </label>
      </div>
    </div>
  )
}

export default Input;