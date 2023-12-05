import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='w-3/12 bg-green-500 overflow-hidden'>
    <Navbar/>
    <Search/>
    <Chats/>
    </div>
  )
}

export default Sidebar