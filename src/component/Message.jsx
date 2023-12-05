// import React, { useContext } from 'react';
// import { AuthContex } from '../context/AuthContext';
// import { ChatContex } from '../context/ChatContext';

// function Message({ m }) {
//   const { currentUser } = useContext(AuthContex); 
//   const { data } = useContext(ChatContex); 
//   console.log(m.text);
//   return (
//     <div>
//       <div className={`flex gap-6 ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
//         {/* Added conditional rendering for styling based on senderId */}
//         <div className='max-w-4/5 flex flex-col gap-1 text-gray-300'>
//           <img className='h-10 w-10 rounded-full' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
//           <span>Just now</span>
//         </div>
//         <div className='flex flex-col gap-3'>
//           <p className='bg-white p-2 rounded-tl-xl rounded-br-xl'>
//             {message.text}
//           </p>
//           {message.img && <img className='w-40 h-40 rounded object-fit' src={message.img} alt="" />} {/* Added conditional rendering for image */}
//         </div>
//       </div >
//     </div >
//   );
// }

// export default Message;


import React, { useContext, useEffect, useRef } from "react";
import { AuthContex } from "../context/AuthContext";
import { ChatContex } from "../context/ChatContext";


const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContex);
  const { data } = useContext(ChatContex);

  const ref = useRef();

  console.log(message)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
