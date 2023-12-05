import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase/firebase.config'
import { AuthContex } from '../context/AuthContext'

function Navbar() {

  const { currentUser } = useContext(AuthContex);

  return (
    <div className='flex items-center bg-green-700 h-16 p-2 justify-between text-white'>
      <span className='font-bold'>Tawheed Chat</span>
      <div className='flex items-center'>
        <img className='bg-white h-8 w-8 rounded-full object-cover' src={currentUser.photoURL} alt="" srcset="" />
        <span className='m-1'>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className='hover:bg-green-400 p-1 m-1 bg-green-500 rounded '>Logout</button>
      </div>
    </div>
  )
}

export default Navbar