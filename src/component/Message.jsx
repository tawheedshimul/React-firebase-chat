// Message.js
import React, { useContext } from 'react';
import { AuthContex } from '../context/AuthContext';
import { ChatContex } from '../context/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContex); 
  const { data } = useContext(ChatContex);

  

  return (
    <div>
      <div className={`flex gap-6 ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
        <div className='max-w-4/5 flex flex-col gap-1 text-gray-300'>
          <img className='h-10 w-10 rounded-full' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
          <span>Just now</span>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='bg-white p-2 rounded-tl-xl rounded-br-xl'>
            {message.text}
          </p>
          {message.img && <img className='w-40 h-40 rounded object-fit' src={message.img} alt="" />}
        </div>
      </div>
    </div>
  );
}

export default Message;
